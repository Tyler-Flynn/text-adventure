const inquirer = require('inquirer');
const Room = require('./Room');
const Player = require('./Player');


class Game {
  constructor () {
    this.setupRooms();
    this.setupPlayer();
  }

  setupRooms () {
    var foyer = new Room(
      'Foyer',
      'You find yourself in the foyer of an old manor, the interior is covered in cobwebs and dust, the building seems to have been abandonded years ago. In the foyer there is a {ITEM:COATRACK} and a {ITEM:CUPBOARD} as well as two connecting doors, one to the {DIRECTION:WEST} and one to the {DIRECTION:EAST} as well as a Staircase that leads upstairs to the {DIRECTION:NORTH}'
    );

    var livingRoom = new Room('Living room', 'A dusty and old yet lavish livig space seemingly untouched for decades sets before you. There is furniture dotted about, a couch a PAINTING above the fireplace, as well as a small CHEST beside the fireplace. There also a door on the NORTH wall which you can feel a draft coming from');
    var hallway = new Room('Hallway', 'As you walk through the eastern doorway of the fower you find yourself in a long dimly lit hallway stands before you, very little light shines in from the outside through the windows and the only viable source is the candles that sit upon window seals, it is unnerving though as the candles seem to have only been lit recently. You are not alone it seems. Down the  hallway of many sealed doors only two are cracked open, the first door on the RIGHT and the second to last door on the LEFT ');
    var hallwayDoorRight = new Room('First room on the right', 'You walk with caution towards the first open door, your hair slowly pushing the door open. The room appears to have once been the living quarters of one of the servants of the manor the skeleton on the bed is a good indicator of this as it wears a moth eaten uniform of a buttler. The room is in fair order in the corner of the room is a desk upoon which a NOTE lies. Now to the  of you is the door you entered through which leads back out into the hallway in whcih you came from.');
    var hallwayDoorLeft = new Room('Second to last door on the left, This room appears much in the same fashion as the last one however though as you enter you find a bigger chill than before running down your spine as you  realsie the room is torn to bits furniture strewn about the room everywhere and on the wall a crimson handprint, you can only hope that is paint... Everything about this ROOM sceams at you to run back out the exit which is now to the EAST of you.')
    var upstairs = new Room('Upstairs study', 'As you walk up the stairs the floorboards creak beneath your weight but alas ytou make it to the top. Before you lies a massive set of Mahagony doors. You reach a hand out and open them slowly as you do so a movie like settingt comes to life before you, a FIREPLACE sits along the far north wall. On a plaque above the FIREPLACE is an anciet looking sword an antique as it would seem. On the writing desk not too far to the left of the FIREPLACE is a DESK  crafted of the same wood as the great doors that closed this room of fromt the rest of the manor. The exit is now to the south of you and as you explore the study you begion to hear sounds coming form down below the Staircase.')
    var basement = new Room('Basement tunnel', 'As you walk through the kitchen key in hand you insert the key into the lock with a stiff turn, it creaks open. You slowly walk down the stairs clutchingt your weapon tight as you venture down into the unlit tunnel below. You find an old UNLIT LANTERN at the foot of the stairs and down the hall are three open doors, two on the left and one on the right, they are only three of many doors in the udnerground hall but they are the only three you can get into.')
    var cell1 = new Room('First cell on the left', 'You approach the first cell on the left hand side of the tunnnel ytou carefully reach your hand out to the cold iron door of the small room and push it open stepping inside you find yourself is a room of some form of alcehmy you coudl asusme so many unsepakable and unkown things all in glass jars from collected plants to the organs of animals. You can only asusme what horrible things must go on down here and the errie lighting your lantern gives it does not help. Should you consider the idea of leaving the exit is merely BEHIND you. ')
    var cell2 = new Room('This is the second cell on the left', 'Unnerved by the cell before this one you quickly force the door open, weapon extended inside you find merely another guresome scene, a chained skeleton the ones so ancient they are little more than dust. But that is all that occupies this room, you should probably LEAVE. ')
    var cell3 = new Room(' Cell on the right', '')
    foyer.connect('WEST', livingRoom);

    this.startingRoom = foyer;
  }

  setupPlayer () {
    this.player = new Player(this.startingRoom);
  }

  start () {
    this.gameLoop();
  }

  gameLoop () {
    var choices = [
      {
        name: 'Examine',
        value: {
          action: 'EXAMINE'
        }
      },
      {
        name: 'Leave',
        value: {
          action: 'LEAVE'
        }
      },
      // Movement
      {
        name: 'Go North',
        value: {
          action: 'MOVE',
          direction: 'NORTH'
        }
      },
      {
        name: 'Go East',
        value: {
          action: 'MOVE',
          direction: 'EAST'
        }
      },
      {
        name: 'Go South',
        value: {
          action: 'MOVE',
          direction: 'SOUTH'
        }
      },
      {
        name: 'Go West',
        value: {
          action: 'MOVE',
          direction: 'WEST'
        }
      }
    ];

    // Current room description
    console.log('\n\n');
    this.player.currentRoom.printDescription();

    console.log('');
    inquirer.prompt([{
      type: 'list',
      name: 'userChoice',
      message: 'What do you want to do?',
      choices: choices
    }]).then((answers) => {
      // console.log(answers);
      console.log('');
      // Run the game logic
      if (answers.userChoice.action === 'LEAVE') {
        process.exit();
      } else if (answers.userChoice.action === 'MOVE') {
        this.player.move(answers.userChoice.direction);
      } else {
        console.log('unhandled action', answers.userChoice.action);
      }

      // Do another game step
      setTimeout(() => {
        this.gameLoop();
      }, 10);
    });
  }
}


module.exports = Game;
