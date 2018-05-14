# flask-api

Flask-based REST API interface on top of unicorn.

It is essentially a modified version of the API part of github project [flasky].

## Usage

```bash
# Create venv
cd path/flask-api
conda create -n flask-api python=3
source activate flask-api
pip install -r requirements/dev.txt

# activate it
source activate flask-api

# help
cd path/to/source
FLASK_APP=main.py FLASK_DEBUG=1 flask --help

# tests and report coverage
FLASK_APP=main.py FLASK_DEBUG=1 flask test --coverage


# Other alternatives to run tests
python -m nose tests

```

[flasky]:https://github.com/miguelgrinberg/flasky
