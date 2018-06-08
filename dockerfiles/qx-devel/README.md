# dockerfiles

## qx-development

Build image:

```bash
cd qx-devel

# produces qx:master
docker-compose build

# produces qx:released
BUILD_TARGET=released docker-compose build
```

Runs command inside and check qx available and its version

```bash
cd qx-devel

# runs inside qx:master
docker-compose run qx /bin/bash -c "which qx && qx --help"

# produces qx:released
BUILD_TARGET=released docker-compose run qx /bin/bash -c  "which qx && qx --help"
```

``` bash

docker-compose qx create --qxpath=$QOOXDOO_PATH/framework  mini -I

```

## TODOs

- TODO: print installed version of qx

[generator]:https://www.qooxdoo.org/devel/pages/tool/generator/cheat_sheet.html