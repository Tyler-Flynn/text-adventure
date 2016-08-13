const inquirer = require('inquirer'); // TODO FIX INVENTORY RETURN GLITCH
const Room = require('./Room');
const Player = require('./Player');
const Item = require('./Item');
const Enemy = require('./Enemy');
const EntityManager = require('./EntityManager');

class Game {
  constructor () {
    this.setupRooms();
    this.setupPlayer();
    this.entityManager = new EntityManager();
    this.setupEnemy();
  }

  setupRooms () {
    this.foyer = new Room(this, 
      'Foyer',
      'file:descriptions/foyer.md'
    );

    var livingRoom = new Room(this, 'Living room', 'A dusty and old yet lavish livig space seemingly untouched for decades sets before you. There is furniture dotted about, a couch a {ITEM:painting} above the fireplace, as well as a small {ITEM:chest} beside the fireplace. On the other side of the fireplace you see an old iron supported door, though there is no indication of as to where the door leads.');
    var hallway = new Room(this, 'Hallway', 'As you walk through the eastern doorway of the fower you find yourself in a long dimly lit hallway stands before you, very little light shines in from the outside through the windows and the only viable source is the candles that sit upon window seals, it is unnerving though as the candles seem to have only been lit recently. You are not alone it seems. Down the  hallway of many sealed doors only two are cracked open, the first door on the right and the second to last door on the left ');
    var hallwayDoorRight = new Room(this, 'First room on the right', 'You walk with caution towards the first open door, your hair slowly pushing the door open. The room appears to have once been the living quarters of one of the servants of the manor the skeleton on the bed is a good indicator of this as it wears a moth eaten uniform of a buttler. The room is in fair order in the corner of the room is a desk upoon which a {ITEM:note} lies. Now to the  of you is the door you entered through which leads back out into the hallway in whcih you came from.');
    var hallwayDoorLeft = new Room(this, 'Second to last door on the left', 'This room appears much in the same fashion as the last one however though as you enter you find a bigger chill than before running down your spine as you  realsie the room is torn to bits furniture strewn about the room everywhere and on the wall a crimson handprint, you can only hope that is paint... Everything about this room sceams at you to run back out the exit!');
    var upstairs = new Room(this, 'Upstairs study', 'As you walk up the stairs the floorboards creak beneath your weight but alas ytou make it to the top. Before you lies a massive set of Mahagony doors. You reach a hand out and open them slowly as you do so a movie like setting comes to life before you, a fireplace is situated along the far wall opposite of you. On a plaque above the fireplace is an anciet looking {ITEM:sword} an antique as it would seem. On the writing desk not too far to the left of the fireplace is a {ITEM:desk}  crafted of the same wood as the great doors that closed this room of fromt the rest of the manor. The exit is now to the south of you and as you explore the study you begion to hear sounds coming form down below the Staircase.');
    var basement = new Room(this, 'Basement tunnel', 'As you walk through the kitchen key in hand you insert the key into the lock with a stiff turn, it creaks open. You slowly walk down the stairs clutchingt your weapon tight as you venture down into the unlit tunnel below. You find an old unlit {ITEM:lantern} at the foot of the stairs and down the hall are three open doors, two on the left and one on the right, they are only three of many doors in the udnerground hall but they are the only three you can get into.')
    var cell1 = new Room(this, 'First cell on the left', 'You approach the first cell on the left side of the tunnnel you carefully reach your hand out to the cold iron door of the small room and push it open stepping inside you find yourself is a room of some form of alcehmy you could asusme so many unsepakable and unkown things all in glass jars from collected plants to the organs of animals. You can only asusme what horrible things must go on down here and the errie lighting your lantern gives it does not help.');
    // var cell2 = new Room(this, 'This is the second cell on the left', 'Unnerved by the cell before this one you quickly force the door open, weapon extended inside you find merely another guresome scene, a chained skeleton the ones so ancient they are little more than dust. But that is all that occupies this room, you should probably {DIRECTION:LEAVE}. ')
    var cell3 = new Room(this, ' Cell on the right', 'As you approach the cell you notice something in the shadows o the right hand corner,something moving and as such you take ease opening the metal cage door, the cell floor is damp and inside and you take a cautious step, at the sound of your foot padding the floor the small, pallor, and hunched {ENEMY:creature} snaps around, a certain manical glint in its eyes as it stares back at you...')
    var altarChamber = new Room(this, 'Altar chamber', 'You approach the massive iron doors at the end of the hall, as you come to a stop before it the torches on either side of the anciet door ignite casting shadows across the walls and floors around you. You put the key into the lock forcing it to twist, the dust in locks causing a grind as the decades now unopened chamber is finally unsealed. You pull the door open taking a step inside, your eyes take in the sights, the room is seeming a place out of time as everything seems as new as the day is was likely brought there. A large altar lays in the middle of the room, around it is a group of skeletal remains as garbed in the same crimson robes. Another skeleton lays upon the altar top and as you approach it the shadows behind the altar seem to grow seemingly into the physical form. In moments a towering grotesque figure is before you, red skin horns and more greet you. This is it, the spirit that has come over this manor, before you can consider running back through the exit the door slams shut the anicent locking grinding into its sealed position. You are trapped inside, there is only one chance now to escape, you must slay the demon!');
    // Foyer connection points
    this.foyer.connect('WEST', livingRoom);
    this.foyer.connect('EAST', hallway);
    this.foyer.connect('NORTH', upstairs);
    // Livingroom connection point
    livingRoom.connect('NORTH', basement);
    this.startingRoom = this.foyer;
   // Basment connect point
    basement.connect('WEST', cell1);
    basement.connect('EAST', cell3);
    basement.connect('NORTH', altarChamber);
    // hallway connection points
    hallway.connect('EAST', hallwayDoorRight);
    hallway.connect('WEST', hallwayDoorLeft);
    hallway.connect('SOUTH', this.foyer);
    // Foyer Inventory
    var cupboard = new Item('CUPBOARD', 'A cobweb coated oak cupboard. Maybe there is something inside?', 3, 20, 1);
    cupboard.addInventory()
    cupboard.inventory.addItem(new Item('DAGGER', 'An old dagger, good for stabbing things.', 5, 3, 25));
    this.foyer.addItem(new Item('COATRACK', 'A dusty old coat rack mdade of wood and brass. Has some heft to it.', 5, 25, 5));
    this.foyer.addItem(cupboard)
  // Living room inventory
    var chest = new Item('CHEST', 'A faded old chest with a leather closing strap.', 5, 15, 7)
    chest.addInventory()
    chest.inventory.addItem(new Item('MATCHES', 'An old box of matches.', 1, 1, 1))
    livingRoom.addItem(new Item('PAINTING', 'An immaculate portrait of the prior owner of the manor. The painting has eyes that just seem to follow you, creepy..', 2, 10, 1));
    // Basement inventory
    basement.addItem(new Item('LANTERN', 'An ancient brass lantern', 3, 5, 1));
    // Cell 3 Inventory
    cell3.addItem(new Item('SILVER KEY', 'A key once polished silver, now it is just old and tarnished.', 1, 1, 1));
    // Alatar Chamber inventory
    altarChamber.addItem(new Item('GOLDEN KEY', 'A key forged of the purest gold. It was dropped by the demon. I wonder what it goes to?', 1, 1, 1));
    // Hallway door right Inventory
    hallwayDoorRight.addItem(new Item('NOTE', 'A cryptic note about the ongoigns of this manor.', 0, 0, 1));
    // Study Inventory
    upstairs.addItem(new Item('SWORD', 'A victorian era sword with a hilt dawning incrested rubies, the edge still looks as sharp as the day it was first forged.', 15, 5, 25));
    upstairs.addItem(new Item('LETTER', 'A letter written so long ago you  cannnot even make out the adressed year from how faded the ink is on the page. Though it gives you a good idea as to just how long ago it has been since someone lived here or even explored.', 0, 0, 1));
  }

