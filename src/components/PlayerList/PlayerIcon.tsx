import * as React from 'react';

import { IWOWClass } from '../../constants/classes';
import { Aux } from '../winAux';
import PlayerName from './PlayerName';

export interface IPlayerIconProps {
  classInfo: IWOWClass;
  playerName: string;
}

export default class PlayerIcon extends React.Component<IPlayerIconProps, any> {
  public render() {
    const { classInfo, playerName } = this.props;
    const { classColor, icon } = classInfo;
    return (
      <Aux>
        <img className='playerIcon' style={{ borderColor: classColor }} src={`classIcons/${icon}.jpg`} />
        <PlayerName classInfo={classInfo} playerName={playerName} />
      </Aux>
    );
  }
}
