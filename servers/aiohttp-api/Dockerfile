FROM python:3.6-alpine

RUN adduser -D -u 8004 scu

RUN apk add --no-cache \
  postgresql-dev \
  gcc \
  libc-dev \
  libffi-dev

ENV HOME /home/scu
ENV SIMCORE_WEB_OUTDIR $HOME/src/static
ENV SIMCORE_WEB_CONFIG development
ENV IS_CONTAINER_CONTEXT Yes

WORKDIR /home/scu

RUN python3 -m venv .venv &&\
    ~/.venv/bin/pip install --no-cache --upgrade pip &&\
    chown scu:scu -R ~/.venv

COPY servers/aiohttp-api/requirements* ./
RUN ~/.venv/bin/pip install --no-cache -r requirements-prod.txt &&\
    ~/.venv/bin/pip install --no-cache -r requirements-test.txt

# USER scu

EXPOSE 8080
WORKDIR /home/scu/source
VOLUME /home/scu/source

ENTRYPOINT [ "/bin/sh", "./scripts/entrypoint-dev.sh" ]
