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

**NOTE** : Projects generated with these version differ in :

- In Manifest.json
  - "qooxdoo-range": "6.0.0-alpha-20180529" in master
  - "qooxdoo-range": "6.0.0-alpha" in released
- In compile.json, libraries paths to the sdk are different:
  - "/home/scu/qooxdoo-compiler/node_modules/qooxdoo-sdk/framework" in master
  - "/home/scu/qooxdoo-compiler/node_modules/qxcompiler/node_modules/qooxdoo-sdk/framework" in released





## TODOs

- TODO: print installed version of qx

[generator]:https://www.qooxdoo.org/devel/pages/tool/generator/cheat_sheet.html