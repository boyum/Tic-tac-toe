
// if (!window) {
//   const {JSDOM} = require('jsdom');

//   const dom = new JSDOM(`<!doctype html><html><body></body>`);

//   const window = dom.window;
//   const document = window.document;

//   global.window = window;
//   global.document = document;
// }

// /**
//  * @export
//  * @class TTTField
//  * @extends {HTMLElement}
//  */
// export default class TTTField extends window.HTMLElement {
//   /**
//    * Creates an instance of TTTField.
//    * @memberof TTTField
//    */
//   constructor() {
//     super();

//     /** @type {HTMLInputElement} */
//     this.field = null;

//     /** @type {HTMLLabelElement} */
//     this.label = null;
//   }
// /**
//  * @memberof TTTField
//  */
// connectedCallback() {
//     const shadow = this.attachShadow({
//       mode: 'open',
//     });

//     const {
//       checkbox,
//       label,
//     } = this.createInner();

//     shadow.appendChild(checkbox);
//     shadow.appendChild(label);

//     this.field = checkbox;
//   }


//   /**
//    * @readonly
//    * @memberof TTTField
//    * @return {HTMLInputElement}
//    */
//   get field() {
//     return this.field;
//   }

//   /**
//    * @memberof TTTField
//    * @param {HTMLInputElement} field
//    */
//   set field(field) {
//     // this.field = field;
//   }

//   /**
//    * @readonly
//    * @memberof TTTField
//    * @return {boolean}
//    */
//   get checked() {
//     return this.field.checked;
//   }

//   /**
//    * @param {number} i
//    * @return {Array<HTMLElement>}
//    */
//   createInner(i) {
//     const checkbox = document.createElement('input');
//     checkbox.id = `checkbox-${i}`;
//     checkbox.type = 'checkbox';
//     checkbox.setAttribute('data-value', `${i}`);

//     const label = document.createElement('label');
//     label.setAttribute('for', checkbox.id);

//     return {
//       checkbox,
//       label,
//     };
//   }
// }
