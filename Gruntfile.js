module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        esversion: 6
      },
      src: [
        'src/js/**/*.js',
        '!src/js/_bower.js'
      ]
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'src/js/_bower.js',
        }
      }
    },
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'public/css/style.css': 'src/scss/style.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'public/css/style.min.css': 'src/scss/style.scss' }
      }
    },
    concat: {
      jsDist: {
        src: [
          'src/js/_bower.js',
          'src/js/app.js',
          'src/js/**/*.js'
        ],
        dest: 'public/js/app.js'
      }
    },
    uglify: {
      'public/js/app.min.js': 'public/js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['src/js/**/*.js'],
        // tasks: ['jshint', 'concat', 'uglify'],
        tasks: ['jshint', 'concat'],
        options: { livereload: true }
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'bower_concat', 'concat', 'sass', 'uglify', 'watch']);
};
