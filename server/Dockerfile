FROM node:20-alpine

WORKDIR /app

# Copy only package files and install inside Docker
COPY package*.json ./
RUN npm install

# Now copy the actual source code
COPY . .

EXPOSE 5001

CMD ["npm", "run", "dev"]
