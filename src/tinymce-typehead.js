
angular.module('ui.tinymce.typehead', ['siyfion.sfTypeahead', 'ui.tinymce.typeahead.service', 'ui.tinymce.typehead.factory'])
  .value('uiTinymceTypeheadConfig', {})
  .directive('uiTinymceLinkerMenu', ['$timeout', 'typeaheadService', 'typeaheadFactory', function(timeout, service, factory) {

    return {
      template: '<div ng-show="showMenu">' +                  
                  '<ul class="dropdown-menu" style="display:block;position:absolute;z-index: 1070;top:{{top}}px;left:{{left}}px;width:300px">' +
                    '<li class="dropdown-header" ng-if="ariane && ariane.length > 0"><button class="btn btn-default btn-xs" ng-repeat="menu in ariane" href="#" ng-click="clickMenu(menu)">{{menu.label}}</button></li>' +
                    '<li ng-repeat="menu in menus"><a href="#" ng-click="clickMenu(menu)">' +
                      '<span ng-if="menu.icon" class="glyphicon {{menu.icon}}"></span> {{menu.label}}</a>' +                      
                    '</li>' +                  
                  '</ul>' +                                  
                  '<div ng-if="resultsDataset" style="display:block;position:absolute;z-index: 1070;top:{{top}}px;left:{{left}}px;width:350px" class="well btn-group-vertical">' + 
                    '<div class="dropdown-header text-center"><span class="label label-primary" ng-repeat="menu in ariane">{{menu.label}}</span></div>' +
                    '<div class="input-group">' +
                      '<input type="text" placeholder="Search..." class="form-control" sf-typeahead options="exampleOptions" datasets="resultsDataset" ng-model="selectedLink.result" style="width:270px">' +
                      '<span class="input-group-btn">' +
                        '<button type="button" class="btn btn-success" ng-click="select()"><span class="glyphicon glyphicon-plus"></span></button>' +
                        // '<button type="button" class="btn btn-success" ng-click="selectAdvanced()"><span class="glyphicon glyphicon-plus"></span>(options)</button>' + TODO
                      '</span>' +  
                      
                    '</div>' +
                  '</div>'+
                '<div>',  
      scope: {
        menus: '='
      },
      link: function (scope, elm, attrs) {   

        var isDefined = angular.isDefined;     

        if (!isDefined(attrs.menus))
          return;        

        scope.selectedLink = {result: ''};

        // Typeahead options object
        scope.exampleOptions = {
          highlight: true
        };

        scope.originalMenu = angular.copy(scope.menus);  
        scope.ariane = [];      

        scope.clickMenu = function(menu) {          

          if (scope.ariane.indexOf(menu) < 0)
            scope.ariane.push(menu);
          
          if (menu.children) {
              scope.showOptions = false;
              scope.showAutoComplete = false;
              scope.showMenu = true;
              scope.menus = menu.children;
              scope.activeMenuItem = undefined;
              scope.showAutoComplete = false;                      
          }
          else {            
            scope.activeMenuItem = menu;
            scope.label = menu.label;
            scope.showOptions = false;
            scope.showMenu = false;
            scope.showAutoComplete = true;
            scope.fetch();
          }          
        };

        scope.fetch = function() {

          if (scope.activeMenuItem.type === 'link') { 
            service.FetchLinks(scope.activeMenuItem, 'test').then(function(data) {              
              scope.resultsDataset = factory.GetResultDatasets(data);              
              scope.showMenu = true;            
            });

          }
          else if (scope.activeMenuItem.type === 'image') {

            service.FetchImageLinks(scope.activeMenuItem, 'test').then(function(data) {
              scope.resultsDataset = factory.GetResultDatasets(data);              
              scope.showMenu = true;              
            });

          }

        };

        scope.select = function(advanced) {                  
          var ed = tinymce.activeEditor; 
          var dom = ed.dom; 
          var html = ed.selection.getContent();

          var url = scope.selectedLink.result.url;
          var label = scope.selectedLink.result.label;          
           
          switch(scope.selectedLink.result.type) {
            // LINKS 
            case 'link':
              var noSelectionLinkAttrs = { target: '_blank', title: label, href: url };

              if (html)
                tinymce.execCommand('mceInsertLink', false, url);
              else 
                ed.insertContent(dom.createHTML('a', noSelectionLinkAttrs, dom.encode(noSelectionLinkAttrs.title)));

            break;
            // IMAGE 
            case 'image':
              var noSelectionLinkAttrs = { target: '_blank', title: label, href: url };
              
              // http://stackoverflow.com/questions/5192134/how-to-insert-an-image-at-cursor-position-in-tinymce
              
              var range = ed.selection.getRng();                  // get range
              var newNode = ed.getDoc().createElement ( "img" );  // create img node
              newNode.src=url;                                    // add src attribute
              range.insertNode(newNode);

            break;


          }

          timeout(function() {
            ed.fire('SetContent');
          }, 3000);
              
          scope.showMenu = false;   
          scope.ariane = [];   
          scope.selectedLink = {result: ''};
          scope.menus = scope.originalMenu;  

        };

        scope.selectAdvanced = function() { 
          var url = scope.selectedLink.result.url;
          var label = scope.selectedLink.result.label;

          switch(scope.selectedLink.result.type) {
            // LINKS 
            case 'link':         
              var links = [{value:'_blank', link: url, title: label}];
                scope.showMenu = false;
                var tutu = tinymce.activeEditor.plugins.link.showDialog(links);                
            break;
            // IMAGE : TODO
            case 'image':         
              var noSelectionLinkAttrs = { target: '_blank', title: label, href: url };
              
              // http://stackoverflow.com/questions/5192134/how-to-insert-an-image-at-cursor-position-in-tinymce
              
              var range = ed.selection.getRng();                  // get range
              var newNode = ed.getDoc().createElement ( "img" );  // create img node
              newNode.src=url;                                    // add src attribute
              range.insertNode(newNode);
            break;
          }

          scope.showMenu = false;   
          scope.ariane = [];   
          scope.selectedLink = {result: ''};
          scope.menus = scope.originalMenu;

        };

        scope.initListeners = function() {
          // popup position
          scope.left = 0;
          scope.top= 0;

          // keys
          var ctrlDown = false;
          var ctrlKey = 17; // windows
          var cmdKey = 91; // mac
          var spaceKey = 32; // space
          // Select each item the user clicks on

          tinymce.on('AddEditor', function(e) {

            e.editor.on('click', function(e) {
              timeout(function() {
                scope.showMenu = false; 
                scope.ariane = [];
              });
            });

            e.editor.on('keydown', function(e) {                           

              // TODO: check wether still works on windows  
              if (e.keyCode === ctrlKey || e.ctrlKey || e.metaKey) 
                ctrlDown = true;

              //   if (ctrlDown && e.keyCode === spaceKey)
              //     e.preventDefault();

              // });

              // e.editor.on('keyup', function(e) {              

              if (ctrlDown && e.keyCode == spaceKey) {
                ctrlDown = false;                  

                var ed = tinyMCE.activeEditor;
                var container = $(ed.getContainer());
                var selection = ed.selection;

                var tinymcePosition = container.position();
                var toolbarPosition = container.find(".mce-toolbar").first();

                var nodePosition = $(selection.getNode()).position();
                var textareaTop = 0;
                var textareaLeft = 0;

                if (ed.selection.getRng().getClientRects().length > 0) {
                    textareaTop = selection.getRng().getClientRects()[0].top + selection.getRng().getClientRects()[0].height;
                    textareaLeft = selection.getRng().getClientRects()[0].left;
                } else {
                    textareaTop = parseInt($(this.selection.getNode()).css("font-size")) * 1.3 + nodePosition.top;
                    textareaLeft = nodePosition.left;
                }

                var position = container.offset();
                var caretPosition = {
                    top:  tinymcePosition.top + toolbarPosition.innerHeight() + textareaTop,
                    left: tinymcePosition.left + textareaLeft + position.left
                };                  
                
                // small offset
                scope.left = caretPosition.left+10;
                scope.top = caretPosition.top+5;

                scope.showMenu = true;
                scope.resultsDataset = null;                                    
                  
                }
            });

            e.editor.on('mousedown', function(e) {              

                scope.showMenu = false;
                scope.menus = originalMenu;              

            });

          });       

        };

        scope.initListeners();
        
      }
    };
  }]);
