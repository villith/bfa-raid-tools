import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  StyleRulesCallback,
  TextField,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';
import { BossAbility } from 'src/classes/BossAbility';
import { Cooldown } from 'src/classes/Cooldown';
import { Player } from 'src/classes/Player';
import { getClassInfo } from 'src/helpers/getClassInfo';
import { getPlayerIndexById } from 'src/helpers/getPlayer';

export interface IExportAngryAssignmentsProps {
  bossAbilities: BossAbility[];
  cooldowns: Cooldown[];
  players: Player[];
  open: boolean;
  closeDialog: () => void;
  exportAngryAssignments: (angryAssignmentsString: string) => void;
}

export interface IExportAngryAssignmentsState {
  angryAssignmentsString: string;
  exportButton: IExportButton;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

const exportButtonStates = {
  default: {
    text: 'COPY TO CLIPBOARD',
    classNames: '',
    color: 'primary'
  },
  copied: {
    text: 'COPIED',
    classNames: '',
    color: 'green'
  },
  error: {
    text: 'COPY TO CLIPBOARD',
    classNames: '',
    color: 'red'
  },
};

interface IExportButton {
  text: string;
  classNames: string;
  color: string;
}

class ExportAngryAssignments extends React.Component<WithStyles<any> & IExportAngryAssignmentsProps, IExportAngryAssignmentsState> {
  public state = {
    angryAssignmentsString: '',
    exportButton: exportButtonStates.default,
  }

  public componentDidMount() {
    console.log('exportAngryAssignments MOUNT');
    this.buildAngryAssignmentsString();
  }

  public handleExportAngryAssignments = () => {
    this.props.exportAngryAssignments(this.state.angryAssignmentsString);
  }

  public buildAngryAssignmentsString = () => {
    const { bossAbilities, cooldowns, players } = this.props;
    let exportString = '';
    const abilityCountObj = {};
    bossAbilities.map(bossAbility => {
      if (abilityCountObj.hasOwnProperty(bossAbility.spellId) === false) {
        abilityCountObj[bossAbility.spellId] = 1;
      }
      else {
        abilityCountObj[bossAbility.spellId] += 1;
      }
      const assignedCooldowns = cooldowns.filter(cooldown => cooldown.bossAbilities.includes(bossAbility.id));
      if (assignedCooldowns.length > 0) {
        let stringLine = '';
        stringLine += `(${abilityCountObj[bossAbility.spellId]})   {icon ${bossAbility.spellId}} {spell ${bossAbility.spellId}}\n`;
        assignedCooldowns.map(assignedCooldown => {
          const { owner } = assignedCooldown;
          const playerIndex = getPlayerIndexById(owner, players);
          const player = players[playerIndex];
          const classInfo = getClassInfo(player.playerClass);
          const { playerName } = player;
          const playerClass = classInfo.label.toLowerCase().replace(' ', '');
          stringLine += `        |c${playerClass} ${playerName}|r > `;
          stringLine += `${assignedCooldown.label}\n`;
        });
        exportString += `${stringLine}`;
      }
    });
    this.setState({ angryAssignmentsString: exportString });
  }

  public render() {
    const { open, closeDialog } = this.props;
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>EXPORT ANGRY ASSIGNMENTS</DialogTitle>
        <DialogContent>
          <TextField
            multiline={true}            
            value={this.state.angryAssignmentsString}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={this.handleExportAngryAssignments} color='secondary'>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExportAngryAssignments)