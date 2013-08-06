/*global module:true*/
var yeomanConfig = {
  app: 'app',
  dist: 'dist'
};


module.exports = function (grunt) {

  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    yeoman: yeomanConfig,

    open: {
      server: {
        url: 'http://localhost:<%= connect.options.port %>'
      }
    },

    // default watch configuration
    watch: {
      components: {
        files: ['app/components/**/*.js'],
        tasks: ['concat']
      },
      handlebars: {
        files: ['app/components/**/*.hbs'],
        tasks: ['handlebars']
      },
      compiled: {
        options: {
          livereload: true
        },
        files: [
          'app/*.html',
          '{.tmp,app}/styles/*.css',
          '{.tmp,app}/scripts/*.js',
          'app/images/*.{png,jpg,jpeg}'
        ]
      }
    },

    jshint: {
      all: [
        'app/scripts/[^templates].js',
        'app/components/**/*.js'
      ]
    },

    handlebars: {
      compile: {
        files: {
          "app/scripts/templates.js" : ["app/components/**/*.hbs"]
        },
        options: {
          wrapped: false,
          namespace: "Hull.templates",
          processName: function (filename) {
            return filename.replace(/^app\/components\//, '').replace(/\.hbs$/, '');
          }
        }
      }
    },

    connect: {
      options: {
        port: 9000
      },
      app: {
        options: {
          base: 'app'
        }
      }
    },

    clean: {
      dist: ['.tmp', 'dist/*'],
      server: '.tmp'
    },
    uglify: {
      dist: {
        files: {
          'dist/application.js': [
            'app/scripts/*.js'
          ]
        }
      }
    },
    useminPrepare: {
      html: 'index.html'
    },
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css']
    },
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },
    cssmin: {
      dist: {
        files: {
          'dist/application.css': [
            'app/components/ratchet/dist/ratchet.css',
            'app/components/font-awesome/css/font-awesome.css',
            'app/styles/*.css'
          ]
        }
      }
    },

    copy: {
      dist: {
        files: [
          { dest: 'dist/index.php', src: 'dist/index.html' },
          { cwd: 'app/', dest: 'dist/', src: ['.htaccess', 'robots.txt'], expand: true },
          {
            cwd: 'app/components/font-awesome/font/',
            dest: 'dist/font/',
            filter: 'isFile',
            src: '*',
            expand: true
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          removeCommentsFromCDATA: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },

    concat: {
      options: {
        separator: "\n\n\n\n//--------\n\n\n"
      },
      dist: {
        src: ['app/components/**/*.js'],
        dest: 'app/scripts/widgets.js'
      }
    }

  });

  grunt.registerTask('server', [
    'clean:server',
    'connect',
    'open',
    'watch'
  ]);

  grunt.registerTask('test', [
    'clean:server',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concat',
    'jshint',
    'handlebars',
    'useminPrepare',

    'uglify',
    'imagemin',
    'htmlmin',
    'cssmin',
    'usemin',
    'copy'
  ]);

  grunt.registerTask('default', ['build']);

};
