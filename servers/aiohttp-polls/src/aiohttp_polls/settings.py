
"""

TODO: Loading yaml config from a list of predefined locations
TODO: Keeping ability to override config file by command line parameter,
"""
import pathlib
import yaml

BASE_DIR= pathlib.Path(__file__).parent.parent
print(BASE_DIR)
PROJECT_ROOT = pathlib.Path(__file__).parent
print(PROJECT_ROOT)
PACKAGE_NAME = PROJECT_ROOT.resolve().name
print(PACKAGE_NAME)
config_path = BASE_DIR / 'config' / 'polls.yaml'


def load_config(path):
  with open(path) as f:
    config = yaml.load(f)
    assert isinstance(config, dict)
    # TODO: Applying strict validation checks to loaded dict. See trafaret, colander or JSON schema
  return config


config = load_config(config_path)
