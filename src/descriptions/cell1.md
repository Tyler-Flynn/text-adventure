'First cell on the left', 'You approach the first cell on the left side of the tunnnel you carefully reach your hand out to the cold iron door of the small room and push it open stepping inside you find yourself is a room of some form of alcehmy you could asusme so many unsepakable and unkown things all in glass jars from collected plants to the organs of animals. You can only asusme what horrible things must go on down here and the errie lighting your lantern gives it does not help.'
'
``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(cell1Desc));
```