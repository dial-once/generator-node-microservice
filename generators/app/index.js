'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var ini = require('ini');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the super-excellent ' + chalk.red('generator-node-microservice') + ' generator!'
    ));

    var gitconfig;

    try {
      gitconfig = ini.parse(fs.readFileSync('./.git/config', 'utf-8'));
    } catch(e){
      gitconfig = {'remote "origin"': {url: ''}};
    }

    var prompts = [{
      type    : 'input',
      name    : 'name',
      message : 'Your project name:',
      default : this.appname
    },{
      type    : 'input',
      name    : 'git',
      message : 'Github URL',
      default : gitconfig['remote "origin"'].url
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      done();
    }.bind(this));
  },

  writing: function () {
    this.fs.copy(
      this.templatePath(),
      this.destinationPath()
    );
    this.fs.copy(
      this.templatePath('.*'),
      this.destinationRoot()
    );
    this.template('index.js', 'index.js', this.props);
    this.template('package.json', 'package.json', this.props);
  },

  install: function () {
    this.npmInstall();
    this.log(yosay(
      'Do not forget to copy the super-awesome .env.tpl file to .env and update the vars!'
    ));
  }
});
