import base64
from cryptography import fernet

from aiohttp_session import setup as setup_session
from aiohttp_session.cookie_storage import EncryptedCookieStorage


def setup(app):
  
  secret_key = app['config'].get("SECRET_KEY")
  if secret_key is None:
    # secret_key must be 32 url-safe base64-encoded bytes
    fernet_key = fernet.Fernet.generate_key()
    secret_key = base64.urlsafe_b64decode(fernet_key)
    app['config']['SECRET_KEY'] = secret_key

  storage = EncryptedCookieStorage(secret_key, cookie_name='API_SESSION')
  setup_session(app, EncryptedCookieStorage(secret_key))