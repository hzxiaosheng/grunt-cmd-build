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
            id_util.base(base);
            grunt.log.writeln('use base:' + base);
        }
        var target = this.target;
        var type = options.type || "combine";
        // Iterate over all specified file groups.
        this.files.forEach(function(fileInfo) {
            var src = fileInfo.src[0];
            var dest = fileInfo.dest;
            var generatedCode;
            if(type.indexOf("removeSea") == 0){
                var srcCode = grunt.file.read(src, "UTF8");
                if(type === "removeSea4cmd"){
                    generatedCode = cmd_util.removeSea4cmd(srcCode, options);
                }else{//removeSea4amd
                    generatedCode = cmd_util.removeSea4amd(srcCode, options);
                }
                
            }else{
                if(["combine","combo","combine_only"].indexOf(type) !== -1){
                     options.beautify = true;
                }
                generatedCode = cmd_util.doAstBuild(src, options);
            }

            if(!fs.existsSync(dest) && dest.slice(-3) !== ".js"){
                fs.mkdirSync(dest, "0666");
            }
            if(dest.slice(-3) !== ".js"){
                dest = path.join(dest, path.basename(src));
            }
            if (options.ext) {
                dest = dest.replace(/\.js$/, options.ext)
            }
            grunt.file.write(dest, generatedCode);

            // Print a success message.
            grunt.log.writeln('File "' + dest + '" created.');
        });
    });

};