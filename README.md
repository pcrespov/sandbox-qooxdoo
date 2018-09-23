# qooxdoo-samples

A random set of Rich Internet Applications (RIA) implemented with [qooxdoo] and some development tools and servers around them.

## dockerfiles

- ``qooxdoo-compiler`` is a lightweight image with [qx] compiler. Detailed tagging, labeling and released in docker-hub registry
- ``qx-devel`` is an image with tools installed for development of [qx] applications. It has two versions, tagged as
  - ``:master`` installs latest version in master branch
  - ``:released`` installs released version (via npm)
- ``http-server`` is a small file server

To build just ``make build``. Once built we can check the version of the tools inside ``qx-devel`` using
a unified cli:

```bash
$$ cd dockerfile/qx-devel
$$ BUILD_TARGET=master docker-compose run --rm qx --version
qooxdoo-compiler: v0.2.12
qooxdoo-sdk : 6.0.0-alpha
http-server : 0.11.1

$$ BUILD_TARGET=released docker-compose run --rm qx --version
qooxdoo-compiler: v0.2.13
qooxdoo-sdk : 6.0.0-alpha
http-server : 0.11.1
```


## samples

Small [qx] apps to demonstrate a specific feature or design concept

```bash
cd samples

# create new app called `myapp`
docker-compose run --rm qx create myapp -I

# TODO: add myapp/config.json and customize upon creation

# creates test-runner app
APP_DIR=myapp docker-compose run --rm qx test

# creates api doc viewer app
APP_DIR=myapp docker-compose run --rm qx api

# serves app, tests and doc in 9000, 9001 and 9002
APP_DIR=myapp docker-compose -d up

# drop all servers
docker-compose down
```

Or can explicitly query the ``generator`` as

```
APP_DIR=myapp docker-compose run --rm qx gtor --help

# for test-driven development
APP_DIR=myapp docker-compose run --rm qx gtor test-source

```


## servers

A colletion server-side applications in python

[qooxdoo]:http://www.qooxdoo.org
[qx]:http://www.qooxdoo.org
