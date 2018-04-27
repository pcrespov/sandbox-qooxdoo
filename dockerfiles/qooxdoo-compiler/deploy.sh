#!/bin/bash
export VERSION_TAG=0.2.10

# build
docker-compose build #--no-cache
docker tag itisfoundation/qooxdoo-compiler:$VERSION_TAG itisfoundation/qooxdoo-compiler:latest

# display
docker run -it \
  -v $(pwd):/home/node/src \
  --entrypoint=/bin/bash \
  itisfoundation/qooxdoo-compiler:latest \
  ./info.sh

# deploy
docker push itisfoundation/qooxdoo-compiler:$VERSION_TAG
docker push itisfoundation/qooxdoo-compiler:latest
