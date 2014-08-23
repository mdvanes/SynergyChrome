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
                    banner: 'javascript:(function(){',
                    footer: '})();\n' +
                        '/*! <%= pkg.name %> by <%= pkg.author %> - v<%= pkg.version %> - ' +
                        '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
                    // beautify: true, // for debugging
                },
                files: {
                    'synergyChromeBookmarklet.min.js': ['js/*.js']
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
                        }
                    ]
                },
                files: [
                    {expand: true, flatten: true, src: ['synergyChromeBookmarklet.min.js'], dest: '.'}
                ]
            },
        },

    });

    // Tasks
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', ['jshint', 'uglify', 'replace:build']);
};
