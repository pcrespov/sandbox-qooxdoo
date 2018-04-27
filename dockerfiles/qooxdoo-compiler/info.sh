#!/bin/bash
echo LET US HAVE A LOOK INSIDE ----------------
echo
printenv
echo
npm ls -g qooxdoo
echo
cat ${QOOXDOO_COMPILER_DIR}/package.json|grep qooxdoo
echo
python --version
echo
