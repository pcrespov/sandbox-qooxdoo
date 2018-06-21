from server.main import make_app


async def test_simple(aiohttp_client, loop):
  app = make_app()
  print(app)
  client = await aiohttp_client(app)
  response = await client.get('/')
  assert response.status == 200
  text = await response.text()
  assert "Hoi zaeme" in text
