# [qx-compiler]

Build an image with [qx-compiler] and uses compose to map source code in the host
and compile or serve a website

```bash
docker-compose build

docker-compose run qxcompiler -c "qx create myapp -I"
# myapp folder is created in host
ls -l

docker-compose run qxcompiler -c "cd myapp && qx compile"
docker-compose run --service-ports qxcompiler -c "cd myapp && qx serve"

# closes it all
docker-compose down
```

## TODO

- [ ] pass version as argument to dockerfile and tag image ```npm -g list | grep qxcompiler```

[1]:https://www.npmjs.com/package/qxcompiler
[qx-compiler]:https://github.com/qooxdoo/qooxdoo-compiler 
