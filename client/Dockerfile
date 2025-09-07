# Installing node 
FROM node:24.7.0-alpine3.21

# Specifying the workdirectory
WORKDIR /app

# Copying package.json to my current directory to install needed dependencies
COPY ./todo-app/package.json .

# Install the dependency
RUN npm install

# Copy other files into my current directory
COPY . .

# Build and optimize static files
RUN npm run build 

# Opening the port to react 
EXPOSE 3000

# Run nginx in the foreground
CMD ["npm", "run", "dev"]

