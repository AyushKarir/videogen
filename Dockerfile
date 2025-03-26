# Use the official Node.js image
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install all dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN yarn run build

# Use a smaller image for runtime
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Set the environment variable
ENV NODE_ENV=production

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package.json /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Install only production dependencies
RUN yarn install --production

# Expose the desired port
EXPOSE 3000

# Start the application
CMD ["yarn", "run", "start"]