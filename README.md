# qooxdoo-samples

A random set of Rich Internet Applications (RIA) implemented with [qooxdoo] and some development tools and servers around them.


## dockerfiles

- ``qooxdoo-compiler`` is a lightweight image with [qx] compiler. Detailed tagging, labeling and released in docker-hub registry
- ``qx-devel`` is an image with tools installed for development of [qx] applications. It has two versions, tagged as
  - ``:master`` installs latest version in master branch
  - ``:released`` installs released version (via npm)
- ``http-server`` is a small file server

To build just ``make build``.

## samples

Small [qx] apps to demonstrate a specific feature or design concept

```bash
cd samples

# create new app called `myapp`
docker-compose run --rm qx create myapp -I

# TODO: add myapp/config.json and customize upon creation

# creates test app
APP_DIR=myapp docker-compose run --rm qx test

# creates doc app
APP_DIR=myapp docker-compose run --rm qx api

# serves app, tests and doc in 9000, 9001 and 9002
APP_DIR=myapp docker-compose -d up

# drop all servers
docker-compose down
```

## servers

A colletion server-side applications in python

[qooxdoo]:http://www.qooxdoo.org
[qx]:http://www.qooxdoo.org
