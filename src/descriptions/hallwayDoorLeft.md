'Second to last door on the left', 'This room appears much in the same fashion as the last one however though as you enter you find a bigger chill than before running down your spine as you  realsie the room is torn to bits furniture strewn about the room everywhere and on the wall a crimson handprint, you can only hope that is paint... Everything about this room sceams at you to run back out the exit!

``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(hallwayDoorLeftDesc));
```