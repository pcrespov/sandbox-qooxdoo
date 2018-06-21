import logging
import sys

from aiohttp import web
from aiopg.sa import create_engine

from .api import setup as setup_api
from .auth import setup as setup_auth
from .settings import get_config

__version__ = "0.0"


async def hello(request):
    return web.Response(text='Hoi zaeme')


def make_app(argv):
    app = web.Application()
    app['config'] = get_config(argv)

    # dummy
    app.router.add_get('/', hello)

    #setup_auth(app, db_engine)
    #setup_api(app, db_engine)

    return app


def main(argv):
    logging.basicConfig(level=logging.DEBUG)

    app = make_app(argv)

    config = app['config']
    web.run_app(app,
                host=config['host'],
                port=config['port'])


if __name__ == '__main__':
    main(sys.argv[1:])
