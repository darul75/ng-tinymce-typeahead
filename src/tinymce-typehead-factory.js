angular.module('ui.tinymce.typehead.factory', []).factory('typeaheadFactory', [function() {

  var factory = {};

  factory.GetResultDatasets = function(data) {    
    // Instantiate the bloodhound suggestion engine
    var results = new Bloodhound({
      datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.label); },
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: []
    });
                
    results.local = data;

    // initialize the bloodhound suggestion engine
    results.initialize();

    return { displayKey: 'label', source: results.ttAdapter() };
  };

  factory.InitTinymce = function() {

  };

  return factory;
}]);