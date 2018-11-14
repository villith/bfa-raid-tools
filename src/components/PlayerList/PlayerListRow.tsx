import { Checkbox, StyleRulesCallback, TableCell, TableRow, Theme, WithStyles, withStyles } from '@material-ui/core';
import { Star as StarIcon, StarBorder as StarBorderIcon } from '@material-ui/icons';
import * as React from 'react';

import { WOWClass } from '../../enums/WOWclass';
import { WOWSpec } from '../../enums/WOWspec';
import { getClassInfo, getSpecInfo } from '../../helpers/getClassInfo';

export interface IPlayerListRowProps {
  isFocused: boolean;
  isSelected: boolean;
  playerClass: WOWClass;
  playerSpec: WOWSpec;
  playerName: string;
  playerId: string;
  handleClick: (id: string) => void;
  changeFocusedPlayerId?: (id: string) => void;
}

export interface IPlayerListRowState {
  isHovered: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  icon: {
    borderRadius: '50%',
    height: 28
  },
  hidden: {
    visibility: 'hidden'
  }
})

class PlayerListRow extends React.Component<WithStyles<any> & IPlayerListRowProps, any> {
  public state = {
    isHovered: false
  }

  public handleChangeFocusedPlayerId = () => {
    const { changeFocusedPlayerId, playerId } = this.props;
    changeFocusedPlayerId!(playerId);
  }

  public handleRowClick = () => {
    const { handleClick, playerId } = this.props;
    handleClick(playerId);
  }

  public handleMouseEnter = () => {
    this.setState({ isHovered: true });
  }

  public handleMouseLeave = () => {
    this.setState({ isHovered: false });
  }

  public render() {
    const { isHovered } = this.state;
    const { classes, changeFocusedPlayerId, isFocused, isSelected, playerId, playerClass, playerName, playerSpec } = this.props;
    const classInfo = getClassInfo(playerClass);
    const specInfo = getSpecInfo(playerClass, playerSpec);
    const isVisible = isFocused || isHovered;
    // const roleIcon = getRoleIcon(classInfo.)

    return (
      <TableRow
        hover={true}
        // tslint:disable-next-line:jsx-no-lambda
        role={'checkbox'}
        tabIndex={-1}
        key={playerId}
        selected={isSelected}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <TableCell onClick={this.handleRowClick} padding='checkbox'>
          <Checkbox checked={isSelected} />
        </TableCell>
        <TableCell onClick={this.handleRowClick} padding='none'>
          <img className={classes.icon} src={`classIcons/${classInfo.icon}.jpg`} />
        </TableCell>
        <TableCell onClick={this.handleRowClick} padding='none'>
          <img className={classes.icon} src={`classIcons/${specInfo.icon}.jpg`} />
        </TableCell>
        <TableCell onClick={this.handleRowClick}>{playerName}</TableCell>
        { changeFocusedPlayerId &&
          <TableCell>
            <Checkbox
              className={isVisible ? classes.focusedCheckbox : classes.hidden}
              icon={<StarBorderIcon />}
              checkedIcon={<StarIcon />}
              checked={isFocused}
              onClick={this.handleChangeFocusedPlayerId}
              color='secondary'
            />
          </TableCell>
        }
      </TableRow>        
    );
  }
}

export default withStyles(styles)(PlayerListRow);
