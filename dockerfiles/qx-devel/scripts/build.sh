#!/bin/bash

echo @a

# produces qx:master
docker-compose build
docker-compose run qx /bin/bash -c "which qx && qx --help"

# produces qx:released
BUILD_TARGET=released docker-compose build
BUILD_TARGET=released docker-compose run qx /bin/bash -c "which qx && qx --help"

# display images
docker image ls | grep qx