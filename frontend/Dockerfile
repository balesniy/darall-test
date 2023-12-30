FROM node:20-slim

WORKDIR /frontend

COPY package.json ./

RUN npm i

# This will prevent the node_modules directory from being overwritten by the bind mount
VOLUME /frontend/node_modules

COPY . /frontend

CMD ["npm", "run", "dev"]
