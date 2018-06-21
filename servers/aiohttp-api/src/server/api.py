from aiohttp import web
from aiohttp_security import (authorized_userid, forget, has_permission,
                              login_required, remember)
from aiohttp_swagger import setup_swagger

# API version
__version__ = "1.0"


async def login(request):
    response = web.HTTPFound('/')
    form = await request.post()
    email = form.get('email')
    password = form.get('password')
    
    db_engine = request.app.db_engine
    if await check_credentials(db_engine, email, password):
        await remember(request, response, email)
        return response

    return web.HTTPUnauthorized(
        body=b'Invalid email/password combination')


@login_required
async def logout(request):
    response = web.Response(body=b'You have been logged out')
    await forget(request, response)
    return response


@login_required
async def ping(request):
    """
      ---
      description: This end-point allow to test that service is up.
      tags:
      - Health check
      produces:
      - text/plain
      responses:
          "200":
              description: successful operation. Return "pong" text
          "405":
              description: invalid HTTP Method
    """
    return web.Response(text="pong")


def setup(app):
    # routing
    router = app.router
    prefix = "/api/v{}".format(__version__)

    router.add_post(prefix+'/login', login, name='login')
    router.add_get(prefix+'/logout', logout, name='logout')
    router.add_get(prefix+'/ping', ping)

    # middlewares
    setup_swagger(app, swagger_url=prefix+"/doc")
