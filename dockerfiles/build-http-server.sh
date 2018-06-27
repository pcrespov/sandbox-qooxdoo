#!/bin/bash

docker build -t http-server:latest . -f-<<EOF
FROM node
WORKDIR /user/src/app
RUN npm install http-server -g
EXPOSE 8080
VOLUME /user/src/app
ENTRYPOINT ["http-server"]
EOF

