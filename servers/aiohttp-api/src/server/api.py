""" server's rest API

"""
from aiohttp import web
from aiohttp_swagger import setup_swagger

from aiohttp_security import (
    remember, forget, authorized_userid,
    has_permission, login_required
)

from .auth import (
    check_credentials
)


# API version
__version__ = "1.0"


async def login(request):
    form = await request.post()
    email = form.get('email')
    password = form.get('password')

    # TODO: ensure right key in application's config?
    db_engine = request.app['db_engine']
    if await check_credentials(db_engine, email, password):
        await remember(request, response, email)
        # TODO: build token and send back!
        response = jsonify({
            'token': g.current_user.generate_auth_token(expiration=3600), 
            'userid': ,
            'expiration': 3600})
        return response

    return web.HTTPUnauthorized(
        body=b'Invalid email/password combination')


@login_required
async def logout(request):
    response = web.Response(body=b'You have been logged out')
    await forget(request, response)
    return response


@has_permission("user")
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


def setup_api(app):
    # routing
    router = app.router
    prefix = "/api/v{}".format(__version__)

    router.add_post(prefix+'/login', login, name='login')
    router.add_get(prefix+'/logout', logout, name='logout')
    router.add_get(prefix+'/ping', ping, name='ping')

    # middlewares
    setup_swagger(app, swagger_url=prefix+"/doc")
