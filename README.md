# AngularJS GitHub Info

This application is based on: AngularJS GitHub Contributors [App](http://daha.github.com/angularJS-github-contributors/) | [GitHub](https://github.com/daha/angularJS-github-contributors/)

## Demo

View the app [AngularJS GitHub Info](http://erkobridee.github.io/angularjs-github-info/).

## Application

* **Interface:** [Twitter Bootstrap](http://twitter.github.com/bootstrap/) using [responsive desgin](http://twitter.github.com/bootstrap/scaffolding.html#responsive)
* **Engine:** [AngularJS](http://angularjs.org/) ( [Guide](http://docs.angularjs.org/guide/) )
* **Features:** List all public repositories, public gists and contributors repository from some GitHub user
* **Data Access:** [GitHub API](http://developer.github.com/)


## Grunt.js support

* dependency: [Node.js](http://nodejs.org/)

* when clone this project run the command: `npm install` inside project directory


### Grunt.js commands

* `grunt` - run jshint (for while only Gruntfile.js passing through jshint >> TODO: adjust all js files to jshint)

* `grunt dev` - start server on port 1337, looking to `app` directory

* `grunt test` - generate deploy version to `gh-pages` on `dist` directory and start server on port 1337 looking to this directory

* `grunt publish` - publish `dist` files on `gh-pages` branch


## Licenses

* All my code is licensed under the [Modified BSD License].


[AngularJS GitHub Info]: http://erkobridee.github.com/angularjs-github-info
[Modified BSD License]: https://github.com/erkobridee/angularjs-github-info/blob/master/LICENSE
