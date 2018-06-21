import sqlalchemy as sa


metadata = sa.MetaData()

# User
users = sa.Table(
    'users', metadata,
    sa.Column('id', sa.Integer, nullable=False),
    sa.Column('login', sa.String(256), nullable=False),
    sa.Column('passwd', sa.String(256), nullable=False),
    sa.Column('is_superuser', sa.Boolean, nullable=False,
              server_default='FALSE'),
    sa.Column('disabled', sa.Boolean, nullable=False,
              server_default='FALSE'),

    # indices
    sa.PrimaryKeyConstraint('id', name='user_pkey'),
    sa.UniqueConstraint('login', name='user_login_key'),
)


permissions = sa.Table(
    'permissions', metadata,
    sa.Column('id', sa.Integer, nullable=False),
    sa.Column('user_id', sa.Integer, nullable=False),
    sa.Column('perm_name', sa.String(64), nullable=False),

    # indices
    sa.PrimaryKeyConstraint('id', name='permission_pkey'),
    sa.ForeignKeyConstraint(['user_id'], [users.c.id],
                            name='user_permission_fkey',
                            ondelete='CASCADE'),
)


# Role

# Project




class RecordNotFound(Exception):
    """Requested record in database was not found"""


async def init_pg(app):
    conf = app['config']['postgres']
    engine = await aiopg.sa.create_engine(
        database=conf['database'],
        user=conf['user'],
        password=conf['password'],
        host=conf['host'],
        port=conf['port'],
        minsize=conf['minsize'],
        maxsize=conf['maxsize'],
    )
    app['db'] = engine


async def close_pg(app):
    app['db'].close()
    await app['db'].wait_closed()