#!/bin/bash

docker build -t http-server:latest . -f-<<EOF
FROM node
RUN npm install http-server -g
WORKDIR /user/src/app
VOLUME  /user/src/app
EXPOSE 8080
ENTRYPOINT ["http-server"]
EOF

