# AngularJS GitHub Info 

[![Node Dependencies](https://david-dm.org/erkobridee/angularjs-github-info.png)](https://david-dm.org/erkobridee/angularjs-github-info) [![Node devDependencies](https://david-dm.org/erkobridee/angularjs-github-info/dev-status.png)](https://david-dm.org/erkobridee/angularjs-github-info#info=devDependencies)

This application is based on: AngularJS GitHub Contributors [App](http://daha.github.com/angularJS-github-contributors/) | [GitHub](https://github.com/daha/angularJS-github-contributors/)

*By [@ErkoBridee](https://twitter.com/erkobridee)*


## Demo

View the app [AngularJS GitHub Info](http://erkobridee.github.io/angularjs-github-info/).


## Application

* **Interface:** [Twitter Bootstrap](http://twitter.github.com/bootstrap/) v3.0.0

* **Engine:** [AngularJS](http://angularjs.org/) v1.1.5 ( [Guide](http://docs.angularjs.org/guide/) )

* **Features:** List all public repositories, public gists and contributors repository from some GitHub user

* **Data Access:** [GitHub API](http://developer.github.com/)


## Install AngularJS GitHub Info

Enter the following commands in the terminal.

1. `git clone https://github.com/erkobridee/angularjs-github-info.git`

2. `cd angularjs-github-info`

3. `bower install`

4. `npm install`


### Prerequisites

* Must have [Git](http://git-scm.com/) installed

* Must have [node.js (at least v0.8.1)](http://nodejs.org/) installed with npm (Node Package Manager)

* Must have [Grunt](https://github.com/gruntjs/grunt) node package installed globally.  `sudo npm install -g grunt-cli`

* Must have [Bower](https://github.com/bower/bower) node package installed globally.  `sudo npm install -g bower`


### Grunt.js commands

* `grunt` - run jshint

* `grunt dev` - development mode, prepare files, watch changes and start server on port 1337

* `grunt prod` - generate deploy version to `gh-pages` on `dist` directory and start server on port 1337 looking to this directory

* `grunt publish` - publish `dist` files on `gh-pages` branch


## Licenses

* All my code is licensed under the [MIT License].


[AngularJS GitHub Info]: http://erkobridee.github.com/angularjs-github-info
[MIT License]: http://erkobridee.mit-license.org/
