#!/bin/bash
echo
printenv
echo
npm ls -g qooxdoo
echo
cat ${QOOXDOO_COMPILER_DIR}/package.json|grep qooxdoo
echo
python --version
echo
