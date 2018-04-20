# app

``` bash

cd parent/of/wam

# compile
TARGET_DIR=app docker-compose run qx compile

# serve
TARGET_DIR=app docker-compose run qx

```

## Dev notes

- running tests? [qx-tests] comes with its own testing framework
- interative API reference
- container for generator.py?
- in [ui overivew/communication](http://www.qooxdoo.org/current/pages/desktop/ui_overview.html) speaks about IO layer feature high-level abstractions for XMLHTTP requesst, REST and cross-domain requests as well as RPC calls to server-side methods.
- *source* version of your applicication is compiled
- See *watch* option for continuous compilation upon source changes (integrated into ```qx serve``` otherwise ```qx compile --watch```)
- *source* and *build* versions for dev and deployment resp. Latter is self-container but not former.

## TODO

- [ ] qx-compiler: add PYTHONPATH with access to generator.py
- [ ] qx-compiler: add version to Dockerfile. pull branch HEAD or released version

[qx]:http://www.qooxdoo.org/current/pages/desktop.html
[qx-compiler]:https://github.com/pcrespov/qooxdoo-compiler
[qx-tests]:http://www.qooxdoo.org/current/pages/tool/getting_started.html#unit-testing