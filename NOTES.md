# DEV NOTES

##  TODOS

### doc

- [x] Create doc api but *does not work with es6 syntax*
- [ ] check how babel is used by qx-compiler to translate es5 into es6. @oetiker:
``regarding the es6 problem ... I just found that the qooxdoo compiler, when running in source mode actually almost does what you need ... in outpus-source/transpiled there are all the es5-ified files you need ... the only problem is that the comments are gone ... but I am pretty sure there is anoption in bable which will make them remain there ... so if qx compiler could call bable like that we would get the transpiled es5ified files and could then run the generator on them ... ``

### test

- [ ] TODO: Review [sinonjs](http://sinonjs.org/releases/v2.1.0/fake-xhr-and-server/)
- [ ] TODO: explore qx.dev.unit for mockups, stubs, spies, etc in [writing test classes](http://www.qooxdoo.org/devel/pages/development/frame_apps_testrunner.html#writing-test-classes) 
- [ ] TODO: Review testcafe [integration by cboulanger](https://github.com/cboulanger/qx-contrib-Dialog/blob/testcafe/.travis.yml)

### vscode

- [ ] TODO: modify js formatter to comply with linters .e.g. function () ...


### random
- [ ] TODO: add myapp/config.json and customize upon creation

---
##  ISSUES

- ``qx serve`` or ``qx compile --watch`` failes with ``ENOSPC`` nodejs error

Seems to be related with the fact that the limits of files to watch reached a limit and **not** the lack of disk space. [Here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers) and explanation of technical details. This command set a new limit and made it permanent:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
