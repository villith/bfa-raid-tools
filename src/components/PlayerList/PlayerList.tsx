import * as React from 'react';

import { Player } from '../Player/Player';
import PlayerListRow from './PlayerListRow';

// import Select from 'react-select';
class PlayerList extends React.Component<{
  players: Player[],
}> {
  public render() {
    return (
      <div>
        <div className="row list-header">
          <div className="col-10">PLAYER</div>
        </div>
        <div>
          {this.props.players.map(player => {
            const { id, playerName, playerClass, playerSpec } = player;
            return <PlayerListRow
              key={id}
              playerClass={playerClass}  // class reserved
              playerSpec={playerSpec}
              playerName={playerName}
              playerId={id}
            />
          })}
        </div>
      </div>
    )
  }
}

export default PlayerList;
