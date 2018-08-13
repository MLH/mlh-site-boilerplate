# MLH/mlh-site-boilerplate

This is the boilerplate that [Major League Hacking (MLH)][mlh] uses in the
development of static websites.  It uses [Webpack][webpack] to automate and speed up common development tasks.

## Setup

Before you start, make sure you have [npm][npm-install] installed.

Now let's install the development dependencies by running the NPM installer and
bundler:

```bash
$ npm install
```

**Note:** These steps may require the use of `sudo` depending on your
environment.

## Developing

To launch the development server, just run:

```bash
$ npm run start
```

## npm Commands

An overview of the NPM commands available:

### `npm run build`

Builds static html and assets into the `dist` directory.

 - Cleans any precompiled assets in `dist`
 - Lints and compiles SASS
 - Lints and compiles Javascript
 - Optimizes images

### `npm run start`

Spins up webpack dev server for local development and opens the project on port

 - Watches the `js/`, `_sass/` inside `_src/` directories for changes
 - Builds the assets into `dist` folder and serves them on port `localhost:8080`
 - For easier hosting on github builds `index.html` file into root directory of the project

## Structure

```bash
├── .gitignore                                # Defines which files Git should diregard
├── .eslintrc.js                              # Configuration file for eslint
├── .scss-lint.yml                            # Rules for linting SASS files
├── config.js                                 # Site configuration
├── README.md                                 # How to use this project
├── index.html                                # Default html page
├── dist/                                     # Folder containing all the resources for the website
    └── mlh.v.1.0.0.min.css                   # Minified css assets
    └── mlh.v.1.0.0.min.js                    # Minified js assets
├── src/                                      # Folder containing all the resources for the website
    ├── _includes/                            # HTML partials
        └── head.hbs                          # HTML for the <head> tag
        └── main_navigation.hbs               # HTML for the <nav> tag
        └── main_navigation_links.hbs         # Links inside of main_navigation.hbs
        ├── tracking/                         # Tracking codes
            └── google_analytics.hbs          # Google Analytics Tracking Code
            └── twitter.hbs                   # Twitter Tracking Code
            └── facebook.hbs                  # Facebook Tracking Code
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
    ├── img/                                  # Images and SVGs
    ├── index.hbs                             # The default HTML page
    ├── js/                                   # Javascript libraries and scripts
        └── app.js                            # The default Javascript file
        ├── lib/                              # External JS libraries
            └── jquery-2.2.2.min.js           # jQuery
            └── jquery-anchorjumps-1.0.min.js # jQuery
            └── jquery-waypoints.min.js       # jQuery
├── webpack.config.js                         # Defines webpack tasks for development
├── package.json                              # Javascript Dependencies
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
[webpack]: https://webpack.js.org/
[rbenv]: https://github.com/rbenv/rbenv