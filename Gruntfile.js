module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            js: {
                dist: {
                    src: [
                        "js/libs/jquery-1.10.2.min.js",
                        "js/main.js' "
                    ],
                    dest: "js/build/production.js"
                }
            }
        },

        uglify: {
            build: {
                src:    "js/build/production.js",
                dest:   "js/build/production.min.js"
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1,
                keepSpecialComments: 0
            },
            site: {
                src: ["css/main.css"],
                dest: "css/build/production.min.css"
            }
        },

        'string-replace': {
            urls: {
                files: {
                    '<%= cssmin.site.dest %>': '<%= cssmin.site.dest %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /url\(i\//gi,
                            replacement: "url(../../i/"
                        }
                    ]
                }
            },

            fonts: {
                files: {
                    '<%= cssmin.site.dest %>': '<%= cssmin.site.dest %>'
                },
                options: {
                    replacements: [
                        {
                            pattern: /url\(fonts\//gi,
                            replacement: "url(../../fonts/"
                        }
                    ]
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-cssmin");
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask("default", ["concat", "uglify", "cssmin", "string-replace:urls", "string-replace:fonts"]);

};