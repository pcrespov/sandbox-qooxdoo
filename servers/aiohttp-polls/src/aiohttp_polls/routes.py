from aiohttp import web
from settings import PROJECT_ROOT
from views import index, fail


def setup(app):
  """ Setup routes map in application """
  assert isinstance(app, web.Application)
  # dynamic roots
  app.router.add_get("/", index)
  app.router.add_get("/fail", fail)
  # static roots
  app.router.add_static('/static/', path=PROJECT_ROOT / 'static', name='static')

  