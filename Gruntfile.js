module.exports = function(grunt) {
	'use strict';

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-ember-handlebars');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['clean:beforeBuild','build']);
  grunt.registerTask('build', ['jshint', 'ember_handlebars', 'less', 'concat:javascript','concat:stylesheet', 'copy:build', 'clean:afterBuild']);//,'html2js','concat','recess:build','copy:assets']);
  grunt.registerTask('test', ['clean:test','concat:test','copy:test','qunit']);
  grunt.registerTask('run', ['default','test','connect','watch']);
  grunt.registerTask('dist', ['clean:dist','default', 'test', 'uglify', 'cssmin', 'copy:dist']);

	//All grunt related functions
	grunt.initConfig({
		jshint: {
			files: ['gruntfile.js', 'src/app/models/*.js','src/app/controllers/*.js','src/app/*.js','src/app/views/*.js','src/app/routes/*.js'],
			options: {
        curly:true,
				eqeqeq:true,
				eqnull:true,
				strict:true,
				latedef:true,
				undef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
				globals: {
          alert:true,
					force:true,
					jQuery: true,
					console:true,
					module:true,
					document:true,
					Ember:true,
					$:true,
					App:true,
          DS:true
				}
			}
		},
		concat: {
			javascript: {
				src:[
          'vendor/jquery-2.0.3.js',
          'vendor/handlebars-1.0.0.js',
          'vendor/ember-1.0.0.js',
          'vendor/ember-data-1.0.0-beta-1.js',
          'vendor/bootstrap.3.0.0.js',
          'tmp/templates.js',
          'src/app/app.js',
          'src/app/routes/*.js',
          'src/app/controllers/*.js',
          'src/app/models/*.js',
          'src/app/views/*.js'
        ],
				dest:'build/js/app.js'
			},
      stylesheet: {
        src:[
          'vendor/bootstrap-3.0.0.css',
          'tmp/style.css'
        ],
        dest:'build/css/style.css'
      },
			test: {
				src:['src/tests/*.js'],
				dest:'qunit/tests.js'
			}
		},
		less: {
      compile: {
        files: {
          "tmp/style.css":"src/less/*.less"
        }
      }
		},
		ember_handlebars: {
			compile: {
				options: {
					processName: function(fileName) {
						var arr = fileName.split("."),
							path = arr[arr.length - 2].split("/"),
							name = path[path.length -1];
						return name;
					}
				},
				files: {
					"tmp/templates.js":"src/app/templates/*.hbs"
				}
			}
		},
		clean: {
      beforeBuild: ["build", "tmp"],
      afterBuild: ["tmp"],
      test: ["qunit"],
      dist: ["dist"]
    },
		copy: {
      build: {
        files: [
          {'build/index.html':'src/app/index.html'},
          {expand:true, cwd:'src/assets/img/', src: ['**'], dest: 'build/img/'}
        ]
      },
      dist: {
        files: [
          {'dist/index.html':'build/index.html'},
          {expand:true, cwd:'build/img/', src: ['**'], dest: 'dist/img/'}
        ]
      },
      test:{
        files: [
          {'qunit/index.html':'src/tests/index.html'},
          {'qunit/qunit-1.11.0.js':'vendor/qunit-1.11.0.js'},
          {'qunit/qunit-1.11.0.css':'vendor/qunit-1.11.0.css'}
        ]
      }
		},
		uglify: {
			dist: {
				src: 'build/js/app.js',
				dest:'dist/js/app.min.js'
			}
		},
		cssmin: {
			compress: {
				files: {
					"dist/css/app.min.css":["build/css/style.css"]
				}
			}
		},
		watch: {
			scripts: {
        files: ['vendor/*.js','src/app/*.js','src/app/index.html','src/app/models/*.js','src/app/controllers/*.js','src/app/views/*.js','src/app/routes/*.js','src/less/*.less','src/app/templates/*.hbs', 'src/tests/*.js'],
				tasks: ['build','ember_handlebars', 'less', 'concat', 'copy', 'clean:afterBuild', 'test'],
				options: {
					debounceDelay:300
				}
			},
			images: {
				files: ['app/images/*'],
				tasks:['clean', 'copy'],
				options: {
					debounceDelay:300
				}
			}
		},
		qunit: {
			all: ['qunit/index.html']
		},
		connect: {
			debug: {
				options: {
					port:9090,
					base:'build'
				}
			},
			test: {
				options: {
					port:9092,
					base:'qunit'
				}
			}
		}
	});
};
