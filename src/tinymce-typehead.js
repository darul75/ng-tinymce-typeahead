
angular.module('ui.tinymce.typehead', ['siyfion.sfTypeahead', 'ui.tinymce.typehead.service'])
  .value('uiTinymceTypeheadConfig', {})
  .directive('uiTinymceLinkerMenu', ['$timeout', 'typeheadService', function(timeout, service) {

    return {
      template: '<div ng-show="showMenu">' +
                  '<ul class="dropdown-menu" style="display:block;position:absolute;z-index: 1070;top:{{top}}px;left:{{left}}px;">' +
                    '<li ng-repeat="menu in menus"><a href="#" ng-click="clickMenu(menu)">{{menu.label}}</a></li>' +                  
                  '</ul>' +                
                  '<div ng-if="resultsDataset" style="display:block;position:absolute;z-index: 1070;top:{{top}}px;left:{{left}}px;" class="well">' + 
                    '<input type="text" class="typeahead form-control input-sm" sf-typeahead options="exampleOptions" datasets="resultsDataset" ng-model="selectedLink.result">' +                            
                    '<button type="button" class="btn btn-success btn-xs" ng-click="select()">Add</button>' +
                    '<button type="button" class="btn btn-success btn-xs" ng-click="selectAdvanced()">Add (advanced)</button>' +
                  '</div>'+
                '<div>',                    
      link: function (scope, elm, attrs) {        

        scope.menus = [
          { id: '1', label:'Music', children: [
              {id:'1-1', label:'Links', children: [
                { id: '1-1-1', label:'Rap', type: 'link' },
                { id: '1-1-2', label:'Rock', type: 'image' }
              ]},
              {id:'1-2', label:'Images', children: [
                { id: '1-2-1', label:'Rap', type: 'link' },
                { id: '1-2-2', label:'Rock', type: 'image' }
              ]}
            ]}          
        ];            

        scope.selectedLink = {result: ''};

        var originalMenu = angular.copy(scope.menus);


        // Instantiate the bloodhound suggestion engine
        scope.results = new Bloodhound({
          datumTokenizer: function(d) { return Bloodhound.tokenizers.whitespace(d.label); },
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          local: []
        });

        scope.clickMenu = function(menu) {
          
          if (menu.children) {
              scope.showOptions = false;
              scope.showAutoComplete = false;
              scope.showMenu = true;
              scope.menus = menu.children;
              scope.activeMenuItem = undefined;
          }
          else {
            scope.activeMenuItem = menu;
            scope.showOptions = false;
            scope.showMenu = false;
            scope.showAutoComplete = true;
            scope.fetch();
          }          
        };

        scope.fetch = function() {

          if (scope.activeMenuItem.type === 'link') { 
            service.FetchLinks(scope.activeMenuItem, 'test').then(function(data) {
                          
              scope.results.local = data;

              // initialize the bloodhound suggestion engine
              scope.results.initialize();

              // Typeahead options object
              scope.exampleOptions = {
                highlight: true
              };

              scope.resultsDataset = {

                displayKey: 'label',
                source: scope.results.ttAdapter()  

              };

              scope.showMenu = true;
              
            });

          }
          else if (scope.activeMenuItem.type === 'image') {

            service.FetchImageLinks(scope.activeMenuItem, 'test').then(function(data) {
                          
              scope.results.local = data;

              // initialize the bloodhound suggestion engine
              scope.results.initialize();

              // Typeahead options object
              scope.exampleOptions = {
                highlight: true
              };

              scope.resultsDataset = {

                displayKey: 'label',
                source: scope.results.ttAdapter()  

              };

              scope.showMenu = true;
              
            });

          }

        };

        scope.select = function() {                    

         var noSelectionLinkAttrs = { target: '_blank', title: scope.selectedLink.result.label, href: scope.selectedLink.result.url };
          
         var dom = tinymce.activeEditor.dom; 
         var html = tinymce.activeEditor.selection.getContent();

         if (html)
          tinymce.execCommand('mceInsertLink', false, scope.selectedLink.result.url);
         else 
          tinymce.activeEditor.insertContent(dom.createHTML('a', noSelectionLinkAttrs, dom.encode(noSelectionLinkAttrs.title)));

          scope.showMenu = false;

        };

        scope.selectAdvanced = function() {          
          var links = [{value:'_blank', link: 'http://www.google.fr', title:'test'}];
            scope.showMenu = false;
            var tutu = tinymce.activeEditor.plugins.link.showDialog(links);
          tinymce.execCommand('mceInsertLink', false, scope.selectedLink.result.url);
        };


        // mouse
        scope.left = 0;
        scope.top= 0;

        var ctrlDown = false;
        var ctrlKey = 17;
        var spaceKey = 32; // space
        // Select each item the user clicks on

        tinymce.on('AddEditor', function(e) {

          e.editor.on('click', function(e) {
            timeout(function() {
              scope.showMenu = false; 
            });                
          });

          e.editor.on('keydown', function(e) {
              if (e.keyCode == ctrlKey) 
                ctrlDown = true;                

              if (ctrlDown && e.keyCode == spaceKey)
                e.preventDefault();
          });

          e.editor.on('keyup', function(e) {

              if (ctrlDown && e.keyCode == spaceKey) {
                ctrlDown = false;                  

                var editor = tinyMCE.activeEditor;

                var tinymcePosition = $(editor.getContainer()).position();
                var toolbarPosition = $(editor.getContainer()).find(".mce-toolbar").first();

                var nodePosition = $(editor.selection.getNode()).position();
                var textareaTop = 0;
                var textareaLeft = 0;

                if (editor.selection.getRng().getClientRects().length > 0) {
                    textareaTop = editor.selection.getRng().getClientRects()[0].top + editor.selection.getRng().getClientRects()[0].height;
                    textareaLeft = editor.selection.getRng().getClientRects()[0].left;
                } else {
                    textareaTop = parseInt($($this.selection.getNode()).css("font-size")) * 1.3 + nodePosition.top;
                    textareaLeft = nodePosition.left;
                }

                var position = $(editor.getContainer()).offset();
                var caretPosition = {
                    top:  tinymcePosition.top + toolbarPosition.innerHeight() + textareaTop,
                    left: tinymcePosition.left + textareaLeft + position.left
                };                  
                

                scope.left = caretPosition.left;
                scope.top = caretPosition.top;

                scope.showMenu = true;
                scope.resultsDataset = null;                                    
                
              }
          });

          e.editor.on('mousedown', function(e) {              

              scope.showMenu = false;
              scope.menus = originalMenu;              

          });       

        });       

      }
    };
  }]);
