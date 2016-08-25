'use strict';
const clear = require('clear');
const inquirer = require('inquirer');

const Room = require('./Room');
const Player = require('./Player');
const Item = require('./Item');
const Enemy = require('./Enemy');
const EntityManager = require('./EntityManager');

const Drawer = require('./items/Drawer');


class Game {
  constructor () {
    this.setupRooms();
    this.setupPlayer();
    this.entityManager = new EntityManager();
    this.setupEnemy();
  }

  setupRooms () {
    this.foyer = new Room(this, 'Foyer', 'file:descriptions/foyer.md');

    this.livingRoom = new Room(this, 'Living room', 'file:descriptions/livingRoom.md');

    this.hallway = new Room(this, 'Hallway', 'file:descriptions/hallway.md');

    this.hallwayDoorRight = new Room(this, 'First room on the right', 'file:descriptions/hallwayDoorRight.md');

    this.hallwayDoorLeft = new Room(this, 'Second to last door on the left', 'file:descriptions/hallwayDoorLeft.md');

    this.upstairs = new Room(this, 'Upstairs study', 'file:descriptions/upstairsStudy.md');

    this.basement = new Room(this, 'Basement tunnel', 'file:descriptions/basement.md')

    this.cell1 = new Room(this, 'First cell on the left', 'file:descriptions/cell1.md');
    // this.cell2 = new Room(this, 'This is the second cell on the left', 'Unnerved by the cell before this one you quickly force the door open, weapon extended inside you find merely another guresome scene, a chained skeleton the ones so ancient they are little more than dust. But that is all that occupies this room, you should probably {DIRECTION:LEAVE}. ')

    this.cell3 = new Room(this, ' Cell on the right', 'file:descriptions/cell3.md')

    this.altarChamber = new Room(this, 'Altar chamber', 'file:descriptions/altarChamber.md');
    // Foyer connection points
    this.foyer.connect('WEST', this.livingRoom);
    this.foyer.connect('EAST', this.hallway);
    this.foyer.connect('NORTH', this.upstairs);
    // this.Livingroom connection point
    this.livingRoom.connect('NORTH', this.basement);
    this.startingRoom = this.foyer;
   // Basment connect point
    this.basement.connect('WEST', this.cell1);
    this.basement.connect('EAST', this.cell3);
    this.basement.connect('NORTH', this.altarChamber);
    // hallway connection points
    this.hallway.connect('EAST', this.hallwayDoorRight);
    this.hallway.connect('WEST', this.hallwayDoorLeft);
    this.hallway.connect('SOUTH', this.foyer);
    // Foyer Inventory
    var cupboard = new Item('Cupboard', 'A cobweb coated oak cupboard. Maybe there is something inside?', 9, 25, 6);
    cupboard.accuracy = 0.3;
    cupboard.addInventory();
    cupboard.inventory.addItem(new Item('Dagger', 'An old dagger, good for stabbing things.', 5, 3, 25));
    cupboard.on('consumeUse', remainingUses => {
      if (Math.random() < 0.5) {
        return;
      }

      console.log('A drawer is ejected from the cupboard!');
      const drawer = new Drawer();
      const room = cupboard.getCurrentRoom();
      room.addItem(drawer);
    });

    this.foyer.addItem(new Item('Coatrack', 'A dusty old coat rack made of wood and brass. Has some heft to it.', 5, 15, 5));
    this.foyer.addItem(cupboard);
  // Living room inventory
    var chest = new Item('Chest', 'A faded old chest with a leather closing strap.', 5, 15, 7);
    chest.addInventory();
    chest.inventory.addItem(new Item('Matches', 'An old box of matches.', 1, 1, 1));
    this.livingRoom.addItem(new Item('Painting', 'An immaculate portrait of the prior owner of the manor. The painting has eyes that just seem to follow you, creepy..', 2, 10, 1));
    // Basement inventory
    this.basement.addItem(new Item('Lantern', 'An ancient brass lantern', 3, 5, 1));
    // Cell 3 Inventory
    this.cell3.addItem(new Item('Silver Key', 'A key once polished silver, now it is just old and tarnished.', 1, 1, 1));
    // Alatar Chamber inventory
    this.altarChamber.addItem(new Item('Golden Key', 'A key forged of the purest gold. It was dropped by the demon. I wonder what it goes to?', 1, 1, 1));
    // Hallway door right Inventory
    this.hallwayDoorRight.addItem(new Item('Note', 'A cryptic note about the ongoigns of this manor.', 0, 0, 1));
    // Study Inventory
    this.upstairs.addItem(new Item('Sword', 'A victorian era sword with a hilt dawning incrested rubies, the edge still looks as sharp as the day it was first forged.', 15, 5, 25));
    this.upstairs.addItem(new Item('Letter', 'A letter written so long ago you  cannnot even make out the adressed year from how faded the ink is on the page. Though it gives you a good idea as to just how long ago it has been since someone lived here or even explored.', 0, 0, 1));
  }

