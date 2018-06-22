from server.main import make_app


async def test_simple(aiohttp_client, loop):
    app = make_app(["--print-config"])
    client = await aiohttp_client(app)
    response = await client.get('/')
    assert response.status == 200
    text = await response.text()
    assert "Hoi zaeme" in text

#async def test_login(aiohttp_client):
#    # start server in an unused port
#    client = await aiohttp_client(app)
#
#    response = await client.post('/login',  data={'user': 'bizzy@itis.ethz.ch', 'password': 'z43'})
#    assert response.status == 200
