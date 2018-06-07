FROM node:8.9.2

LABEL maintainer=pcrespov

# Renaming node as scu
RUN groupmod --new-name scu node && \
    usermod --login scu --move-home --home /home/scu node

ENV NPM_CONFIG_LOGLEVEL warn

ENV HOME /home/scu

ENV QOOXDOO_PATH /home/scu/qooxdoo-sdk
ENV QOOXDOO_COMPILER_DIR /home/scu/qooxdoo-compiler
ENV QOOXDOO_VERSION "master"

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
USER scu

# (1) Installs qooxdoo compiler for development
RUN git clone --depth 1 https://github.com/qooxdoo/qooxdoo.git ${QOOXDOO_PATH} && \
    git clone --depth 1 https://github.com/qooxdoo/qooxdoo-compiler.git ${QOOXDOO_COMPILER_DIR} && \
    cd ${QOOXDOO_COMPILER_DIR} && \
    npm install npm@latest && \
    npm install

WORKDIR /home/scu/client
VOLUME /home/scu/client
EXPOSE 8080

CMD ["qx", "serve"]
