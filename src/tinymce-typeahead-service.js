angular.module('ui.tinymce.typeahead.service', []).
 service('typeaheadService', ['$http', '$q', '$timeout', function(http, q, timeout) {
    var service = {};

    // mocks
    var set1 = [
            {type:'link', label:'Snoop abcdefghijklmnop', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}, 
            {type:'link', label:'Dr Dre qrstuvwxyz', url:'https://www.youtube.com/watch?v=_CL6n0FJZpk'}
          ];
    var set2 = [
            {type:'link', label:'Perfect circle abcdefghijklmnop', url:'https://www.youtube.com/watch?v=_cDdMZ2K9o0'}, 
            {type:'link', label:'Megadeth qrstuvwxyz', url:'https://www.youtube.com/watch?v=CjKI6KH-tmU'}
          ];
    var set3 = [
            {type:'image', label:'Snoop abcdefghijklmnop', url:'http://www.sorties-alsace.fr/wp-content/uploads/2013/04/snoop-dogg-concert-colmar.jpg'}, 
            {type:'image', label:'Dr Dre qrstuvwxyz', url:'http://www.metronews.fr/blog/olivier-cachin/files/2013/11/Dre-BW.jpg'}
          ];  
    var set4 = [
            {type:'image', label:'Perfect circle abcdefghijklmnop', url:'http://guitareclectique.files.wordpress.com/2008/03/03_11_0503_11_a-perfect-circle-5.jpg'}, 
            {type:'image', label:'Megadeth qrstuvwxyz', url:'http://fanart.tv/fanart/music/a9044915-8be3-4c7e-b11f-9e2d2ea0a91e/artistbackground/megadeth-51b1c7105fb22.jpg'}
          ];          

    service.FetchLinks = function(menu, text) {

      var deferred = q.defer();
      var links;

      switch (menu.id) {
        case '1-1-1':
          links = set1;
        break;
        case '1-1-2':
          links = set2;
        break;
      }      

      timeout(function(){
        deferred.resolve(links);
      },300);

      return deferred.promise;

    };

    service.FetchImageLinks = function(menu, text) {

       var deferred = q.defer();
      var links;

      switch (menu.id) {
        case '1-2-1':
          links = set3;
        break;
        case '1-2-2':
          links = set4;
        break;
      }      

      timeout(function(){
        deferred.resolve(links);
      },300);

      return deferred.promise;

    };

    return service;
    
 }]);