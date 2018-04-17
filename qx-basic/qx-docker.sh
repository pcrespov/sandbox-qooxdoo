#!/bin/bash

echo docker-compose run -d -w /home/node/src/$1 qxcompiler $2
docker-compose run -d -w /home/node/src/$1 qxcompiler $2
