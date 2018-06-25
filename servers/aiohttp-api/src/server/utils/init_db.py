""" Initializes tables in database and adds some sample data for testing

References:
[1]:https://github.com/aio-libs/aiohttp-demos/blob/master/docs/preparations.rst#environment
"""
from sqlalchemy import create_engine, MetaData

from passlib.hash import sha256_crypt

from server.model import users, permissions
from server.config import SRC_DIR, get_config


DSN = "postgresql://{user}:{password}@{host}:{port}/{database}"

ADMIN_DB_URL = DSN.format(
    user='postgres', password='postgres', database='postgres',
    host='localhost', port=5432
)

admin_engine = create_engine(ADMIN_DB_URL, isolation_level='AUTOCOMMIT')

USER_CONFIG_PATH = SRC_DIR / 'config' / 'server.yaml'
USER_CONFIG = get_config(['-c', USER_CONFIG_PATH.as_posix()])
USER_DB_URL = DSN.format(**USER_CONFIG['postgres'])
user_engine = create_engine(USER_DB_URL)

TEST_CONFIG_PATH = SRC_DIR / 'config' / 'server-test.yaml'
TEST_CONFIG = get_config(['-c', TEST_CONFIG_PATH.as_posix()])
TEST_DB_URL = DSN.format(**TEST_CONFIG['postgres'])
test_engine = create_engine(TEST_DB_URL)


def setup_db(config):
    db_name = config['database']
    db_user = config['user']
    db_pass = config['password']

    conn = admin_engine.connect()
    conn.execute("DROP DATABASE IF EXISTS %s" % db_name)
    conn.execute("DROP ROLE IF EXISTS %s" % db_user)
    conn.execute("CREATE USER %s WITH PASSWORD '%s'" % (db_user, db_pass))
    conn.execute("CREATE DATABASE %s ENCODING 'UTF8'" % db_name)
    conn.execute("GRANT ALL PRIVILEGES ON DATABASE %s TO %s" %
                 (db_name, db_user))
    conn.close()


def teardown_db(config):

    db_name = config['database']
    db_user = config['user']

    conn = admin_engine.connect()
    conn.execute("""
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = '%s'
        AND pid <> pg_backend_pid();""" % db_name)
    conn.execute("DROP DATABASE IF EXISTS %s" % db_name)
    conn.execute("DROP ROLE IF EXISTS %s" % db_user)
    conn.close()


def create_tables(engine=test_engine):
    meta = MetaData()
    meta.create_all(bind=engine, tables=[users, permissions])


def drop_tables(engine=test_engine):
    meta = MetaData()
    meta.drop_all(bind=engine, tables=[users, permissions])


def sample_data(engine=test_engine):

    generate_password_hash = sha256_crypt.hash
    
    conn = engine.connect()
    conn.execute(users.insert(), [
        {'login': 'bizzy@itis.ethz.ch', 'passwd': generate_password_hash('z43'), 'is_superuser': False, 'disabled': False},
        {'login': 'pcrespov', 'passwd': generate_password_hash('123'), 'is_superuser':True, 'disabled': False},
        {'login': 'mrspam', 'passwd': generate_password_hash('345'), 'is_superuser': True, 'disabled': True}
        ])

    conn.execute(permissions.insert(), [
        {'user_id': 1, 'perm_name': 'tester'},
        {'user_id': 2, 'perm_name': 'admin'}
    ])

    conn.close()


if __name__ == '__main__':

    setup_db(USER_CONFIG['postgres'])
    create_tables(engine=user_engine)
    sample_data(engine=user_engine)
    # drop_tables()
    # teardown_db(config)
