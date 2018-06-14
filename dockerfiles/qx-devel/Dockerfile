FROM node:8.9.2 as base-stage

LABEL maintainer=pcrespov

# Renaming node as scu
RUN groupmod --new-name scu node && \
    usermod --login scu --move-home --home /home/scu node

ENV HOME /home/scu

ENV NPM_CONFIG_LOGLEVEL warn
ENV NPM_CONFIG_PREFIX $HOME/.npm-global

ENV QOOXDOO_PATH $HOME/qooxdoo-sdk
ENV QOOXDOO_COMPILER_DIR $HOME/qooxdoo-compiler

ENV PATH="${QOOXDOO_PATH}/tool/bin:${QOOXDOO_COMPILER_DIR}:${QOOXDOO_COMPILER_DIR}/node_modules/.bin/:${PATH}:${NPM_CONFIG_PREFIX}/bin"

#
# + /home/node/             $HOME
#    + client/              $WORKDIR
#    + qooxdoo-compiler/    *
#       - qx
#       + node_modules/
#           + .bin/         *
#    + qooxdoo-sdk/
#       + framework         qx library
#       + tool/
#           + bin/          *
#
#  * = in $PATH
#

# FIXME: scu must have same id as host's user so compiler can write in mount volume!
USER scu

# qooxdoo-sdk from source repository. Provides framework and generator.py tools
RUN git clone --depth 1 https://github.com/qooxdoo/qooxdoo.git ${QOOXDOO_PATH} && \
    mkdir ${QOOXDOO_COMPILER_DIR}

WORKDIR /home/scu/client
VOLUME /home/scu/client
EXPOSE 8080

ENTRYPOINT [ "qx" ]
CMD ["serve"]

#-------------------------------------------------------------------
# TODO: switch with arg?? instead?
FROM base-stage as master

# (1) qooxdoo-compiler from source repository.
# TODO: should be able to get any point in time of the master branch (or other)
#     - set specific git commit via command line
#     - label commit id and branch. Label full git command line. Based on label-schema.org
#     - Could --depth 10 and ``git checkout <sha1>`` a commit within last 10?
#     - WARNING: guarantee qooxdoo-sdk and qooxdoo-compiler are in sync
#
RUN git clone --depth 1 https://github.com/qooxdoo/qooxdoo-compiler.git ${QOOXDOO_COMPILER_DIR} && \
    cd ${QOOXDOO_COMPILER_DIR} && \
    npm install npm@latest && \
    npm install 

FROM base-stage as released

# (2) qooxdoo-compiler from npm 
COPY --chown=scu:scu package*.json ${QOOXDOO_COMPILER_DIR}/
RUN cd ${QOOXDOO_COMPILER_DIR} && \
    npm install npm@latest && \
    npm install && \
    mkdir $QOOXDOO_COMPILER_DIR/node_modules/qxcompiler/node_modules/ && \
    ln -s $QOOXDOO_PATH $QOOXDOO_COMPILER_DIR/node_modules/qxcompiler/node_modules/

# NOTE: link above fullfils default --qxpath in the qx create command.
