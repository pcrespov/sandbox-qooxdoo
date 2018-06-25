from setuptools import find_packages, setup

install_requires = []

with open('requirements.txt', 'r') as fh:
    install_requires = fh.read().splitlines()

setup(name='aiohttp-server',
      version='0.0.0',
      description='aiohttp server demo with qx client',
      platforms=['POSIX'],  # TODO:check
      package_dir={'': 'src'},
      packages=find_packages('src'),
      package_data={
          '': ['static/*.*']
      },
      include_package_data=True,
      # requirements
      install_requires=install_requires,
      setup_requires=['pytest-runner'],
      tests_require=['pytest'],
      zip_safe=False  # TODO:check
      )
