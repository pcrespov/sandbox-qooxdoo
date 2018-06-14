#!/bin/bash

echo Running \'docker-compose build "$@"\'

# produces qx:master
docker-compose build "$@"
docker-compose run qx /bin/bash -c "which qx && qx --help 2>&1 >/dev/null | grep  Versions"
docker-compose down

# produces qx:released
BUILD_TARGET=released docker-compose build "$@"
BUILD_TARGET=released docker-compose run qx /bin/bash -c "which qx && qx --help 2>&1 >/dev/null | grep  Versions"
docker-compose down

# display images
docker image ls | grep qx