###########################################################
#
# Dockerfile for tfk-saksbehandling-organisasjon-tilskudd
#
###########################################################

# Setting the base to docker-node-unoconv
FROM zrrrzzt/docker-node-unoconv

# Maintainer
MAINTAINER Geir Gåsodden

#### Begin setup ####

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Startup
ENTRYPOINT /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 && node index.js