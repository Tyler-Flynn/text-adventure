'First room on the right', 'You walk with caution towards the first open door, your hair slowly pushing the door open. The room appears to have once been the living quarters of one of the servants of the manor the skeleton on the bed is a good indicator of this as it wears a moth eaten uniform of a buttler. The room is in fair order in the corner of the room is a desk upoon which a {ITEM:note} lies. Now to the  of you is the door you entered through which leads back out into the hallway in whcih you came from.

``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(hallwayDoorRightDesc));
```