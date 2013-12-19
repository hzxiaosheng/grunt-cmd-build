/*
 * grunt-cmd-build
 * https://github.com/hzxiaosheng/grunt-cmd-build
 *
 * Copyright (c) 2013 hzxiaosheng
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/dist']
        },

        // Configuration to be run (and then tested).
        cmd_build: {
            options: {
                seajs: {
                    base: "test/src"
                },
                sourceMap: {
                    sourceRoot: '/src/'
                },
                uglify: {
                    beautify: true
                }
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/src/',
                    src: '**/*.js',
                    dest: 'test/dist'
//                    ext: '.combine.js'
                }]
            }
        },

        connect: {
            server: {
                options: {
                    port: 18000,
                    base: 'test/'
                }
            }
        },
        // Unit tests.
        qunit: {
            all: {
                options: {
                    timeout: 1000,
                    urls: [
                        'http://localhost:18000/test.html']
                }
            }
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'cmd_build', 'connect', 'qunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};