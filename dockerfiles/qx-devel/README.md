# dockerfiles


To build images just run ``./bin/build.sh``

Or step by stem

```bash
cd dockerfiles/qx-devel

# produces qx:master (default)
docker-compose build

# produces qx:released
BUILD_TARGET=released docker-compose build


# create myapp-w-* project with qx:master (default)
docker-compose qx create myapp-w-master -I

# create myapp-w-* project with qx:released
IMAGE_VERSION=released docker-compose qx create myapp-w-released -I

# qx serve --set qx.allowUrlSettings=true with qx:master (default)
APP_DIR=minimal docker-compose up

# qx serve --set qx.allowUrlSettings=true with qx:master (default)
IMAGE_VERSION=released APP_DIR=minimal docker-compose up
```

Added a new entrypoint that unifies the CLIs of both ``qooxdoo-sdk/tools/generator.py`` and
``qx``-compiler. Then we can query help or versions simply by 

```bash
docker-compose up --help
docker-compose up --version

IMAGE_VERSION=master docker-compose up --help
IMAGE_VERSION=released docker-compose up --version
```

or create a test or api documentation (produced by ``generator.py``) of a project called ``minimal`` just type
```bash
APP_DIR=minimal docker-compose run qx test
APP_DIR=minimal docker-compose run qx api
```

To serve the doc or the test runner we need a small file server (due to security reasons we cannot just drop ``index.html`` on the browser). Here we have nodejs to the rescue. we can easily install a http-server and fire it as
```bash
npm install http-server -g
http-server path/to/test/
```
or if you really do not want to install node in your system, you can always run it within a docker
``` bash
docker build -t http-server . -f-<<EOF
FROM node
WORKDIR /user/src/app
RUN npm install http-server -g
EXPOSE 8080
VOLUME /user/src/app
ENTRYPOINT ["http-server"]
EOF

docker run -p 8080:8080 -v $(pwd):/user/src/app http-server path/to/testdir

```

**NOTE** : Projects generated with these version differ in :

- In Manifest.json
  - "qooxdoo-range": "6.0.0-alpha-20180529" in master
  - "qooxdoo-range": "6.0.0-alpha" in released
- In compile.json, libraries paths to the sdk are different:
  - "/home/scu/qooxdoo-compiler/node_modules/qooxdoo-sdk/framework" in master
  - "/home/scu/qooxdoo-compiler/node_modules/qxcompiler/node_modules/qooxdoo-sdk/framework" in released





## TODOs

- [ ] TODO: print installed version of qx

[generator]:https://www.qooxdoo.org/devel/pages/tool/generator/cheat_sheet.html