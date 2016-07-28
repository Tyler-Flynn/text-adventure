'Altar chamber', 'You approach the massive iron doors at the end of the hall, as you come to a stop before it the torches on either side of the anciet door ignite casting shadows across the walls and floors around you. You put the key into the lock forcing it to twist, the dust in locks causing a grind as the decades now unopened chamber is finally unsealed. You pull the door open taking a step inside, your eyes take in the sights, the room is seeming a place out of time as everything seems as new as the day is was likely brought there. A large altar lays in the middle of the room, around it is a group of skeletal remains as garbed in the same crimson robes. Another skeleton lays upon the altar top and as you approach it the shadows behind the altar seem to grow seemingly into the physical form. In moments a towering grotesque figure is before you, red skin horns and more greet you. This is it, the spirit that has come over this manor, before you can consider running back through the exit the door slams shut the anicent locking grinding into its sealed position. You are trapped inside, there is only one chance now to escape, you must slay the demon!'






``` js
var marked = require('marked');
var TerminalRenderer = require('marked-terminal');

marked.setOptions({
  // Define custom renderer
  renderer: new TerminalRenderer()
});

// Show the parsed data
console.log(marked(altarChamberDesc));
```