import * as React from 'react';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getClassInfo } from '../../helpers/getClassColor';

class PlayerListRow extends React.Component<{
  playerClass: WOWClass,
  playerSpec: WOWSpec,
  playerName: string,
  playerId: number,
}> {
  public render() {
    const { playerClass, playerName } = this.props;
    const classInfo = getClassInfo(playerClass);
    const trStyle = {
      color: classInfo.classColor
    };

    return (
      <div style={trStyle}>
        <div className="row no-gutters">
          <div className="col-9"><img src={`classIcons/${classInfo.icon}.jpg`} alt={playerName} /> {playerName}</div>
        </div>
      </div>
    );
  }
}

export default PlayerListRow;
