import logging
from aiohttp import web

from settings import config
import routes
import db
import middlewares
import views

logging.basicConfig(level=logging.DEBUG)
_LOGGER = logging.getLogger(__name__)


if __name__=="__main__":
  _LOGGER.debug("Starting ...")
  
  app = web.Application()
  app['config'] = config

  # app setup on ...
  views.setup(app)
  routes.setup(app)
  db.setup(app)
  middlewares.setup(app)  

  web.run_app(app)

  _LOGGER.debug("DONE")


