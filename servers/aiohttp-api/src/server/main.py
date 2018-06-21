from aiohttp import web

from .api import setup as setup_api
from .auth import setup as setup_auth

from aiopg.sa import create_engine

__version__ = "0.0"

async def hello(request):
    return web.Response(text='Hoi zaeme')


async def make_app():

    db_engine = await create_engine(user='aiohttp_security',
                                   password='aiohttp_security',
                                   database='aiohttp_security',
                                   host='127.0.0.1')
    app = web.Application()
    app['config'] = get_config(argv)

    # dummy
    app.router.add_get('/', hello)

    setup_auth(app, db_engine)
    setup_api(app, db_engine)

    
    
def main():
    app = make_app()
    web.run_app(app, host='localhost')


if __name__ == '__main__':
    main()