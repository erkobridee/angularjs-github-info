# AngularJS GitHub Info 

[![Node Dependencies](https://david-dm.org/erkobridee/angularjs-github-info.png)](https://david-dm.org/erkobridee/angularjs-github-info) [![Node devDependencies](https://david-dm.org/erkobridee/angularjs-github-info/dev-status.png)](https://david-dm.org/erkobridee/angularjs-github-info#info=devDependencies)

This application is based on: AngularJS GitHub Contributors [App](http://daha.github.com/angularJS-github-contributors/) | [GitHub](https://github.com/daha/angularJS-github-contributors/)

*By [@ErkoBridee](https://twitter.com/erkobridee)*


## Demo

View the app [AngularJS GitHub Info](http://erkobridee.github.io/angularjs-github-info/).


## Application

* **Interface:** [Twitter Bootstrap](http://twitter.github.com/bootstrap/) v3.0.3

* **Engine:** [AngularJS](http://angularjs.org/) v1.2.4 ( [Guide](http://docs.angularjs.org/guide/) )

* **Features:** List all public repositories, public gists and contributors repository from some GitHub user

* **Data Access:** [GitHub API](http://developer.github.com/)


## Install AngularJS GitHub Info

Enter the following commands in the terminal.

```bach
$ git clone https://github.com/erkobridee/angularjs-github-info.git
$ cd angularjs-github-info
$ bower install
$ npm install
```

### Prerequisites

* Must have [Git](http://git-scm.com/) installed

* Must have [node.js (at least v0.8.1)](http://nodejs.org/) installed with npm (Node Package Manager)

* Must have [Grunt](https://github.com/gruntjs/grunt) node package installed globally.  `[sudo] npm install -g grunt-cli`

* Must have [Bower](https://github.com/bower/bower) node package installed globally.  `[sudo] npm install -g bower`


### Grunt.js commands

* `grunt` - run jshint

* `grunt server` - development mode, prepare files, watch changes and start server on port 1337

* `grunt server:dist` - generate deploy version on `dist` directory and start server on port 1337 looking to this directory

* `grunt gh_pages` - publish deploy version files on `gh-pages` branch

  * `grunt gh_pages:init` - create local directory with github repository on gh_pages branch


## Licenses

* All my code is licensed under the [MIT License].


[AngularJS GitHub Info]: http://erkobridee.github.com/angularjs-github-info
[MIT License]: http://erkobridee.mit-license.org/
