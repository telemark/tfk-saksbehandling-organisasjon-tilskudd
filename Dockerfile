FROM mhart/alpine-node:10 as base
COPY package.json package-lock.json /usr/src/
WORKDIR /usr/src
RUN npm i --production
COPY . .

FROM mhart/alpine-node:base-10
WORKDIR /usr/src
COPY --from=base /usr/src .
CMD ["node", "example.js"]