FROM node:8.9.2

LABEL maintainer=pcrespov

# TODO:  set as host user, otherwise outdir is set as root in the host

ENV NPM_CONFIG_LOGLEVEL warn
ENV PATH="/home/node/qooxdoo-compiler/:${PATH}"

#
# + /home/node/            $HOME
#    + client              $
#    + qooxdoo-compiler
#

# (1) Installs qooxdoo compiler for development
WORKDIR /home/node

RUN git clone https://github.com/qooxdoo/qooxdoo-compiler && \
    cd qooxdoo-compiler && \
    #git checkout -b hotfix/patch && \
    #git pull git@github.com:oetiker/qooxdoo.git environment-fix && \
    npm i npm@latest && \
    npm install

WORKDIR /home/node/client
VOLUME /home/node/client
EXPOSE 8080

CMD ["qx", "serve"]
