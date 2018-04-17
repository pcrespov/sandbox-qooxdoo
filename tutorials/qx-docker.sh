#!/bin/bash

echo docker-compose run -d -w /home/node/src/$1 --service-ports qxcompiler $2
docker-compose run -d -w /home/node/src/$1 --service-ports qxcompiler $2
