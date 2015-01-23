# DOCKER-VERSION 1.0.1
FROM node:0.10.31
EXPOSE 3000

# Bundle app source
COPY . /src
WORKDIR /src

RUN npm install --unsafe-perm

CMD ./scripts/prod
