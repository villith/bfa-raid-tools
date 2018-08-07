import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  StyleRulesCallback,
  Theme,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';

export interface IConfirmPlayerDeleteProps {
  open: boolean;
  players: Player[];
  deletePlayers: (() => void);
  selected: string[];
  closeDialog: (() => void);
}

export interface IConfirmPlayerDeleteState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ConfirmPlayerDelete extends React.Component<WithStyles<any> & IConfirmPlayerDeleteProps, IConfirmPlayerDeleteState> {
  public render() {
    const { closeDialog, deletePlayers, open } = this.props;
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>CONFIRM PLAYER DELETE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to delete THIS PLAYER. THIS PLAYER is on the roster for the following fights:
              - LIST FIGHTS.
            Deleting this player will remove them and their cooldowns from the listed fights.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={deletePlayers} color='secondary'>
            Delete Players
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmPlayerDelete)