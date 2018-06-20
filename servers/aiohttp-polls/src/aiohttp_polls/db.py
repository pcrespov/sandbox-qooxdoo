import logging

from aiohttp import web
from sqlalchemy import (
    MetaData, Table, Column, ForeignKey,
    Integer, String, Date
)

import aiopg.sa

_LOGGER = logging.getLogger(__name__)

# TODO: what is this metadata needed for?
meta = MetaData()

question = Table(
  'question', meta,
  Column('id', Integer, primary_key=True),
  Column('question_text', String(200), nullable=False),
  Column('pub_date', Date, nullable=False)
)

choice = Table(
  'choice', meta,
  Column('id', Integer, primary_key=True),
  Column('choice_text', String(200), nullable=False),
  Column('votes', Integer, server_default="0", nullable=False),
  Column('question_id',
         Integer,
         ForeignKey('question.id', ondelete='CASCADE'))
)


async def init_db(app):
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
  app['db'] = engine # <----!!!
  _LOGGER.debug("db initalized")

async def close_db(app):
  engine = app['db']
  engine.close()
  await engine.wait_closed()
  _LOGGER.debug("db closed")


def setup(app):
  assert isinstance(app, web.Application)
  app.on_startup.append(init_db)
  app.on_shutdown.append(close_db)
