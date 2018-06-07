#!/bin/sh

# FIXME:
python3 -m venv ./venv 

source venv/bin/activate
venv/bin/pippip install --upgrade pip
venv/bin/pip install -r source/requirements.txt

