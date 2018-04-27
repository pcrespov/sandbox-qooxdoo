#!/bin/bash

docker run -it \
  --entrypoint=/bin/bash \
  itisfoundation/qooxdoo-compiler:latest \
  -c "npm ls -g qooxdoo && cat ${QOOXDOO_COMPILER_DIR}/package.json|grep qooxdoo && python --version && printenv && echo"
