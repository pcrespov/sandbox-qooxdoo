FROM node:8.9.2

LABEL maintainer="pcrespov" \
      description="Installation of qooxdoo compiler"

# reuses user defined in base image
USER node

# qooxdoo versioning
ARG version=0.2.10
ENV QX_COMPILER_VERSION=$version

# npm variables
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# access to bin
ENV PATH=$NPM_CONFIG_PREFIX/bin:$PATH


RUN mkdir $NPM_CONFIG_PREFIX
RUN npm install --quiet --no-progress -g \
        npm@5.5.1 \
        qxcompiler@${QX_COMPILER_VERSION} \
 && npm ls -g qooxdoo


WORKDIR /home/node/src
VOLUME  /home/node/src
EXPOSE 8080

ENTRYPOINT [ "qx" ]
