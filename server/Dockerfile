# Specifying the base image
FROM node:24.7.0-alpine3.21

# Specifying working directory
WORKDIR /app

# Copying package.json files into current directory
COPY package.json .

# Run command to install dependencies
RUN npm install

# Copy other files into current directory
COPY . .

# Expose backend port
EXPOSE 5000

# Run command
CMD ["npm", "run", "dev"]