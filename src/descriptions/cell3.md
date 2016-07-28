'Cell on the right', 'As you approach the cell you notice something in the shadows o the right hand corner,something moving and as such you take ease opening the metal cage door, the cell floor is damp and inside and you take a cautious step, at the sound of your foot padding the floor the small, pallor, and hunched {ENEMY:creature} snaps around, a certain manical glint in its eyes as it stares back at you...
'
``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(cell3Desc));
```