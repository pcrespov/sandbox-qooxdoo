#!/bin/bash

echo Running \'docker-compose build "$@"\'

echo Produces qx:master -----------------------------------------------
docker-compose build "$@"
docker-compose run --rm qx --version

echo Produces qx:released ---------------------------------------------
BUILD_TARGET=released docker-compose build "$@"
BUILD_TARGET=released docker-compose run --rm qx --version

echo Display images ---------------------------------------------------
docker image ls | grep qx