# MLH/mlh-site-boilerplate

This is the boilerplate that [Major League Hacking (MLH)][mlh] uses in the
development of static websites.  It combines [Jekyll][jekyll] with
[Gulp][gulp] to speed up common development tasks.

## Setup

Before you start, make sure you have [npm][npm-install] installed and the
relevant version of Ruby (probably using [rvm][rvm]).

You will also need [gulp][gulp] and [bundler][bundler] eventually, so lets get
those now too.

```bash
$ npm install -g gulp
$ gem install bundler
```

Make sure that the Gemfile reflects your system's current Ruby version. If it doesn't, make sure to change the Gemfile to reflect your Ruby version.

```bash
$ ruby -v
```

Write down the Ruby version you see.

```
// inside ./Gemfile
...
-ruby "2.2.4" // change this to the current Ruby version, ignoring anything past the release number.
...
```

Now let's install the development dependencies by running the NPM installer and
bundler:

```bash
$ npm install
$ bundle install
```

**Note:** These steps may require the use of `sudo` depending on your
environment.

## Developing

To launch the development server, just run gulp:

```bash
$ gulp
```

## Gulp Commands

An overview of the Gulp commands available:

### `gulp build`

Builds the site into the `_site` directory.

 - Cleans any precompiled assets in `_site`
 - Lints and compiles SASS
 - Lints and compiles Javascript
 - Optimizes images
 - Compiles the Jekyll site

### `gulp serve`

Spins up the Jekyll server for local development

 - Watch the `js/`, `_sass/`, and `img/` directories for changes and run
   related tasks
 - Spin up the Jeykll server with `--watch` and `--incremental` enabled
 - Watch the `_site/` directory for changes and sync to browser

### `gulp deploy`

Generates the website from `master` and deploys it to the `gh-pages` branch. This is so you can write custom logic in Jekyll and still have it deployed on a static hosting provider like [GitHub Pages][github-pages]

 - Watch the `js/`, `_sass/`, and `img/` directories for changes and run
   related tasks
 - Spin up the Jeykll server with `--watch` and `--incremental` enabled
 - Watch the `_site/` directory for changes and sync to browser

## Structure

```bash
├── .gitignore                            # Defines which files Git should diregard
├── .ruby-version                         # Defines the required version of Ruby
├── .scss-lint.yml                        # Rules for linting SASS files
├── Gemfile                               # Ruby Dependencies
├── Gemfile.lock                          # Ruby Dependencies with explicit versions
├── README.md                             # How to use this project
├── _config.yml                           # Jekyll configuration
├── _includes/                            # Jekyll HTML partials
    └── head.html                         # HTML for the <head> tag
    └── main_navigation.html              # HTML for the <nav> tag
    └── main_navigation_links.html        # Links inside of main_navigation.html
    ├── tracking/                         # Tracking codes
        └── google_analytics.html         # Google Analytics Tracking Code
        └── twitter.html                  # Twitter Tracking Code
        └── facebook.html                 # Facebook Tracking Code
├── _layouts/                             # Jekyll HTML layouts
    └── default.html                      # The default template for HTML pages
├── _sass/                                # Stylesheets directory
    └── _base.scss                        # Base styles
    └── _layout.scss                      # Grid system
    └── _shared.scss                      # Shared styles
    └── _typography.scss                  # Typography styles
    └── _util.scss                        # SASS helper functions
    ├── lib/                              # External CSS libraries
        └── animate.min.scss              # CSS animations
        └── reset.min.scss                # CSS reset
        └── hamburgers.min.scss           # CSS Hamburgers Menu
    └── main.scss                         # Variable definitions and list of SASS partials to compile
├── gulpfile.js                           # Defines gulp tasks for development
├── img/                                  # Images and SVGs
├── index.html                            # The default HTML page
├── js/                                   # Javascript libraries and scripts
    └── app.js                            # The default Javascript file
    └── app.min.js                        # The minified default Javascript file
    ├── lib/                              # External JS libraries
        └── jquery-2.2.2.min.js           # jQuery
        └── jquery-anchorjumps-1.0.min.js # jQuery
        └── jquery-waypoints.min.js       # jQuery
├── package.json                          # Javascript Dependencies
```

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
