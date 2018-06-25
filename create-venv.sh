#!/bin/sh

# https://packaging.python.org/tutorials/installing-packages

#CURRENT_DIRPATH=`dirname $(realpath $0)`
#DIRNAME=${CURRENT_DIRPATH##*/}
#ENV_DIR=~/.virtualenvs/$DIRNAME

# FIXME: every sub-folder under servers can have its own VENV
# - venv at workspace level so vscode can find them
ENV_DIR=.venv/aiohttp-api

echo "Building virtual env at $ENV_DIR ..." 

python3 -m venv $ENV_DIR

#source $ENV_DIR/bin/activate
$ENV_DIR/bin/pip install --upgrade pip
pushd servers/aiohttp-api
$ENV_DIR/bin/pip install -r requirements-dev.txt
popd
