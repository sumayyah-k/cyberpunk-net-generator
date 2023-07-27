import { reactive } from 'vue'
import snakeSvg from './assets/icons/snake.svg?raw';
import scorpionSvg from './assets/icons/scorpion.svg?raw';
import giantSvg from './assets/icons/giant.svg?raw';
import wolfSvg from './assets/icons/wolf-head.svg?raw';
import dragonSvg from './assets/icons/dragon-head.svg?raw';
import ravenSvg from './assets/icons/raven.svg?raw';
import badgerSvg from './assets/icons/badger.svg?raw';
import licheSvg from './assets/icons/crowned-skull.svg?raw';
import krakenSvg from './assets/icons/giant-squid.svg?raw';
import wispSvg from './assets/icons/noodle-ball.svg?raw';
import killerSvg from './assets/icons/jason-mask.svg?raw';
import sabertoothSvg from './assets/icons/saber-toothed-cat-head.svg?raw';

const blackIce = {
  asp: {name: 'Asp', icon: snakeSvg, type: 'Anti-Personnel Black ICE', per: 4, spd: 6, atk: 2, def: 2, rez: 15, cost: 100, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  giant: {name: 'Giant', icon: giantSvg, type: 'Anti-Personnel Black ICE', per: 2, spd: 2, atk: 8, def: 4, rez: 25, cost: 1000, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  hellhound: {name: 'Hellhound', icon: wolfSvg, type: 'Anti-Personnel Black ICE', per: 6, spd: 6, atk: 6, def: 2, rez: 20, cost: 500, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  kraken: {name: 'Kraken', icon: krakenSvg, type: 'Anti-Personnel Black ICE', per: 6, spd: 2, atk: 8, def: 4, rez: 30, cost: 1000, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  liche: {name: 'Liche', icon: licheSvg, type: 'Anti-Personnel Black ICE', per: 8, spd: 2, atk: 6, def: 2, rez: 25, cost: 500, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  raven: {name: 'Raven', icon: ravenSvg, type: 'Anti-Personnel Black ICE', per: 6, spd: 4, atk: 4, def: 2, rez: 15, cost: 50, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  scorpion: {name: 'Scorpion', icon: scorpionSvg, type: 'Anti-Personnel Black ICE', per: 2, spd: 6, atk: 2, def: 2, rez: 15, cost: 100, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  skunk: {name: 'Skunk', icon: badgerSvg, type: 'Anti-Personnel Black ICE', per: 2, spd: 4, atk: 4, def: 2, rez: 10, cost: 500, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  wisp: {name: 'Wisp', icon: wispSvg, type: 'Anti-Personnel Black ICE', per: 4, spd: 4, atk: 4, def: 2, rez: 15, cost: 50, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  dragon: {name: 'Dragon', icon: dragonSvg, type: 'Anti-Program Black ICE', per: 6, spd: 4, atk: 6, def: 6, rez: 30, cost: 1000, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  killer: {name: 'Killer', icon: killerSvg, type: 'Anti-Program Black ICE', per: 4, spd: 8, atk: 6, def: 2, rez: 20, cost: 500, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
  sabertooth: {name: 'Sabertooth', icon: sabertoothSvg, type: 'Anti-Program Black ICE', per: 8, spd: 6, atk: 6, def: 2, rez: 25, cost: 1000, effect: 'Destroys a single Program installed on the enemy Netrunner\'s Cyberdeck at random.'},
};

export const store = reactive({
  netArch: {
    netrunners: [],
    floors: [],
    draggingBlackIce: false,
    draggingNetrunners: false,
    blackIce,
    rollTableLobby: [
      {type: 'File', description: 'Some boring file...', DV: 6, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 6, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 8, blackIce: [], demons: []},
      {type: 'Black ICE', description: 'Skunk', DV: null, blackIce: [{type: blackIce.skunk, currentRez: blackIce.skunk.rez}], demons: []},
      {type: 'Black ICE', description: 'Wisp', DV: null, blackIce: [{type: blackIce.wisp, currentRez: blackIce.wisp.rez}], demons: []},
      {type: 'Black ICE', description: 'Killer', DV: null, blackIce: [{type: blackIce.killer, currentRez: blackIce.killer.rez}], demons: []},
    ],
    rollTableBasic: [
      {type: 'Black ICE', description: 'Hellhound', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Black ICE', description: 'Sabertooth', DV: null, blackIce: [{type: blackIce.sabertooth, currentRez: blackIce.sabertooth.rez}], demons: []},
      {type: 'Black ICE', description: 'Raven x2', DV: null, blackIce: [{type: blackIce.raven, currentRez: blackIce.raven.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Black ICE', description: 'Wisp', DV: null, blackIce: [{type: blackIce.wisp, currentRez: blackIce.wisp.rez}], demons: []},
      {type: 'Black ICE', description: 'Raven', DV: null, blackIce: [{type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
      {type: 'Password', description: null, DV: 6, blackIce: [], demons: []},
      {type: 'File', description: 'Some exciting file...', DV: 6, blackIce: [], demons: []},
      {type: 'Control Node', description: 'Massage Chair', DV: 6, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 6, blackIce: [], demons: []},
      {type: 'Black ICE', description: 'Skunk', DV: null, blackIce: [{type: blackIce.skunk, currentRez: blackIce.skunk.rez}], demons: []},
      {type: 'Black ICE', description: 'Asp', DV: null, blackIce: [{type: blackIce.asp, currentRez: blackIce.asp.rez}], demons: []},
      {type: 'Black ICE', description: 'Scorpion', DV: null, blackIce: [{type: blackIce.scorpion, currentRez: blackIce.scorpion.rez}], demons: []},
      {type: 'Black ICE', description: 'Killer, Skunk', DV: null, blackIce: [{type: blackIce.killer, currentRez: blackIce.killer.rez}, {type: blackIce.skunk, currentRez: blackIce.skunk.rez}], demons: []},
      {type: 'Black ICE', description: 'Wisp x3', DV: null, blackIce: [{type: blackIce.wisp, currentRez: blackIce.wisp.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}], demons: []},
      {type: 'Black ICE', description: 'Liche', DV: null, blackIce: [{type: blackIce.liche, currentRez: blackIce.liche.rez}], demons: []},
    ],
    rollTableStandard: [
      {type: 'Black ICE', description: 'Hellhound x2', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound, Killer', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.killer, currentRez: blackIce.killer.rez}], demons: []},
      {type: 'Black ICE', description: 'Skunk x2', DV: null, blackIce: [{type: blackIce.skunk, currentRez: blackIce.skunk.rez}, {type: blackIce.skunk, currentRez: blackIce.skunk.rez}], demons: []},
      {type: 'Black ICE', description: 'Sabertooth', DV: null, blackIce: [{type: blackIce.sabertooth, currentRez: blackIce.sabertooth.rez}], demons: []},
      {type: 'Black ICE', description: 'Scorpion', DV: null, blackIce: [{type: blackIce.scorpion, currentRez: blackIce.scorpion.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Password', description: null, DV: 8, blackIce: [], demons: []},
      {type: 'File', description: 'Some exciting file...', DV: 8, blackIce: [], demons: []},
      {type: 'Control Node', description: 'Massage Chair', DV: 8, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 8, blackIce: [], demons: []},
      {type: 'Black ICE', description: 'Asp', DV: null, blackIce: [{type: blackIce.asp, currentRez: blackIce.asp.rez}], demons: []},
      {type: 'Black ICE', description: 'Killer', DV: null, blackIce: [{type: blackIce.killer, currentRez: blackIce.killer.rez}], demons: []},
      {type: 'Black ICE', description: 'Liche', DV: null, blackIce: [{type: blackIce.liche, currentRez: blackIce.liche.rez}], demons: []},
      {type: 'Black ICE', description: 'Asp', DV: null, blackIce: [{type: blackIce.asp, currentRez: blackIce.asp.rez}], demons: []},
      {type: 'Black ICE', description: 'Raven x3', DV: null, blackIce: [{type: blackIce.raven, currentRez: blackIce.raven.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
      {type: 'Black ICE', description: 'Liche, Raven', DV: null, blackIce: [{type: blackIce.liche, currentRez: blackIce.liche.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
    ],
    rollTableUncommon: [
      {type: 'Black ICE', description: 'Kraken', DV: null, blackIce: [{type: blackIce.kraken, currentRez: blackIce.kraken.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound, Scorpion', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.scorpion, currentRez: blackIce.scorpion.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound, Killer', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.killer, currentRez: blackIce.killer.rez}], demons: []},
      {type: 'Black ICE', description: 'Raven x2', DV: null, blackIce: [{type: blackIce.raven, currentRez: blackIce.raven.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
      {type: 'Black ICE', description: 'Sabertooth', DV: null, blackIce: [{type: blackIce.sabertooth, currentRez: blackIce.sabertooth.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Password', description: null, DV: 10, blackIce: [], demons: []},
      {type: 'File', description: 'Some exciting file...', DV: 10, blackIce: [], demons: []},
      {type: 'Control Node', description: 'Massage Chair', DV: 10, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 10, blackIce: [], demons: []},
      {type: 'Black ICE', description: 'Killer', DV: null, blackIce: [{type: blackIce.killer, currentRez: blackIce.killer.rez}], demons: []},
      {type: 'Black ICE', description: 'Liche', DV: null, blackIce: [{type: blackIce.liche, currentRez: blackIce.liche.rez}], demons: []},
      {type: 'Black ICE', description: 'Dragon', DV: null, blackIce: [{type: blackIce.dragon, currentRez: blackIce.dragon.rez}], demons: []},
      {type: 'Black ICE', description: 'Asp, Raven', DV: null, blackIce: [{type: blackIce.asp, currentRez: blackIce.asp.rez}, {type: blackIce.raven, currentRez: blackIce.raven.rez}], demons: []},
      {type: 'Black ICE', description: 'Dragon, Wisp', DV: null, blackIce: [{type: blackIce.dragon, currentRez: blackIce.dragon.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}], demons: []},
      {type: 'Black ICE', description: 'Giant', DV: null, blackIce: [{type: blackIce.giant, currentRez: blackIce.giant.rez}], demons: []},
    ],
    rollTableAdvanced: [
      {type: 'Black ICE', description: 'Hellhound x3', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Black ICE', description: 'Asp x2', DV: null, blackIce: [{type: blackIce.asp, currentRez: blackIce.asp.rez}, {type: blackIce.asp, currentRez: blackIce.asp.rez}, {type: blackIce.asp, currentRez: blackIce.asp.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound, Liche', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.liche, currentRez: blackIce.liche.rez}], demons: []},
      {type: 'Black ICE', description: 'Wisp x3', DV: null, blackIce: [{type: blackIce.wisp, currentRez: blackIce.wisp.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}], demons: []},
      {type: 'Black ICE', description: 'Hellhound, Sabertooth', DV: null, blackIce: [{type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}, {type: blackIce.sabertooth, currentRez: blackIce.sabertooth.rez}], demons: []},
      {type: 'Black ICE', description: 'Kraken', DV: null, blackIce: [{type: blackIce.kraken, currentRez: blackIce.kraken.rez}], demons: []},
      {type: 'Password', description: null, DV: 12, blackIce: [], demons: []},
      {type: 'File', description: 'Some exciting file...', DV: 12, blackIce: [], demons: []},
      {type: 'Control Node', description: 'Massage Chair', DV: 12, blackIce: [], demons: []},
      {type: 'Password', description: null, DV: 12, blackIce: [], demons: []},
      {type: 'Black ICE', description: 'Giant', DV: null, blackIce: [{type: blackIce.giant, currentRez: blackIce.giant.rez}], demons: []},
      {type: 'Black ICE', description: 'Dragon', DV: null, blackIce: [{type: blackIce.dragon, currentRez: blackIce.dragon.rez}], demons: []},
      {type: 'Black ICE', description: 'Killer, Scorpion', DV: null, blackIce: [{type: blackIce.killer, currentRez: blackIce.killer.rez}, {type: blackIce.scorpion, currentRez: blackIce.scorpion.rez}], demons: []},
      {type: 'Black ICE', description: 'Kraken', DV: null, blackIce: [{type: blackIce.kraken, currentRez: blackIce.kraken.rez}], demons: []},
      {type: 'Black ICE', description: 'Raven, Wisp, Hellhound', DV: null, blackIce: [{type: blackIce.raven, currentRez: blackIce.raven.rez}, {type: blackIce.wisp, currentRez: blackIce.wisp.rez}, {type: blackIce.hellhound, currentRez: blackIce.hellhound.rez}], demons: []},
      {type: 'Black ICE', description: 'Dragon x2', DV: null, blackIce: [{type: blackIce.dragon, currentRez: blackIce.dragon.rez}, {type: blackIce.dragon, currentRez: blackIce.dragon.rez}], demons: []},
    ],
  }
});