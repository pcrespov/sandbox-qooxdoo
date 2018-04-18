FROM node:8.9.2

LABEL maintainer="pcrespov" \
      description="Installation of qooxdoo compiler. Includes node and python 2.7."

# reuses user defined in base image
USER node

# npm variables
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# qooxdoo variables
ARG version=0.2.10
ENV QOOXDOO_COMPILER_VERSION=$version
ENV QOOXDOO_COMPILER_DIR=$NPM_CONFIG_PREFIX/lib/node_modules/qxcompiler
ENV QOOXDOO_PATH=$QOOXDOO_COMPILER_DIR/node_modules/qooxdoo-sdk

# access to bin
ENV PATH=$NPM_CONFIG_PREFIX/bin:$PATH


RUN mkdir $NPM_CONFIG_PREFIX
RUN npm install --quiet --no-progress -g \
        npm@5.5.1 \
        qxcompiler@${QX_COMPILER_VERSION}


WORKDIR /home/node/src
VOLUME  /home/node/src
EXPOSE 8080

# log info
RUN echo \
 && npm ls -g qooxdoo \
 && cat  $QOOXDOO_COMPILER_DIR/package.json  | grep qooxdoo \
 && python --version \
 && printenv \
 && echo

ENTRYPOINT [ "qx" ]
CMD ["compile"]
