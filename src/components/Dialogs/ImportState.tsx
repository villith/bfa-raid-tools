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

export interface IImportStateProps {
  open: boolean;
  importState: ((importString: string) => void);
  closeDialog: (() => void);
}

export interface IImportStateState {
  importString: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ImportState extends React.Component<WithStyles<any> & IImportStateProps, IImportStateState> {
  public state = {
    importString: ''
  }

  public handleImportState = () => {
    this.props.importState(this.state.importString);
  }

  public render() {
    const { open, closeDialog } = this.props;
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>IMPORT STATE</DialogTitle>
        <DialogContent>
          <TextField value={this.state.importString} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={this.handleImportState} color='secondary'>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ImportState)