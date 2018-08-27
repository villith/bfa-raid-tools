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

export interface IExportStateProps {
  open: boolean;
  exportState: ((exportString: string) => void);
  closeDialog: (() => void);
}

export interface IExportStateState {
  exportString: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ExportState extends React.Component<WithStyles<any> & IExportStateProps, IExportStateState> {
  public handleExportState = () => {
    this.props.exportState(this.state.exportString);
  }

  public render() {
    const { open, closeDialog } = this.props;
    return (
      <Dialog
        open={open}
        onClose={closeDialog}
      >
        <DialogTitle>EXPORT STATE</DialogTitle>
        <DialogContent>
          <TextField />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={this.handleExportState} color='secondary'>
            Export
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExportState)