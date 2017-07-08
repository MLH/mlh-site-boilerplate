# MLH/mlh-site-boilerplate

This is the boilerplate that [Major League Hacking (MLH)][mlh] uses in the
development of static websites.

## Setup

Before you start, make sure you have [npm][npm-install] installed and the
relevant version of Ruby (probably using [rvm][rvm]).

You will also need [gulp][gulp] and [bundler][bundler] eventually, so lets get
those now too.

```bash
$ npm install -g gulp
$ gem install bundler
```

Now let's install the development dependencies by running the NPM installer and
bundler:

```bash
$ npm install
$ bundle install
```

**Note:** These steps may require the use of `sudo` depending on your
environment.

## Special Thanks

Big shout out to the [Minimill Project Template](https://github.com/minimill/project-template)
for inspiring this project.

[mlh]: http://mlh.io
[github-pages]: https://pages.github.com
[jekyll]: https://jekyllrb.com
[gulp]: http://gulpjs.com/
[npm-install]: https://nodejs.org/en/download/
[rvm]: https://rvm.io/
[bundler]: http://bundler.io/
