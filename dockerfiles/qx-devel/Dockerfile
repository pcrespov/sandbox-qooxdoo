FROM node:8.9.2

LABEL maintainer=pcrespov

# TODO:  set as host user, otherwise outdir is set as root in the host

ENV NPM_CONFIG_LOGLEVEL warn
ENV QOOXDOO_PATH=/home/node/qooxdoo-sdk
ENV QOOXDOO_COMPILER_DIR=/home/node/qooxdoo-compiler
ENV PATH="${QOOXDOO_PATH}/tool/bin:${QOOXDOO_COMPILER_DIR}:${QOOXDOO_COMPILER_DIR}/node_modules/.bin/:${PATH}"

#
# + /home/node/             $HOME
#    + client/              $WORKDIR
#    + qooxdoo-compiler/    *
#       - qx
#       + node_modules/
#           + .bin/         *
#    + qooxdoo-sdk/
#       + tool/
#           + bin/          *
#
#  * = in $PATH

# (1) Installs qooxdoo compiler for development
WORKDIR /home/node

RUN git clone --depth 1 https://github.com/qooxdoo/qooxdoo.git ${QOOXDOO_PATH} && \
    git clone --depth 1 https://github.com/qooxdoo/qooxdoo-compiler.git ${QOOXDOO_COMPILER_DIR} && \
    cd ${QOOXDOO_COMPILER_DIR} && \
    npm install npm@latest && \
    npm install

WORKDIR /home/node/client
VOLUME /home/node/client
EXPOSE 8080

CMD ["qx", "serve"]
