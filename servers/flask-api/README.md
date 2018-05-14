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

# Start shell
cd path/to/source
FLASK_APP=main.py flask shell


# Run tests
cd path/flask-api
PYTHONPATH=$(pwd)/source python -m nose tests

```

[flasky]:https://github.com/miguelgrinberg/flasky
