/* global document */

import Player from './tic-tac-toe-player.js';
// import TTTField from './ttt-field.js';

/**
 * @class
 */
export default class TicTacToe {
  /**
   * @param {HTMLElement} board
   * @param {number} width
   * @param {number} height
   */
  constructor(board, width = 3, height = width) {
    this.WIDTH = width;
    this.HEIGHT = height;

    /** @type {HTMLElement} */
    this.board = board;

    /** @type {NodeListOf<HTMLElement>} */
    this.fields = null; // This.board.querySelectorAll('input[type=checkbox]');

    /** @type {Array<number>} */
    this.checkedFieldsWithPoints = new Array(width * height);

    /** @type {Array<Player>} */
    this.players = this.initPlayers();

    /** @type {number} */
    this.currentPlayerId = 0;

    /** @type {NodeListOf<HTMLElement>} */
    this.nameElements = null;
    /** @type {boolean} */
    this.gameOver = false;

    /** @type {HTMLElement} */
    this.messageContainer = null;

    /** @type {number} */
    this.moves = 0;

    this.move = this.move.bind(this);

    this.init();
  }

  /**
   *
   */
  restart() {
    this.moves = 0;
    this.currentPlayerId = 0;
    this.gameOver = false;

    this.resetBoard(this.board);
    this.checkedFieldsWithPoints =
      this.checkedFieldsWithPoints.map((field) => 0);

    // This.messageContainer.setAttribute('hidden', true);

    this.board.classList.add(`turn-${this.getCurrentPlayer().type}`);
  }

  /**
   *
   */
  init() {
    // if ('customElements' in window) {
    //   customElements.define('ttt-field', TTTField);
    // }

    this.fields = this.createFields(this.board, this.WIDTH, this.HEIGHT);
    this.addEventListeners(this.fields);

    this.restart();
    // This.updateNameLabel();
  }

  /**
   * @return {Array<Player>}
   */
  initPlayers() {
    const player1 = new Player('Ida', 'cross');
    const player2 = new Player('Sindre', 'circle');

    return [player1, player2];
  }

  /**
   * @param {Event} event
   */
  move(event) {
    if (this.gameOver) {
      return;
    }

    const field = event.currentTarget;
    const fieldIndex = parseInt(field.getAttribute('data-value'));
    let currentPlayer = this.getCurrentPlayer();

    field.classList.add(currentPlayer.type);
    field.disabled = true;

    currentPlayer.checkedFields.push(fieldIndex);
    this.checkedFieldsWithPoints[fieldIndex] =
      currentPlayer.type === 'cross' ? 1 : -1;

    this.gameOver = this.checkWinState();

    if (this.gameOver) {
      this.endGame();
      return;
    }

    this.moves++;

    if (this.moves === 9) {
      this.endDraw();
    }

    this.board.classList.remove(`turn-${currentPlayer.type}`);
    this.currentPlayerId = (this.currentPlayerId + 1) % 2;
    // This.updateNameLabel();
    currentPlayer = this.getCurrentPlayer();

    this.board.classList.add(`turn-${currentPlayer.type}`);
  }

  /**
   *
   */
  updateNameLabel() {
    const currentPlayer = this.getCurrentPlayer();

    for (let i = 0; i < this.nameElements.length; i++) {
      this.nameElements[i].textContent = currentPlayer.name;
    }
  }

  /**
   * @return {boolean}
   */
  checkWinState() {
    const currentPlayer = this.getCurrentPlayer();
    const checkedFields = currentPlayer.checkedFields;
    const boardCheckedFields = this.checkedFieldsWithPoints;

    let gameWon = false;

    if (checkedFields.length < 3) {
      return gameWon;
    }

    const horizontalTopPoints =
      boardCheckedFields[0] + boardCheckedFields[1] + boardCheckedFields[2];
    const horizontalMidPoints =
      boardCheckedFields[3] + boardCheckedFields[4] + boardCheckedFields[5];
    const horizontalBottomPoints =
      boardCheckedFields[6] + boardCheckedFields[7] + boardCheckedFields[8];

    const verticalLeftPoints =
      boardCheckedFields[0] + boardCheckedFields[3] + boardCheckedFields[6];
    const verticalMidPoints =
      boardCheckedFields[1] + boardCheckedFields[4] + boardCheckedFields[7];
    const verticalRightPoints =
      boardCheckedFields[2] + boardCheckedFields[5] + boardCheckedFields[8];

    const diagonalTopLeftToBottomRight =
      boardCheckedFields[0] + boardCheckedFields[4] + boardCheckedFields[8];
    const diagonalTopRightToBottomLeft =
      boardCheckedFields[2] + boardCheckedFields[4] + boardCheckedFields[6];

    gameWon =
      horizontalTopPoints * currentPlayer.scoreType === 3 ||
      horizontalMidPoints * currentPlayer.scoreType === 3 ||
      horizontalBottomPoints * currentPlayer.scoreType === 3 ||
      verticalLeftPoints * currentPlayer.scoreType === 3 ||
      verticalMidPoints * currentPlayer.scoreType === 3 ||
      verticalRightPoints * currentPlayer.scoreType === 3 ||
      diagonalTopLeftToBottomRight * currentPlayer.scoreType === 3 ||
      diagonalTopRightToBottomLeft * currentPlayer.scoreType === 3;

    return gameWon;
  }

  /**
   *
   */
  endGame() {
    // const currentPlayer = this.getCurrentPlayer();

    this.board.classList.add('game-over');
    // Document.body.classList.add(`${currentPlayer.type}-won`, )
    this.messageContainer.removeAttribute('hidden', false);
  }

  /**
   *
   */
  endDraw() {
    this.messageContainer.textContent = 'It\'s a draw';
    this.endGame();
  }

  /**
   * @return {Player}
   */
  getCurrentPlayer() {
    return this.players[this.currentPlayerId];
  }

  /**
   *
   * @param {HTMLElement} board
   * @param {number} width
   * @param {number} height
   * @return {NodeListOf<HTMLInputElement>}
   */
  createFields(board, width = 3, height = width) {
    let index = 0;
    let fields = [];
    let field;

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        field = this.createField(++index);
        board.appendChild(field);
        fields.push(field);
      }
    }

    return fields;
  }

  /**
   *
   * @param {number} i
   * @param {number} y
   * @return {HTMLElement}
   */
  createField(i) {
    /*

      <div>
        <input id="mid-left" type="checkbox" data-value="3">
        <label for="mid-left"></label>
      </div>

    */
    // const tttField = document.createElement('ttt-field');

    // if (!('customElements' in window)) {
    //   const {
    //     checkbox,
    //     label,
    //   } = (new TTTField).createInner();

    //   tttField.appendChild(checkbox);
    //   tttField.appendChild(label);
    // }
    const div = document.createElement('div');

    const checkbox = document.createElement('input');
    checkbox.id = `checkbox-${i}`;
    checkbox.type = 'checkbox';
    checkbox.setAttribute('data-value', `${i}`);

    const label = document.createElement('label');
    label.setAttribute('for', checkbox.id);

    div.appendChild(checkbox);
    div.appendChild(label);

    return div;
  }

  /**
   *
   * @param {HTMLElement} board
   */
  resetBoard(board) {
    const fields = board.querySelectorAll('input[type=checkbox]');

    fields.forEach((element) => {
      element.checked = false;
    });
  }

  /**
   *
   * @param {NodeListOf<HTMLInputElement>} fields
   */
  addEventListeners(fields) {
    let checkbox;

    Array.prototype.forEach.call(fields, field => {
      checkbox = field.firstChild;
      checkbox.addEventListener('change', this.move, false);
    });
  }
}
