from aiohttp import web
from aiohttp_swagger import setup_swagger

__version__ = "1.0"

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

if __name__ == '__main__':
    app = web.Application()
    app.router.add_route('GET', '/ping', ping)

    setup_swagger(app, swagger_url="/api/v{}/doc".format(__version__))
    web.run_app(app, host='localhost')
