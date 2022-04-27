# Specify a base image
FROM node:14-alpine

# Install dependencies
COPY ./ ./
RUN npm install

# Default command
CMD ["npm", "start"]