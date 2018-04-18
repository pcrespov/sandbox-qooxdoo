# [qx-compiler] dockerfile

Build an image with [qx-compiler] and uses compose to map source code in the host
and compile or serve a website

Some example of usage with ```docker-compose``` cli:

- Build image

``` bash
    # build container with latest version qx-compiler
    docker-compose build

    # build specific qx-compiler version
    VERSION_TAG=latest docker-compose build
```

- Run qxcompiler

``` bash
    # create an app: myapp
    docker-compose run qxcompiler create myapp -I

    # compile ./myapp
    APP_DIR=myapp docker-compose run qxcompiler compile

    # serve myapp
    APP_DIR=myapp docker-compose up
```

## Other options

```bash
# build image
docker-compose build

# create an app: myapp
docker-compose run qxcompiler create myapp -I

# compile myapp
docker-compose run -w /home/node/src/myapp qxcompiler compile


# serve myapp
docker-compose run -w /home/node/src/myapp --service-ports qxcompiler serve

# stop
docker-compose down
```

- Using bare ```docker``` cli is obviously also possible

```bash
    # Assuming itisfoundation/qxcompiler is the image's tag
    docker run -v $(pwd):/home/node/src itisfoundation/qxcompiler create myapp-I

    # compile
    cd myapp
    docker run -t -v $(pwd):/home/node/src itisfoundation/qxcompiler compile


```

- **TIP**: once the app folder is created, defining an alias can be handy

``` bash
alias qx='docker-compose run -w /home/node/src/myapp --service-ports qxcompiler'

qx --help
qx compile

unalias qx

# stop
docker-compose down
```

## TODO

- [ ] option to qooxdoo compiler from github?
- [x] pass version as argument to dockerfile and tag image ```npm -g list | grep qxcompiler```

[1]:https://www.npmjs.com/package/qxcompiler
[qx-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
