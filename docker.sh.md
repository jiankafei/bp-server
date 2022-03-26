# sh 说明

## mongodb

```sh
docker volume create mongo5
```

```sh
docker run -d \
  --name mongo5 \
  -v mongo5:/data/db \
  -p 27017:27017
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=111111 \
  mongo:5.0.0
  --config mongod.conf
```

## pm2

```sh
docker build -t pm2-bp-server .
# docker build -t pm2-bp-server <git#branch:folder>
```

```sh
docker run -d --rm --name pm2-bp-server -p 8090:8081 pm2-bp-server
```

```sh
docker image prune

docker logs pm2-bp-server

docker ps
```
