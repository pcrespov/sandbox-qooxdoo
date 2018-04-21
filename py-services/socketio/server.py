"""
    Uses socketio and aiohtttp framework
"""
# pylint: disable=C0103

import logging
import os

from aiohttp import web

from .api import sio
from .config import CONFIG

_CONFIG = CONFIG[os.environ.get('SIMCORE_WEB_CONFIG', 'default')]

logging.basicConfig(level=_CONFIG.LOG_LEVEL)

QX_SOURCE_OUTPUT_DIR = _CONFIG.SIMCORE_CLIENT_OUTDIR
QX_APPNAME = 'app'

app = web.Application()
sio.attach(app)

# http requests handlers
async def index(request):
    """Serve the client-side application."""
    logging.debug("index.request:\n %s", request)

    index_path = os.path.join(QX_SOURCE_OUTPUT_DIR, 'index.html')
    with open(index_path) as f:
        return web.Response(text=f.read(), content_type='text/html')


# TODO: check whether this can be done at once
app.router.add_static(
    '/%s' % QX_APPNAME, os.path.join(QX_SOURCE_OUTPUT_DIR, QX_APPNAME))
app.router.add_static(
    '/transpiled', os.path.join(QX_SOURCE_OUTPUT_DIR, 'transpiled'))
app.router.add_static(
    '/resource', os.path.join(QX_SOURCE_OUTPUT_DIR, 'resource'))
app.router.add_get('/', index)

if __name__ == '__main__':
    web.run_app(app,
                host=_CONFIG.SIMCORE_WEB_HOSTNAME,
                port=_CONFIG.SIMCORE_WEB_PORT)
