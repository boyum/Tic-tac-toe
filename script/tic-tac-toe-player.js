/**
 * @class
 */
export default class Player {
  /**
   * @param {string} name
   * @param {string} type
   */
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.scoreType = type === 'cross' ? 1 : -1;
    this.checkedFields = [];
  }
}
