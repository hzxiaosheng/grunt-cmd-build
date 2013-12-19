/*
 * grunt-cmd-build
 * https://github.com/hzxiaosheng/grunt-cmd-build
 *
 * Copyright (c) 2013 hzxiaosheng
 * Licensed under the MIT license.
 */

'use strict';
var BuildCache = require("cmdbuild").BuildCache;
var cmd_util = require("cmdbuild").cmd_util;
var id_util = require("cmdbuild").id_util;
var fs = require("fs");
var path = require("path");

module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    var buildCache = new BuildCache({
        checkInterval: -1
    });
    cmd_util.initCache(buildCache);

    grunt.registerMultiTask('cmd_build', 'a high performance build tool for cmd(seajs) wrappered javascript codes', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            seajs:{
                base: "."
            }
        });

        var base = options.seajs.base;
        if(base){
            base = path.resolve(base).replace(/\\+/g,"/");
            options.seajs.base = base;
        }
        console.log("base: " + base)
        // Iterate over all specified file groups.
        this.files.forEach(function(fileInfo) {
            var src = fileInfo.src[0];
            var dest = fileInfo.dest;

            var combinedCode  = cmd_util.doAstBuild(src, options);

            if(!fs.existsSync(dest) && dest.slice(-3) !== ".js"){
                fs.mkdirSync(dest, "0666");
            }
            if(dest.slice(-3) !== ".js"){
                dest = path.join(dest, path.basename(src));
            }
            if (options.ext) {
                dest = dest.replace(/\.js$/, options.ext)
            }
            grunt.file.write(dest, combinedCode);

            // Print a success message.
            grunt.log.writeln('File "' + dest + '" created.');
        });
    });

};