'Upstairs study', 'As you walk up the stairs the floorboards creak beneath your weight but alas ytou make it to the top. Before you lies a massive set of Mahagony doors. You reach a hand out and open them slowly as you do so a movie like setting comes to life before you, a fireplace is situated along the far wall opposite of you. On a plaque above the fireplace is an anciet looking {ITEM:sword} an antique as it would seem. On the writing desk not too far to the left of the fireplace is a {ITEM:desk}  crafted of the same wood as the great doors that closed this room of fromt the rest of the manor. The exit is now to the south of you and as you explore the study you begion to hear sounds coming form down below the Staircase.'

``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(upstairsStudyDesc));
```