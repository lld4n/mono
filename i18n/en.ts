import { InternationalizationType } from '../types/i18n';

const en: InternationalizationType = {
  root: {
    rules: 'Rules',
    google: 'Sign in with Google',
    join: 'Join Room',
    create: 'Create Room',
    open: 'Open Rooms',
    exit: 'Exit',
  },
  room: {
    title: 'Start Game',
    subtitle:
      'Invite more participants. To do this, copy the code above and send it to your friends',
    character: 'Choose a character to play as',
    toggle: 'Now room is',
    private: 'private',
    public: 'public',
  },
  input: 'Enter message',
  copy: 'Copied',
  joinRoom: {
    keyInput: 'Insert the unique room key',
  },
  connect: 'Join',
  cards: {
    titles: [
      'Start',
      'Full Moon',
      'Gift',
      'New Moon',
      'Tax 2000 ✦',
      'Upper Station',
      'Basketball',
      'Chance',
      'Soccer',
      'Tennis',
      'Prison',
      'Cookie',
      'Power Plant',
      'Lollipop',
      'Cake',
      'Right Station',
      'Burger',
      'Gift',
      'Hot Dog',
      'Pizza',
      'Free Parking',
      'Pear',
      'Chance',
      'Apple',
      'Watermelon',
      'Lower Station',
      'Whale',
      'Fish',
      'Water Station',
      'Dolphin',
      'Police',
      'Christmas Tree',
      'Tree',
      'Gift',
      'Cactus',
      'Left Station',
      'Chance',
      'Carrot',
      'Tax 1000 ✦',
      'Pepper',
    ],
    info: {
      START: 'Start card. Passing through it gives the player 2000 ✦',
      STREET:
        'Street card. The rent depends on the number of houses. You can only buy a house if you buy all the streets in the group. A hotel can only be bought if four houses have already been bought on a street. There can only be one hotel',
      BOX: 'Gift Card. Once on this box, the player is given a choice of 4 cards. Anything can fall out',
      TAX: 'Tax card. By hitting this box, the player must pay a tax',
      TRAIN:
        'Station card. The rent depends on the number of stations purchased',
      CHANCE:
        'Chance Card. Once on this box, the player is given a choice of 4 cards. Anything can fall out',
      RESOURCES:
        'A "resource" card. The rent depends on the number of "resource" cards purchased. When hitting a cell, the player must roll the dice and multiply the resulting value and then pay',
      PRISON:
        'Prison Card. There are two ways to get to the prison: 1. Rolling the double three times. 2. Get to the police cell. Getting out of jail can be accomplished in two ways: 1. Pay 500 ✦ 2. Try to knock out the take',
      PARKING: 'Free Parking Card. Hitting this box, nothing happens',
      POLICE: 'Police card. Hitting this cell sends the player to jail',
    },
    resources: {
      rent: ['One-card rent', 'Two-card rent'],
      prices: ['Pledge', 'Buy'],
    },
    street: {
      rent: [
        'Standart rent',
        'Rent with 1 house',
        'Rent with 2 houses',
        'Rent with 3 houses',
        'Rent with 4 houses',
        'Rent with hotel',
      ],
      prices: ['Build a house', 'Build a hotel', 'Mortgage', 'Buy'],
    },
    train: {
      rent: [
        'Rent with one station',
        'Rent with two stations',
        'Rent with three stations',
        'four-station rent',
      ],
      prices: ['Pledge', 'Buy'],
    },
  },
  close: 'Close',
  disclose: 'Disclose',
};

export default en;
