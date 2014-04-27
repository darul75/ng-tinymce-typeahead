

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
      singleRun : true,
      browsers = [ 'Chrome' ]
    });

  };
