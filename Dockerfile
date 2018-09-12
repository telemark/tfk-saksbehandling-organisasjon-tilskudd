FROM node:8.12.0-alpine@sha256:c2ea45a3953fd73f85e19b2993ed063261951f628628c3ad6fc11e96df86f5bc

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