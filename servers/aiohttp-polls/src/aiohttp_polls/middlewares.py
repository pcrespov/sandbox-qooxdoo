import logging

import aiohttp_jinja2
from aiohttp import web

_LOGGER = logging.getLogger(__name__)

async def handle_404(request):
    return aiohttp_jinja2.render_template('404.html', request, {})


async def handle_500(request):
    return aiohttp_jinja2.render_template('500.html', request, {})


def create_error_middleware(overrides):

    @web.middleware
    async def _error_middleware(request, handler):
      """
      """
      try:
        response = await handler(request)
        _LOGGER.debug("Handled request %s", request)

        # handles error if previous handler fails
        override = overrides.get(response.status)
        if override:
            _LOGGER.debug("Handling error status %d", response.status)
            return await override(request)

        return response

      except web.HTTPException as ex:
        override = overrides.get(ex.status)
        if override:
            return await override(request)
        # any other
        raise

    return _error_middleware


def setup(app):
    assert isinstance(app, web.Application)
    error_middleware = create_error_middleware({
        404: handle_404,
        500: handle_500
    })
    app.middlewares.append(error_middleware)
