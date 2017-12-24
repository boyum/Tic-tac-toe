import * as React from 'react';
import Field from '../field';
import './board.css';

interface Props {
  width: number;
  height: number;
}

interface State {

}

export default class Board extends React.Component <Props, State> {
  length: number;

  constructor(props: Props) {
    super(props);

    this.length = this.props.width * this.props.height;
  }

  render() {
    return (
      this.renderFields(this.length)
    );
  }

  renderFields(length: number): JSX.Element[] {
    const fields = [];

    for (let i = 0; i < length; i++) {
      fields.push(<Field index={i} />);
    }

    return fields;
  }
}