# tutorials

```bash
# serve *tweets* application from cwd 
docker-compose up

# serve myapp application from cwd
TARGET_DIR=myapp docker-compose up

# shut it all down from cwd
docker-compose down
```

## Integrate theme

Contributions are *not* versioned. To install them:

``` bash
 docker-compose run --entrypoint=/bin/bash qx ./install-contrib.sh
```

which will run

```bash
# this is in ./install-contrib.sh
 qx contrib update
 qx contrib list
 qx contrib install ITISFoundation/qx-osparc-theme
```

inside of the container.

## Testing

To create testing scripts and runners from project

```bash
# assuming a virtual environment named py2 i.e. conda create -n py2 python=2
source activate py2

$myapp/generate.py test
# open ./test/index.html in browser
```