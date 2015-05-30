# sails-bem-project-stub
[![Build Status](https://travis-ci.org/alexbaumgertner/sails-bem-project-stub.svg)](https://travis-ci.org/alexbaumgertner/sails-bem-project-stub)

a stub [Sails](http://sailsjs.org) application with [BEM](http://bem.info) template render system.

### How to deploy to ubuntu server

```bash
#!/bin/sh

sudo apt-get update && sudo apt-get upgrade

sudo locale-gen ru_RU.UTF-8
sudo dpkg-reconfigure locales
curl -sL https://deb.nodesource.com/setup | sudo bash -

sudo apt-get install nodejs
sudo apt-get install build-essential
sudo apt-get install imagemagick
sudo apt-get install git
sudo apt-get install nginx
sudo apt-get install mongodb

sudo mkdir /var/www && cd /var/www/
sudo git clone https://github.com/alexbaumgertner/sails-bem-project-stub.git sails-bem-project-stub
sudo chown -R www-server:www-server sails-bem-project-stub
cd sails-bem-project-stub

npm i
bower i

node_modules/.bin/enb make -d frontend --no-cache

npm i -g nodemon
nodemon app.js
```

### Add views

* Add layout
```bash
./node_modules/bem/bin/bem create -b controller -e index -m action -v index -l frontend/common.blocks -T bemtree
```

### Addons

* [sails-hook-bem-render](https://www.npmjs.com/package/sails-hook-bem-render) [BEM](https://en.bem.info) template engine render
* [sails-hook-dev](https://www.npmjs.com/package/sails-hook-dev) You can see some important info about your app: http://localhost:1337/dev/
* [sails-hook-seed](https://www.npmjs.com/package/sails-hook-seed) This hook allows you to save and get mock-data from database
* [sails-test-helper](https://github.com/zand3rs/sails-test-helper) Test helper suite for Sails.js using Mocha test framework
