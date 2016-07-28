You find yourself in the foyer of an old manor, the interior is covered in cobwebs and dust, the building seems to have been abandonded years ago.

In the foyer there is a {ITEM:coatrack} and a {ITEM:cupboard} as well as two connecting doors, one to the left side and one to the right side as well as a Staircase that leads upstairs though it does not seem to be in the best shape anymore.

_Note: This is slanted._

| Name | Weight | Description |
|---|---|---|
| Sword | 10.5 | V sharp |

``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(foyerDesc));

//module.exports = foyer
```
