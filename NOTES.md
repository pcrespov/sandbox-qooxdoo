# DEV NOTES

## TODOS

-[ ] TODO: explore qx.dev.unit for mockups, stubs, spies, etc
-[ ] TODO: Create tests
-[ ] TODO: Create doc api
-[ ] TODO: add myapp/config.json and customize upon creation


### vscode

-[ ] modify js formatter to comply with linters .e.g. function () ...


###  ISSUES

- ``qx serve`` or ``qx compile --watch`` failes with ``ENOSPC`` nodejs error

Seems to be related with the fact that the limits of files to watch reached a limit and **not** the lack of disk space. [Here](https://github.com/guard/listen/wiki/Increasing-the-amount-of-inotify-watchers) and explanation of technical details. This command set a new limit and made it permanent:
```bash
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```
