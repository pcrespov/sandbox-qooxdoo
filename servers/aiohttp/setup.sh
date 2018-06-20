#!/bin/sh

# https://packaging.python.org/tutorials/installing-packages

CURRENT_DIRPATH=`dirname $(realpath $0)`
DIRNAME=${CURRENT_DIRPATH##*/}
ENV_DIR=~/.virtualenvs/$DIRNAME

echo "Building virtual env at $ENV_DIR"

python3 -m venv $ENV_DIR

source $ENV_DIR/bin/activate
$ENV_DIR/bin/pip install --upgrade pip
$ENV_DIR/bin/pip install -r requirements.txt

