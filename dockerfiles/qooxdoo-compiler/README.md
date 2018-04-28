# [qooxdoo-compiler] dockerfile

[![](https://images.microbadger.com/badges/image/itisfoundation/qooxdoo-compiler.svg)](https://microbadger.com/images/itisfoundation/qooxdoo-compiler "Get your own image badge on microbadger.com")
[![](https://images.microbadger.com/badges/version/itisfoundation/qooxdoo-compiler.svg)](https://microbadger.com/images/itisfoundation/qooxdoo-compiler "Get your own version badge on microbadger.com")
[![](https://images.microbadger.com/badges/commit/itisfoundation/qooxdoo-compiler.svg)](https://microbadger.com/images/itisfoundation/qooxdoo-compiler "Get your own commit badge on microbadger.com")

Contains:

- Dockerfile to build an image with [qooxdoo-compiler]
- docker-compose configuration to use [qooxdoo-compiler]'s cli: compile, translate, serve ...
- These docker images are available at the [dockerhub] registry.

## Usage

Some example of usage with ```docker-compose``` cli:

- Build image (this step is not necessary since image can be pulled from [dockerhub] )

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

See ``samples`` folder in this repo for some examples.

## Maintenance

Build, tagging, versioning, releasing, etc ... of this image can be performed using the ```makefile```.

[1]:https://www.npmjs.com/package/qxcompiler
[qooxdoo-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
[dockerhub]:https://hub.docker.com/r/itisfoundation/qooxdoo-compiler/tags/