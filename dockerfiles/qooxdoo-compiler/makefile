IMAGE_NAME=itisfoundation/qooxdoo-compiler
VERSION_TAG=0.2.10
GIT_COMMIT = $(strip $(shell git rev-parse --short HEAD))

default: build

build:
	# FIXME: this does work in mac but not in ubuntu??!
	docker-compose build --no-cache \
		--build-arg build_date=`date -u +"%Y-%m-%dT%H:%M:%SZ"`\
		--build-arg vcs_url=`git config --get remote.origin.url`\
		--build-arg vcs_ref=$(GIT_COMMIT)
	docker tag $(IMAGE_NAME):$(VERSION_TAG) $(IMAGE_NAME):latest

push:
	docker push $(IMAGE_NAME):$(VERSION_TAG)
	docker push $(IMAGE_NAME):latest

debug:
	# Can use info.sh here
	docker-compose run --entrypoint /bin/bash qx

run:
	docker-compose up

inspect:
	docker image inspect $(IMAGE_NAME):latest

release: build push