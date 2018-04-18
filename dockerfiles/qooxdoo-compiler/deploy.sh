#!/bin/bash
export VERSION_TAG=0.2.10 

docker-compose build
docker tag itisfoundation/qooxdoo-compiler:$VERSION_TAG itisfoundation/qooxdoo-compiler:latest

docker push itisfoundation/qooxdoo-compiler:$VERSION_TAG
docker push itisfoundation/qooxdoo-compiler:latest