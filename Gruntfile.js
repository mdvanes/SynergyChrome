/* jshint scripturl:true */
/* global require, module */
module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), // read package.json to expose it variables under pkg
        watch: {
            script: {
                files: ['js/*.js'],
                tasks: ['build'],
            },
        },

        uglify: {
            build: {
                options: {
                    // beautify: true, // for debugging
                },
                files: {
                    '_tmp/synergyChrome-minified.js': [
                        'js/synergyChrome.js',
                        'js/exports.js']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
            },
            all: [
                'js/*.js'
            ]
        },

        replace: {
            /* keep version number up to date */
            build: {
                options: {
                    patterns: [
                        {
                            match: /\[\[VERSION\]\]/g,
                            replacement: '<%= pkg.version %>'
                        },
                        {
                            match: /\[\[AUTHOR\]\]/g,
                            replacement: '<%= pkg.author %>'
                        },
                        {
                            match: /\[\[BUILDDATE\]\]/g,
                            replacement: '<%= grunt.template.today("yyyy-mm-dd") %>'
                        },
                        {
                            match: /\[\[REPO\]\]/g,
                            replacement: '<%= pkg.repository.url %>'
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['_tmp/synergyChrome-minified.js'], dest: '_tmp'}
                ]
            },
        },

        execute: {
            urlencode: {
                options: {
                    args: ['_tmp/synergyChrome-minified.js', 'synergyChromeBookmarklet.min.js']
                },
                src: 'util/urlencode.js'
            }
        },

        stamp: {
            options: {
                banner: 'javascript:(function(){',
                footer: '})();\n' +
                    '/*! <%= pkg.name %> by <%= pkg.author %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
            },
            js: {
                files: { 
                    src: 'synergyChromeBookmarklet.min.js'
                }
            }
        }
    });

    // Tasks
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['jshint', 'uglify', 'replace:build', 'execute:urlencode', 'stamp']);
};
