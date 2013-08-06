'use strict';

// Basic template description.
exports.description = 'Create a complete Hull.io application.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Be sure to have your ApplicationId and OrganizationURL ready.\n If not, login to http://hull.io and create an app first.';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The initialize template.
exports.template = function (grunt, init, done) {
  var _ = grunt.util._;

  init.process({}, [
    // Prompt for the following values.
    // Built-In
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('repository'),
    init.prompt('licenses'),
    init.prompt('author_name'),
    init.prompt('version'),
    // Custom
    {
      name: 'appId',
      message: 'Application ID'
    }, {
      name: 'orgUrl',
      message: 'Organization URL'
    }
  ], function (err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Gather standard and additional dependencies.
    var devDependencies = {
      "grunt": "~0.4.1",
      "grunt-contrib-handlebars" : "~0.5.9",
      "grunt-contrib-copy": "0.4.1",
      "grunt-contrib-concat": "0.3.0",
      "grunt-contrib-uglify": "0.2.2",
      "grunt-contrib-jshint": "0.6.2",
      "grunt-contrib-cssmin": "0.6.1",
      "grunt-contrib-connect": "0.3.0",
      "grunt-contrib-clean": "0.5.0",
      "grunt-contrib-htmlmin": "0.1.3",
      "grunt-contrib-imagemin": "0.1.4",
      "grunt-bower-hooks": "~0.3.0",
      "grunt-usemin": "~0.1.12",
      "grunt-contrib-watch": "~0.5.1",
      "grunt-open": "~0.2.1",
      "matchdep": "~0.1.2",
      "bower": "~1.1.0"
    };

    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', _.extend(props, {
      keywords: [],
      node_version: '0.8.x',
      devDependencies: devDependencies,
      scripts: {
        postinstall: "$(npm bin)/bower install"
      }
    }));

    // Gather client-side, browser dependencies
    var dependencies = {
      'jquery': '1.8.x'
    };

    // Generate a component.json file.
    init.writePackageJSON('bower.json', {
      name: props.name,
      version: props.version,
      dependencies: dependencies
    });

    done();
  });
};

