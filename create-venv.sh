#!/bin/bash
# FIXME: every sub-folder under servers can have its own VENV
# TODO: how to activate current venv from batch??

# NOTES: https://packaging.python.org/tutorials/installing-packages
CURRENT_DIRPATH=`dirname $(realpath $0)`
DIRNAME=${CURRENT_DIRPATH##*/}


# venv at workspace level so vscode can find them
ENV_DIR=${CURRENT_DIRPATH}/.venv/aiohttp-api

echo "Building virtual env at $ENV_DIR ..." 

python3 -m venv $ENV_DIR


# TODO: create cli with this optional
#source $ENV_DIR/bin/activate # source does not work in batch!
$ENV_DIR/bin/pip install --upgrade pip
pushd servers/aiohttp-api/
$ENV_DIR/bin/pip install -r requirements-dev.txt
popd
