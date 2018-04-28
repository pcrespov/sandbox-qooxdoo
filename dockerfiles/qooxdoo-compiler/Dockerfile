FROM node:8.9.2

LABEL maintainer="pcrespov" 

# qooxdoo variables
ARG version=0.2.10
ARG build_date

# Labels http://label-schema.org/rc1/
LABEL org.label-schema.schema-version="1.0"
LABEL org.label-schema.build-date=$build_date
LABEL org.label-schema.name="itisfoundation/qooxdoo-compiler"
LABEL org.label-schema.description="qooxdoo compiler"
LABEL org.label-schema.url="http://www.qooxdoo.org"
LABEL org.label-schema.vcs-url="https://github.com/qooxdoo/qooxdoo-compiler"
#LABEL org.label-schema.vcs-ref=$commit_id
#LABEL org.label-schema.vendor="qooxdoo.org"
LABEL org.label-schema.version=$version
LABEL org.label-schema.docker.cmd="docker run -v $(pwd):/home/node/src itisfoundation/qooxdoo-compiler"

# user defined in base image
USER node

# npm variables
ENV NPM_CONFIG_LOGLEVEL=warn
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

# qooxdoo variables
ENV QOOXDOO_COMPILER_VERSION=$version
ENV QOOXDOO_COMPILER_DIR=$NPM_CONFIG_PREFIX/lib/node_modules/qxcompiler
ENV QOOXDOO_PATH=$QOOXDOO_COMPILER_DIR/node_modules/qooxdoo-sdk

# access to bin
ENV PATH=$NPM_CONFIG_PREFIX/bin:$PATH


RUN mkdir $NPM_CONFIG_PREFIX
RUN npm install --quiet --no-progress -g \
        npm@5.5.1 \
        qxcompiler@${QX_COMPILER_VERSION}

  # Overcomes libraries path "../node_modules/qooxdoo-sdk/framework" issue in compile.json
RUN ln -s $QOOXDOO_COMPILER_DIR/node_modules /home/node

WORKDIR /home/node/src
VOLUME  /home/node/src
EXPOSE 8080

ENTRYPOINT [ "qx" ]
CMD ["compile"]
