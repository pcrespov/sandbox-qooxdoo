FROM node:8.9.2

# reuses user defined in base image
USER node

# npm variables
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# access to bin
ENV PATH=$NPM_CONFIG_PREFIX/bin:$PATH


RUN mkdir $NPM_CONFIG_PREFIX
RUN npm install --quiet --no-progress -g \
        npm@5.5.1 \
        qxcompiler

WORKDIR /home/node/src
VOLUME  /home/node/src
EXPOSE 8080

ENTRYPOINT [ "qx" ]
