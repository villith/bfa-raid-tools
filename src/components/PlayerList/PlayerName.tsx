import * as React from 'react';
import { IWOWClass } from '../../constants/classes';

export interface IPlayerTextProps {
  classInfo: IWOWClass;
  playerName: string;
}

export default class PlayerText extends React.Component<IPlayerTextProps, any> {
  public render() {
    const { playerName } = this.props;
    return (
      <span>{playerName}</span>
    );
  }
}