  setupEnemy () {
  //  this.enemy = new Enemy(this.currentRoom)
    var gollum = new Enemy('Gollum', 'A small hunched over creature, it has bulbous eyes and rotted teeth combined with the thousand yard stare, this little thing is creepy.', this.foyer);
    gollum.inventory.addItem(new Item('SILVER KEY', 'A key once polished silver, now it is just old and tarnished.', 1, 1, 1));

    this.entityManager.addEntity(gollum);
    var boss = new Enemy('Demon', 'A hulking tower of crimson flesh and bone stands before you, it seems to come to life from the shadows as moments before there was nothing there at all, it has eyes that burn deep into your soul, send chills down your spine. It permeate the perverted power of this forsaken manor, it is the emobdiment of pure evil.', this.altarChamber);
    boss.inventory.addItem(new Item('GOLDEN KEY', 'A key forged of the purest gold. It was dropped by the demon. I wonder what it goes to?', 1, 1, 1));
    this.entityManager.addEntity(boss);
    var wraith = new Enemy('Wraith', 'A ghastly aparition seemingly produced of shadows, the sight of it sends chills down your spine.', this.cell3)
    wraith.inventory.addItem(new Item('DUSTY KEY'))
    this.entityManager.addEntity(wraith);
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
        name: 'Quit Game',
        value: {
          action: 'QUIT'
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
      },
      {
        name: 'Check Inventory',
        value: {
          action: 'CHECK INVENTORY'
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
      if (answers.userChoice.action === 'QUIT') {
        process.exit();
      } else if (answers.userChoice.action === 'MOVE') {
        this.player.move(answers.userChoice.direction);
        return 750;
      } else if (answers.userChoice.action === 'EXAMINE') {
        return this.player.currentRoom.doExamine().then(() => {
          return 500;
        });
      } else if (answers.userChoice.action === 'CHECK INVENTORY') {
        return this.player.inventory.doExamine().then(() => {
          return 500;
        });
      } else {
        console.log('unhandled action', answers.userChoice.action);
      }
    }).then((waitTime) => {
      // Do another game step
      setTimeout(() => {
        this.gameLoop();
      }, waitTime);
    });
  }
}


module.exports = Game;
