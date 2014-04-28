module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  // Default task.
  grunt.registerTask('default', ['jshint', 'uglify:task1', 'cssmin', 'karma']);


  var karmaConfig = function(configFile, customOptions) {
    var options = { configFile: configFile, keepalive: true };
    var travisOptions = process.env.TRAVIS && { browsers: ['Firefox'], reporters: 'dots' };
    return grunt.util._.extend(options, customOptions, travisOptions);
  };


  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    karma: {
      unit: {
        options: karmaConfig('test/test.conf.js')
      }
    },
    // UGLIFY TASK
    uglify: {
      task1: {
         options: {
            preserveComments: 'some',
            report: 'min',
            banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
             '* (c) 2014 Julien VALERY https://github.com/darul75/ng-tinymce-typeahead\n' +
             '* License: MIT \n**/\n'
         },         
         files: {
             'dist/ng-tinymce-typeahead.min.js': ['src/tinymce-typeahead.js', 'src/tinymce-typeahead-factory.js']
         }
       }
    },
    jshint:{
      files:['src/**/*.js', 'test/**/*.js', 'demo/**/*.js'],
      options:{
        curly:true,
        eqeqeq:true,
        immed:true,
        latedef:true,
        newcap:true,
        noarg:true,
        sub:true,
        boss:true,
        eqnull:true,
        globals:{}
      }
    },
    // MINIFY CSS
    cssmin: {
      options: {
        keepSpecialComments: false,
        banner: '/** \n* @license <%= pkg.name %> - v<%= pkg.version %>\n' + 
             '* (c) 2013 Julien VALERY https://github.com/darul75/ng-tinymce-typeahead\n' +
             '* License: MIT \n**/\n'
      },
      compress: {
        files: {          
          'dist/ng-tinymce-typeahead.min.css': ['src/tinymce-typeahead-style.css']
        }
      }
    },
  });

};