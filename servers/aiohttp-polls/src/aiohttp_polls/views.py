import aiohttp_jinja2
import jinja2

from aiohttp import web
from settings import PACKAGE_NAME

async def index(request):
  return web.Response(text="Hoi zaeme")

async def fail(request):
  raise IOError("fake error")


def setup(app):
  aiohttp_jinja2.setup(app, \
    loader=jinja2.PackageLoader(PACKAGE_NAME, 'templates'))