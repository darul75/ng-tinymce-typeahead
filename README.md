ng-tinymce-typeahead [![NPM version](https://badge.fury.io/js/ng-tinymce-typeahead.png)](http://badge.fury.io/js/ng-tinymce-typeahead) [![Build Status](https://travis-ci.org/darul75/ng-tinymce-typeahead.png?branch=master)](https://travis-ci.org/darul75/ng-tinymce-typeahead) [![Total views](https://sourcegraph.com/api/repos/github.com/darul75/ng-tinymce-typeahead/counters/views.png)](https://sourcegraph.com/github.com/darul75/ng-tinymce-typeahead)
=====================

Angular directive tinymce autocomplete menu for links or image quick insertion control.

Why
-------------

Insert a link or an image is not user very friendly with tinymce.

Idea is to provide a faster way for inserting images and links in editor.

All you need to do is create your own REST service and consume it with $http or $resource by instance. 

Check service example to see current format of results.

Then on your tinymce editor, just press Ctrl+Space or Cmd+Key (mac), and menu will be displayed.

*TINY MCE version 4 only.*
*BOOTSTRAP version 3 only.*

Sceenshot
-------------

![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce1.png "ng-tinymce-typeahead screenshot")
![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce2.png "ng-tinymce-typeahead screenshot")
![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce3.png "ng-tinymce-typeahead screenshot")
![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce4.png "ng-tinymce-typeahead screenshot")
![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce5.png "ng-tinymce-typeahead screenshot")
![ng-tinymce-typeahead demo](http://darul75.github.io/ng-slider/images/tinymce-end.png "ng-tinymce-typeahead screenshot")

Demo
-------------

http://darul75.github.io/ng-tinymce-typeahead/

How to use it
-------------

You should already have script required for Angular.

```html
<-- COMMON LIBS -->
<script type="text/javascript" src="angular.min.js"></script>
<script type="text/javascript" src="bootstrap.js"></script>
<script type="text/javascript" src="tinymce.min.js"></script>
<script type="text/javascript" src="typeahead.js/dist/bloodhound.min.js"></script>
<script type="text/javascript" src="typeahead.js/dist/typeahead.bundle.js"></script>

<-- ANGULAR LIBS PLUGINS -->
<script type="text/javascript" src="angular-ui-tinymce/src/tinymce.js"></script>
<script type="text/javascript" src="angular-typeahead/angular-typeahead.js"></script>
```

to the list above, you should add:

```html
<link rel="stylesheet" type="text/css" href="dist/ng-tinymce-typeahead.min.css">

<script type="text/javascript" src="dist/ng-tinymce-typeahead.min.js"></script>
```

Then, inject `ui.tinymce` and `ui.tinymce.typehead` in your application module:

```javascript
angular.module('myApp', ['ui.tinymce', 'ui.tinymce.typehead']);
```

and then under your tinymce directive add an `div` with `ui-tinymce-linker-menu` directive name attribute, `menu` scope variable attribute.
Note: link or image plugin have to be loaded, if not no issue, menu will just be hidden.

```html
<!-- COMMON usage for TINYMCE-->
<textarea id="tinymce"  
      ui-tinymce='{body_class: "mousetrap", plugins: ["link image"]}' 
      ng-model="tinymce" 
      hotkey="{esc: close, 'ctrl+left': mute}" 
      class="mousetrap"></textarea>
<!-- DIRECTIVE usage for this directive -->
<div ui-tinymce-linker-menu menu="menu" service="service"></div>
```

```javascript
myAppModule.controller('MainCtrl', function($scope) {
        
    $scope.menu = [
      { id: '1', label:'Music', icon:'glyphicon-music', children: [
          {id:'1-1', label:'Links', icon: 'glyphicon-link', children: [
            { id: '1-1-1', label:'Rap', type: 'link' },
            { id: '1-1-2', label:'Rock', type: 'link' }
          ]},
          {id:'1-2', label:'Images', icon: 'glyphicon-picture', children: [
            { id: '1-2-1', label:'Rap', type: 'image' },
            { id: '1-2-2', label:'Rock', type: 'image' }
          ]}
      ]},
      { id: '2', label:'Sport', icon:'glyphicon-tower', children: [
         .......
         ....
         ....
      ]}
      
      // THEN YOU NEED TO DEFINE OR USE YOUR OWN SERVICE FOR LINKS RESULT
      // HERE MY PROPOSITION, YOUR SERVICE WILL BE INJECTED AUTOMATICALY
      // SEE MY EXAMPLE : src/tinymce-typeahead-service.js
      $scope.service = {
          module:"ui.tinymce.typeahead.service", // your service module
          name:"typeaheadService", // your serice name
          methodLinks:"FetchLinks", // method name to fetch links
          methodImage:"FetchImageLinks" // method name to fetch image src links
      };
      
    ];
    
});
```

### Required options

* `menu`: json menu
* `service`: how to inject your service

Todo
-------------

- Improve key detection.
- Choose better menu model
- ...many things 

Inspiration
-------------

https://github.com/Siyfion/angular-typeahead
http://twitter.github.io/typeahead.js/
...

Installation
------------

Using npm:

```
npm install ng-tinymce-typeahead
```

### Build

You can run the tests by running

```
npm install
```
or
```
npm test
```

assuming you already have `grunt` installed, otherwise you also need to do:

```
npm install -g grunt-cli
```

## License

The MIT License (MIT)

Copyright (c) 2014 Julien Valéry

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.




