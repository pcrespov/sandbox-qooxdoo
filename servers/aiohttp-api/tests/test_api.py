from server.main import init_app
from server.config import TEST_CONFIG_PATH


#async def test_simple(aiohttp_client, postgres_service):
#    app = await init_app(['-c', TEST_CONFIG_PATH.as_posix()])
#    client = await aiohttp_client(app)
#    response = await client.get('/')
#    assert response.status == 200
#    text = await response.text()
#    assert "Hoi zaeme" in text

async def test_login(aiohttp_client, postgres_service):
    app = await init_app(['-c', TEST_CONFIG_PATH.as_posix()])

    # start server in an unused port
    client = await aiohttp_client(app)

    response = await client.post('/login',  data={'user': 'bizzy@itis.ethz.ch', 'password': 'z43'})
    assert response.status == 200
