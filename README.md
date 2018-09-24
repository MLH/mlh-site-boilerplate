# MLH/mlh-site-boilerplate

This is the boilerplate that [Major League Hacking (MLH)][mlh] uses in the
development of static websites.  It combines [Handlebars][handlebars] and [Webpack][webpack] to automate and speed up common development tasks.

## Setup

Before you start, make sure [npm][npm-install] is installed on your computer.

Now let's install the development dependencies by running the NPM installer:

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
 - Composes handlebars partials into html
 - Lints and compiles SASS into CSS, applies vendor prefixes
 - Lints and compiles Javascript
 - Bundles js and css into minified, versioned files
 - Optimizes images and builds them to the `img` folder inside `dist`

### `npm run start`

Spins up webpack dev server for local development

 - Watches files inside `_src/` directory and updates website on change
 - Builds the assets into `dist` folder and serves them on port `localhost:8080`
 - If you make changes outside the `_src/` directory you'll have to stop the server with Ctrl + C and start it again

### `npm run deploy`

Generates the website from master and deploys it to the gh-pages branch. This is so you can write custom logic in  and still have it deployed on a static hosting provider like GitHub Pages

  - Builds all assets into a static folder `dist`
  - Pushes up the folder to gh-pages branch on github

## Structure

```bash
├── .gitignore                                # Defines which files Git should diregard
├── .eslintrc.js                              # Configuration file for eslint
├── .scss-lint.yml                            # Rules for linting SASS files
├── config.js                                 # Site configuration
├── README.md                                 # How to use this project
├── dist/                                     # Folder containing all the resources for the website
    ├── img/                                  # Optimized images and SVGs
    └── mlh.v.1.0.0.min.css                   # Minified css assets
    └── mlh.v.1.0.0.min.js                    # Minified js assets
    └── index.html                            # Default html page
├── src/                                      # Folder containing all the resources for the website
    ├── _includes/                            # Handlebars partials
        └── head.hbs                          # Handlebars partial for the <head> tag
        └── main_navigation.hbs               # Handlebars partial for the <nav> tag
        └── main_navigation_links.hbs         # Links inside of main_navigation.hbs
        ├── tracking/                         # Tracking codes
            └── segment.hbs                   # Segment menagas all of your different tracking platforms(Facebook, Twitter, Google etc...)
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
        ├── handlebarsHelpers/                # Handlabars can use helper methods in templates
            └── canonicalGenerator.js         # Builds canonical url index.hbs
        ├── lib/                              # External JS libraries
            └── jquery-2.2.2.min.js           # jQuery
            └── jquery-anchorjumps-1.0.min.js # jQuery
            └── jquery-waypoints.min.js       # jQuery
├── webpack.config.js                         # Defines webpack tasks for development
├── package.json                              # Javascript Dependencies
├── package-lock.json                         # Keeps track of the dependency tree
```

## Special Thanks

Big shout out to the [Minimill Project Template](https://github.com/minimill/project-template)
for inspiring this project.

[mlh]: http://mlh.io
[github-pages]: https://pages.github.com
[npm-install]: https://nodejs.org/en/download/
[webpack]: https://webpack.js.org/
[handlebars]: https://handlebarsjs.com/
