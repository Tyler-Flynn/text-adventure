// TODO: Start the game
let Game = require('./src/Game')
let game = new Game();
game.start();


// var fs = require('fs-extra');
// var foyerDesc = fs.readFileSync('src/descriptions/foyer.md', 'utf8');
// console.log(foyerDesc);


// var marked = require('marked');
// var TerminalRenderer = require('marked-terminal');

// marked.setOptions({
//   // Define custom renderer
//   renderer: new TerminalRenderer()
// });

// // Show the parsed data
// console.log(marked(foyerDesc));
