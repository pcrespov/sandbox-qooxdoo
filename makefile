FLAGS=

clean:
	git clean -dXf


build:
	/bin/bash ./dockerfiles/build-http-server.sh && \
	cd dockerfiles/qx-devel; /bin/bash ./bin/build.sh

.PHONY: clean	