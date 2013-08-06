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

  grunt.registerTask('default', ['jshint','build','qunit']);
  grunt.registerTask('build', ['clean:build']);//,'html2js','concat','recess:build','copy:assets']);
//  grunt.registerTask('release', ['clean','html2js','uglify','jshint','karma:unit','concat:index', 'recess:min','copy:assets','karma:e2e']);
//  grunt.registerTask('test-watch', ['karma:watch']);

//  grunt.registerTask('default', ['ember_handlebars','less', 'concat', 'clean', 'copy', 'connect','qunit','watch']);
//  grunt.registerTask('release', ['ember_handlebars','less', 'concat', 'clean', 'copy', 'connect','qunit','jshint','uglify','cssmin','clean','copy']);

	//All grunt related functions
	grunt.initConfig({
		jshint: {
			files: ['gruntfile.js', 'src/app/controllers/*.js','src/app/*.js','src/app/views/*.js','src/app/routes/*.js'],
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
					force:true,
					jQuery: true,
					console:true,
					module:true,
					document:true,
					Ember:true,
					$:true,
					App:true
				}
			}
		},
		concat: {
			javascript: {
				src:['vendor/jquery-1.9.1.js','vendor/handlebars-1.0.0-rc3.js','vendor/ember-1.0.0-rc2.js','vendor/bootstrap.3-rc1.js','src/app/app.js','tmp/templates.js','src/app/controllers/*.js','src/app/views/*.js','src/app/routes/*.js'],
				dest:'dist/js/app.js'
			},
      defaultCss: {
        src:['vendor/bootstrap.3-rc1.css','tmp/style.css'],
        dest:'dist/css/style.css'
      },
			test: {
				src:['src/tests/*.js'],
				dest:'qunit/tests.js'
			}
		},
		less: {
      default: {
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
		clean:  ["tmp", "dist/img/"],
		copy: {
			default: {
				files: [
					{'dist/index.html':'src/app/index.html'},
          {'qunit/index.html':'src/tests/index.html'},
          {'qunit/qunit-1.11.0.js':'vendor/qunit-1.11.0.js'},
          {'qunit/qunit-1.11.0.css':'vendor/qunit-1.11.0.css'},
          {expand:true, cwd:'src/assets/img/', src: ['**'], dest: 'dist/img/'}
				]
			}
		},
		uglify: {
			build: {
				src: 'dist/js/app.js',
				dest:'release/js/app.min.js'
			}
		},
		cssmin: {
			compress: {
				files: {
					"release/css/app.min.css":["dist/css/style.css"]
				}
			}
		},
		watch: {
			scripts: {
				files: ['vendor/*.js','src/app/*.js','src/app/controllers/*.js','src/app/views/*.js','src/app/routes/*.js','src/less/*.less','src/app/templates/*.hbs', 'src/tests/*.js'],
				tasks: ['jshint','ember_handlebars', 'less', 'concat','qunit'],
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
			default: {
				options: {
					port:9090,
					base:'dist'
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
