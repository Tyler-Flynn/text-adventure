'Basement tunnel', 'As you walk through the kitchen key in hand you insert the key into the lock with a stiff turn, it creaks open. You slowly walk down the stairs clutchingt your weapon tight as you venture down into the unlit tunnel below. You find an old unlit {ITEM:lantern} at the foot of the stairs and down the hall are three open doors, two on the left and one on the right, they are only three of many doors in the udnerground hall but they are the only three you can get into.'

``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(basementDesc));
```