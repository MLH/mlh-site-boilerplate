# MLH/mlh-site-boilerplate

This is the boilerplate that [Major League Hacking (MLH)][mlh] uses in the  
development of static websites. The basic flow to setup and run the  
website is to install a Shell (Terminal, Bash, or a Subsystem), install  
[Node.js and npm][nodejs], [rvm][rvm], switch to Ruby 2.2.4 with rvm,  
install [Gulp][gulp] to speed up common development tasks, and install  
[bundler][bundler] to preprocess the [Jekyll][jekyll] templated webpages.  

## Setup

### **For macOS Users**

Install macOS Command Line Developer Tools by opening Terminal.app (use  
Spotlight to search for it), type ```gcc```, and accept the conditions.  

Download and open the macOS Installer for Node.js to get [Node Package  
Manager (npm)][npm-macOS].

**Note:** Make sure you select the "Current" option not "LTS".  

Next, install [rvm][rvm-macOS]. The first command downloads scripts  
It downloads setup scripts that you must execute in order to have  
global access from any terminal window.

```bash
curl -sSL https://get.rvm.io | bash -s stable
```

Open Finder, go to your User folder, press CMD + SHIFT + . and open  
the file .bash_profile. Add the following line to the top.

``` bash
source ~/.profile
```

Skip to the section [For All Users](#for-all-users) to continue.

### **For Ubuntu and Windows 10 Users**

**IMPORTANT:** For Windows 10 users, use a Ubuntu environment on top of  
Windows like [Windows Subsystem for Linux][bash-windows].  

Installing [npm][npm-linux] and [rvm][rvm-linux] on the Bash terminal  
for both Windows and Ubuntu becomes: 

```bash
$ curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
$ sudo apt-get install -y nodejs
$ sudo apt-get install rvm
```

**Note:** Other Linux environments like [MSYS2][msys2] on top of  
Windows 10 or Debian Linux and Red Hat Linux operating systems will  
require you to use their own package manager so check [npm][npm-bash]  
and [rvm][rvm-macOS] for the particular commands for your  
Unix environment.

### <a name="for-all-users"></a>**For All Users**

Install [Gulp][gulp] globally since you will need these programs  
eventually. Clone this repository into a folder of your choice, then  
change directory to go into the respository folder you just cloned.  
Install the Node dependencies with npm and switch the Ruby version  
to Ruby-2.2.4 with rvm and install [Bundler][bundler] afterwards.  
The last step is installing all other dependencies with bundler.

```bash
sudo npm install -g gulp

git clone https://github.com/MLH/mlh-site-boilerplate.git
cd mlh-site-boilerplate
npm install

sudo rvm install "ruby-2.2.4"
sudo rvm use 2.2.4
sudo gem install bundler

bundle install
```

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

Generates the website from `master` and deploys it to the `gh-pages`  
branch. This is so you can write custom logic in Jekyll and still have  
it deployed on a static hosting provider like [GitHub Pages][github-pages].

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

[rvm]: https://rvm.io/
[rvm-macOS]: https://rvm.io/rvm/install
[rvm-linux]: https://rvm.io/rvm/install

[nodejs]: https://nodejs.org/
[npm-macOS]: https://nodejs.org/en/download/
[npm-linux]: https://nodejs.org/en/download/package-manager/

[bash-windows]: https://docs.microsoft.com/en-us/windows/wsl/install-win10
[msys2-windows]: http://www.msys2.org/
[homebrew-mac]: https://brew.sh

[mlh]: http://mlh.io
[github-pages]: https://pages.github.com
[jekyll]: https://jekyllrb.com
[gulp]: http://gulpjs.com/
[bundler]: http://bundler.io/
