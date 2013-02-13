'use strict';

// Basic template description.
exports.description = 'Create a complete Hull.io application.';

// Template-specific notes to be displayed before question prompts.
exports.notes = 'Be sure to have your ApplicationId and OrganizationURL ready.\n If not, login to http://hull.io ans create an app first.';

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
  ], function (err, props) {
    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Gather standard and additional dependencies.
    var devDependencies = {
      "grunt": "0.4.0rc7",
      "grunt-contrib-handlebars" : "0.5.4rc7",
      "grunt-contrib-copy": "0.4.0rc7",
      "grunt-contrib-concat": "0.1.2rc6",
      "grunt-contrib-uglify": "0.1.1rc6",
      "grunt-contrib-jshint": "0.1.1rc6",
      "grunt-contrib-mincss": "0.4.0rc7",
      "grunt-contrib-connect": "0.1.1rc6",
      "grunt-contrib-clean": "0.4.0rc6",
      "grunt-contrib-htmlmin": "0.1.1rc7",
      "grunt-contrib-imagemin": "0.1.1rc8",
      "grunt-contrib-livereload": "0.1.0rc8",
      "grunt-bower-hooks": "~0.1.2",
      "grunt-usemin": "~0.1.4",
      "grunt-regarde": "~0.1.1",
      "grunt-open": "~0.1.0",
      "matchdep": "~0.1.1"
    };

    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', _.extend(props, {
      keywords: [],
      node_version: '0.8.x',
      devDependencies: devDependencies
    }));

    // Gather client-side, browser dependencies
    var dependencies = {
      'jquery': '1.8.x'
    };

    // Generate a component.json file.
    init.writePackageJSON('component.json', {
      name: props.name,
      version: props.version,
      dependencies: dependencies
    });

    done();
  });
};

