#!/bin/sh

# FIXME:
ENV_DIR=./.VENV 

python3 -m venv $ENV_DIR

source $ENV_DIR/bin/activate
$ENV_DIR/bin/pip install --upgrade pip
$ENV_DIR/bin/pip install -r source/requirements.txt

