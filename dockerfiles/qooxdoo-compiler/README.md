# [qooxdoo-compiler] dockerfile

Contains:

- Dockerfile to build an image with [qooxdoo-compiler]
- docker-compose configuration to use [qooxdoo-compiler]'s cli: compile, translate, serve ...

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

## Other options

```bash
# build image
docker-compose build

# create an app: myapp
docker-compose run qx create myapp -I

# compile myapp
docker-compose run -w /home/node/src/myapp qx compile


# serve myapp
docker-compose run -w /home/node/src/myapp --service-ports qxcompiler serve

# stop
docker-compose down
```

- Using bare ```docker``` cli is obviously also possible

```bash
   # Assuming itisfoundation/qooxdoo-compiler is the image's tag
   docker run -v $(pwd):/home/node/src itisfoundation/qooxdoo-compiler create myapp-I

   # compile
   cd myapp
   docker run -t -v $(pwd):/home/node/src itisfoundation/qooxdoo-compiler compile

```

- **TIP**: once the app folder is created, defining an alias can be handy

``` bash
alias qx='docker-compose run -w /home/node/src/myapp --service-ports qx'

qx --help
qx compile

unalias qx

# stop
docker-compose down
```

## TODO

- [ ] option to qooxdoo compiler from github?


[1]:https://www.npmjs.com/package/qxcompiler
[qooxdoo-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
