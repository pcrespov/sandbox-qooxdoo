#!/bin/bash
export VERSION_TAG=0.2.10

# build
docker-compose build --no-cache --build-arg build_date=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
docker tag itisfoundation/qooxdoo-compiler:$VERSION_TAG itisfoundation/qooxdoo-compiler:latest

# display info
docker image inspect itisfoundation/qooxdoo-compiler:latest
docker run -it \
  -v $(pwd):/home/node/src \
  --entrypoint=/bin/bash \
  itisfoundation/qooxdoo-compiler:latest \
  ./info.sh

# deploy
docker push itisfoundation/qooxdoo-compiler:$VERSION_TAG
docker push itisfoundation/qooxdoo-compiler:latest
