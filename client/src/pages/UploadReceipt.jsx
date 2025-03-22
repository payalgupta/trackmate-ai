import { useState } from "react";
import axios from "axios";

export default function UploadReceipt() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("receipt", file);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5001/api/receipts/scan", formData);
      setResult(res.data.parsed);
    } catch (err) {
      alert("OCR failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="card bg-base-100 shadow-lg p-6 space-y-4">
        <h2 className="text-xl font-bold">Upload a Receipt</h2>
        <input type="file" accept="image/*" className="file-input file-input-bordered w-full" onChange={handleFileChange} />
        <button className="btn btn-primary w-full" onClick={handleUpload} disabled={loading}>
          {loading ? "Processing..." : "Scan Receipt"}
        </button>

        {result && (
          <div className="mt-6 space-y-2 bg-base-200 p-4 rounded">
            <h3 className="font-semibold">Parsed Result:</h3>
            <p><strong>Merchant:</strong> {result.merchant}</p>
            <p><strong>Amount:</strong> {result.amount}</p>
            <p><strong>Date:</strong> {result.date}</p>
            <p className="text-sm text-gray-500 whitespace-pre-wrap">{result.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
