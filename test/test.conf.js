

 module.exports = function(config) {
    config.set({
      basePath : '..',            
      frameworks: ['jasmine'],
      files: [        
        'bower_components/jquery/dist/jquery.js',
        'bower_components/angular/angular.js',
        'bower_components/angular-mocks/angular-mocks.js',
        'bower_components/tinymce/tinymce.min.js',
        'bower_components/angular-ui-tinymce/src/tinymce.js',
        'src/tinymce-typeahead-factory.js',
        'src/tinymce-typeahead-service.js',
        'src/tinymce-typeahead.js',
        'test/*.spec.js'
      ],
       // list of files to exclude
      exclude: [
        
      ],


      // test results reporter to use
      // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
      reporters: ['progress'],


      // web server port
      port: 9876,


      // enable / disable colors in the output (reporters and logs)
      colors: true,


      // level of logging
      // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
      logLevel: config.LOG_INFO,


      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,


      // Start these browsers, currently available:
      // - Chrome
      // - ChromeCanary
      // - Firefox
      // - Opera (has to be installed with `npm install karma-opera-launcher`)
      // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
      // - PhantomJS
      // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
      // browsers: ['Chrome', 'PhantomJS'],
      browsers: ['PhantomJS'],


      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,


      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: true
      });

  };
