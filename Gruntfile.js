module.exports = function(grunt) {
	'use strict';
	//All grunt related functions

	grunt.initConfig({
		jshint: {
			files: ['gruntfile.js', 'app/*.js'],
			options: {
				eqeqeq: true,
				eqnull: true,
				latedef: true,
				undef: true,
				globalstrict: true,
				force: true,
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true,
					Ember: true,
					$: true,
					App: true
				}
			}
		},
		concat: {
			vendor: {
				src: ['app/library/jquery-1.9.1.js', 'app/library/handlebars-1.3.0.js', 'app/library/ember-1.4.0.js'],
				dest: 'debug/lib.js'
			},
			app: {
				src: ['app/*.js'],
				dest: 'debug/app.js'
			},
			test: {
				src: ['app/tests/*.js'],
				dest: 'qunit/tests.js'
			},
			testLib: {
				src: 'debug/lib.js',
				dest: 'qunit/lib.js'
			},
			testApp: {
				src: 'debug/app.js',
				dest: 'qunit/app.js'
			}
		},
		uglify: {
			build: {
				src: ['debug/lib.js', 'debug/app.js'],
				dest: 'release/app.min.js'
			}
		},
		qunit: {
			all: {
				options: {
					urls: [
						'http://localhost:9092/index.html'
					],
					force: true
				}
			}
		},
		watch: {
			scripts: {
				files: ['app/library/*.js', 'app/*.js', 'app/tests/*.js'],
				tasks: ['concat'],
				options: {
					debounceDelay: 100
				}
			},
			tests: {
				files: ['app/tests/*.js'],
				tasks: ['qunit'],
				options: {
					debounceDelay: 100
				}
			}
		},
		connect: {
			debug: {
				options: {
					port: 9090,
					base: 'debug'
				}
			},
			release: {
				options: {
					port: 9091,
					base: 'release'
				}
			},
			test: {
				options: {
					port: 9092,
					base: 'qunit'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-qunit');

	grunt.registerTask('default', ['concat', 'connect', 'watch']);
	grunt.registerTask('release', ['jshint', 'uglify']);
};