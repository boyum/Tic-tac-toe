import { createStore } from 'redux';

interface ChangePlayerAction {
  type: ChangePlayerActionType;
}

enum ChangePlayerActionType {
  NEXT,
  PREVIOUS
}

export default function changePlayer(state: number = 0, action: ChangePlayerAction): number {
  switch (action.type) {
    case ChangePlayerActionType.NEXT: 
      return state++;
    case ChangePlayerActionType.PREVIOUS:
      return state--;
    default: 
      return state;
  }
}