  setupEnemy () {
    this.enemy = new Enemy(this.currentRoom)
    var gollum = new Enemy('{ENEMY:Gollum}', '{ENEMY:A small hunched over creature, it has bulbous eyes and rotted teeth combined with the thousand yard stare, this little thing is creepy.}', this.cell3);
    gollum.inventory.addItem(new Item('SILVER KEY', 'A key once polished silver, now it is just old and tarnished.', 1, 1, 1));
    this.entityManager.addEntity(gollum);

    var boss = new Enemy('{ENEMY:Demon}', '{ENEMY:A hulking tower of crimson flesh and bone stands before you, it seems to come to life from the shadows as moments before there was nothing there at all, it has eyes that burn deep into your soul, send chills down your spine. It permeates the perverted power of this forsaken manor, it is the emobdiment of pure evil.}', this.altarChamber);
    boss.inventory.addItem(new Item('GOLDEN KEY', 'A key forged of the purest gold. It was dropped by the demon. I wonder what it goes to?', 1, 1, 1));
    this.entityManager.addEntity(boss);

    var wraith = new Enemy('{ENEMY:Wraith}', '{ENEMY:A ghastly aparition seemingly produced of shadows, a thing of  the sight of it sends chills down your spine.}', this.foyer)
    wraith.inventory.addItem(new Item('DUSTY KEY'))
    this.entityManager.addEntity(wraith);
  }


  setupPlayer () {
    this.player = new Player('player', this.startingRoom);
  }

  start () {
    this.gameLoop();
  }

  gameLoop () {
    var choices = [];
    this.player.currentRoom.addChoices(choices);

    // Interact with inventory
    choices.push({
      name: 'Check Inventory',
      value: {
        action: 'CHECK INVENTORY'
      }
    })
    // Exit
    choices.push({
      name: 'Quit Game',
      value: {
        action: 'QUIT'
      }
    });

    // Current room description
    // clear()
    console.log('\n\n ');
    clear();
    this.player.currentRoom.printDescription(this.player);

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

      if (answers.userChoice.action === 'MOVE') {
        this.player.move(answers.userChoice.direction);
        return 750;
      } else if (answers.userChoice.action === 'EXAMINE') {
        return this.player.currentRoom.doExamine(this.player).then(() => {
          return 500;
        });
      } else if (answers.userChoice.action === 'CHECK INVENTORY') {
        return this.player.inventory.doExamine(this.player).then(() => {
          return 500;
        });
      } else if (answers.userChoice.action === 'FIGHT') {
        return this.player.currentRoom.doFight(this.player).then(() => {
          return 1000;
        });
      } else if (answers.userChoice.action === 'QUIT') {
        process.exit();
      } else {
        console.log('unhandled action', answers.userChoice.action);
      }
    }).catch(err => {
      console.error(err);
      process.exit(1);
    }).then((waitTime) => {
      // Do another game step
      setTimeout(() => {
        this.gameLoop();
      }, waitTime);
    });
  }
}


module.exports = Game;
