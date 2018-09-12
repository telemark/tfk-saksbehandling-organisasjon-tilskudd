FROM node:8.12.0-alpine@sha256:443fd55218742fcf1d86ec1baa353079e1a783386de9b7ff74613eed9cffebb7

#### Begin setup ####

# Installs git
RUN apk add --update git && rm -rf /var/cache/apk/*

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT node example.js