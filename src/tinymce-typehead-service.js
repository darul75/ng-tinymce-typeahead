angular.module('ui.tinymce.typehead.service', []).
 service('typeheadService', ['$http', '$q', '$timeout', function(http, q, timeout) {
    var service = {};

    service.FetchLinks = function(menu, text) {

      var deferred = q.defer();
      var links;

      switch (menu.id) {
        case '1-1-1':
          links = [
            {label:'Snoop', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}, 
            {label:'Dr Dre', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}
          ];
        break;
        case '1-2-1':
          links = [
            {label:'Perfect circle', url:'https://www.youtube.com/watch?v=_cDdMZ2K9o0'}, 
            {label:'Megadeth', url:'https://www.youtube.com/watch?v=CjKI6KH-tmU'}
          ];
        break;
      }      

      timeout(function(){
        deferred.resolve(links);
      },1000);

      return deferred.promise;

    };

    service.FetchImageLinks = function(menu, text) {

       var deferred = q.defer();
      var links;

      switch (menu.id) {
        case '1-1-2':
          links = [
            {label:'Snoop', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}, 
            {label:'Dr Dre', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}
          ];
        break;
        case '1-2-2':
          links = [
            {label:'Perfect circle', url:'https://www.youtube.com/watch?v=_cDdMZ2K9o0'}, 
            {label:'Megadeth', url:'https://www.youtube.com/watch?v=CjKI6KH-tmU'}
          ];
        break;
      }      

      timeout(function(){
        deferred.resolve(links);
      },1000);

      return deferred.promise;

    };

    return service;
    
 }]);