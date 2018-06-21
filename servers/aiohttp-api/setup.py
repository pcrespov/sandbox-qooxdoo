from setuptools import find_packages, setup


install_requires = ['aiohttp',
                    'aiopg[sa]',
                    'aiohttp-swagger',
                    'trafaret-config']

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
      install_requires=install_requires,
      zip_safe=False  # TODO:check
      )
