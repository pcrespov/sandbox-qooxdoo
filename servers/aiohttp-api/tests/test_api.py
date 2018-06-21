from server.main import make_app


def test_it(aiohttp_client):
  app = make_app()
  client = await aiohttp_client(app)
  response = await client.get('/')
  assert response.status == 200
  text = await reponse.text()
  assert "Hoi zaeme!" in text