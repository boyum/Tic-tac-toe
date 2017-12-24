import test from 'ava';
import {
  JSDOM,
} from 'jsdom';

import TicTacToe from '../script/tic-tac-toe';

/** @type {TicTacToe} */
let game;
let document;
let window;

test.before(() => {
  const dom = new JSDOM(`<!doctype html><html><body></body>`);

  window = dom.window;
  document = window.document;

  global.window = window;
  global.document = document;
});

test.beforeEach(() => {
  const board = document.createElement('div');

  game = new TicTacToe(board, 3, 3);
});

test(`createField() returns a TTT field 
  (checkbox + label wrapped in a div)`, t => {
  const field = game.createField(0, 0);

  t.is(field.nodeName, 'TTTField');
  t.is(field.childElementCount, 2);
  t.is(field.checked, false);

  t.not(field.querySelector('input[type=checkbox]'), null);
  t.not(field.querySelector('label'), null);
  t.not(field.field, undefined);
});

// test(`resetBoard() sets all fields' values to false`, t => {
//   const fieldContainer = game.createField(0, 0);
//   const field = fieldContainer.querySelector('input[type=checkbox]');

//   game.board.appendChild(fieldContainer);

//   field.click();

//   t.is(field.checked, true);

//   game.resetBoard(game.board);

//   t.is(field.checked, false);
// });
