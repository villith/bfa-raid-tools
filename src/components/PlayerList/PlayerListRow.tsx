import * as React from 'react';

import { Checkbox, TableCell, TableRow } from '../../../node_modules/@material-ui/core';
import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getClassInfo } from '../../helpers/getClassInfo';

export interface IPlayerListRowProps {
  isSelected: boolean;
  playerClass: WOWClass;
  playerSpec: WOWSpec;
  playerName: string;
  playerId: number;
  handleClick: ((event: any, id: number) => void);
}

class PlayerListRow extends React.Component<IPlayerListRowProps, any> {
  public render() {
    const { isSelected, playerId, playerClass, playerName, playerSpec, handleClick } = this.props;
    const classInfo = getClassInfo(playerClass);
    const specInfo = classInfo.specs.find(spec => spec.id === playerSpec);
    // const roleIcon = getRoleIcon(classInfo.)

    return (
      <TableRow
        hover={true}
        // tslint:disable-next-line:jsx-no-lambda
        onClick={(event) => handleClick(event, playerId)}
        role={'checkbox'}
        tabIndex={-1}
        key={playerId}
        selected={isSelected}
      >
        <TableCell padding='checkbox'>
          <Checkbox checked={isSelected} />
        </TableCell>
        <TableCell padding='none'>
          <img className='playerIcon' src={`classIcons/${classInfo.icon}.jpg`} />
        </TableCell>
        <TableCell padding='none'>
          <img className='playerIcon' src={`classIcons/${specInfo!.icon}.jpg`} />
        </TableCell>
        <TableCell>{playerName}</TableCell>
      </TableRow>        
    );
  }
}

export default PlayerListRow;
