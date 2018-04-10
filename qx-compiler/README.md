# [qx-compiler]

Build an image with [qx-compiler] and uses compose to map source code in the host
and compile or serve a website

Example of usage with ```docker-compose```

```bash
# build image
docker-compose build

# create an app: myapp
docker-compose run qxcompiler create myapp -I

# compile myapp
docker-compose run -w /home/node/src/myapp qxcompiler compile

# serve myapp
docker-compose run -w /home/node/src/myapp --service-ports qxcompiler serve

```

## TODO

- [ ] pass version as argument to dockerfile and tag image ```npm -g list | grep qxcompiler```

[1]:https://www.npmjs.com/package/qxcompiler
[qx-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
