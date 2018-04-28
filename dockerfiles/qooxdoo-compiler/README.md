# [qooxdoo-compiler] dockerfile

Contains:

- Dockerfile to build an image with [qooxdoo-compiler]
- docker-compose configuration to use [qooxdoo-compiler]'s cli: compile, translate, serve ...
- Docker images can be found at [dockerhub](https://hub.docker.com/r/itisfoundation/qooxdoo-compiler/tags/)

## Usage

Some example of usage with ```docker-compose``` cli:

- Build image

``` bash
    # build container with latest version qx-compiler
    docker-compose build

    # build specific qx-compiler version
    VERSION_TAG=latest docker-compose build

    # another option is simly to pull it from github's registry
    docker pull itisfoundation/qooxdoo-compiler:latest
```

- Run [qooxdoo-compiler]

``` bash
    # create an app: myapp
    docker-compose run qx create myapp -I

    # compile ./myapp
    APP_DIR=myapp docker-compose run qx compile

    # serve myapp
    APP_DIR=myapp docker-compose up
```

## Maintenance

Build, tagging, versioning, releasing, etc ... of this image can be performed using the ```makefile```.

[1]:https://www.npmjs.com/package/qxcompiler
[qooxdoo-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
