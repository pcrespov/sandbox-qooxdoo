FROM python:3.6-alpine

ENV FLASK_APP simcore.py
ENV FLASK_CONFIG production

RUN adduser -D simcore
USER simcore

WORKDIR /home/simcore

COPY --chown=simcore:simcore requirements requirements
RUN python -m venv venv
RUN venv/bin/pip install -r requirements/docker.txt

COPY app app
COPY migrations migrations
COPY simcore.py config.py boot.sh ./

# run-time configuration
EXPOSE 5000
ENTRYPOINT ["./boot.sh"]
