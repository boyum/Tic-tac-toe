import * as React from 'react';
import { ChangeEvent } from 'react';
import TTTType from '../ttt-type';

interface Props {
  index: number;
}

interface State {
  checkboxChecked: boolean;
  type: TTTType;
}

export default class Field extends React.Component<Props, State> {
  checkboxId: string;

  constructor(props: Props) {
    super(props);

    this.checkboxId = `ttt-checkbox-${this.props.index}`;
  }
  
  render() {
    return (
      <div className={this.state.checkboxChecked ? 'checked' : ''}>
        <input type="checkbox" id={this.checkboxId} onChange={this.handleChange} />
        <label htmlFor={this.checkboxId} />
      </div>
    );
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    this.setState((prevState, props) => {
      return { checkboxChecked: event.currentTarget.checked };
    });
  }
}
