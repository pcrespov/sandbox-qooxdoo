# drest

Starting point: http://www.qooxdoo.org/current/demobrowser/#data~Github.html

```bash

# start
cd samples
APP_DIR=drest docker-compose up

```

open a browser and type ``http://localhost:8080/index.html?qxenv:dev.enableFakeServer:true``.

to enable fake backend (see drest/dev/fakerest) that will intercept the call to the server. By default, this feature is disabled.
