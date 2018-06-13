# qooxdoo-samples

A random set of Rich Internet Applications (RIA) implemented with [qooxdoo] and some development tools and servers around them.

## samples

Small [qx] apps to demonstrate a specific feature or design concept

```bash
cd samples
# start serve. compiles and restarts upon change in source code
APP_DIR=auth docker-compose up

# stop
docker-compose down

# create new app
docker-compose run qx create mynewapp -I

# serve it
APP_DIR=mynewapp docker-compose up
```


[qooxdoo]:http://www.qooxdoo.org
[qx]:http://www.qooxdoo.org
