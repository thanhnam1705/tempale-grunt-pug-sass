module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //task
    pug: {
      compile: {
        options: {
          data: {
            debug: true
          },
          pretty: true
        },
        files: [{
          cwd: 'assets/pug/',
          src: ['**/*.pug', '!_*/*.pug'],
          dest: './public/',
          expand: true,
          ext: '.html'
        }]
      }
    },
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/sass/',
          src: ['*.sass'],
          dest: './public/css/',
          ext: '.css'
        }]
      }
    },
    copy: {
      main: {
        expand: true,
        cwd: 'assets/js/',
        src: '*.js',
        dest: './public/js/',
        ext: '.js'
      },
    },
    jshint: {
      all: ['assets/js/main.js']
    },
    watch: {
      html: {
        files: 'assets/pug/**/*.pug',
        tasks: ['pug']
      },
      css: {
        files: 'assets/sass/**/*.sass',
        tasks: ['sass']
      },
      js: {
        files: ['assets/js/**/*.js'],
        tasks: ['copy'],
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: [
            'public/css/*.css',
            'public/**/*.html',
            'public/js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './public'
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');

  // Default task(s).
  grunt.registerTask('default', ['pug', 'sass', 'copy', 'browserSync', 'watch'])

};