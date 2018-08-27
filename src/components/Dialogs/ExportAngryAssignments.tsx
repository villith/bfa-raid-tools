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

export interface IExportAngryAssignmentsProps {
  open: boolean;
  closeDialog: (() => void);
  exportAngryAssignments: ((angryAssignmentsString: string) => void);
}

export interface IExportAngryAssignmentsState {
  angryAssignmentsString: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ExportAngryAssignments extends React.Component<WithStyles<any> & IExportAngryAssignmentsProps, IExportAngryAssignmentsState> {
  public state = {
    angryAssignmentsString: ''
  }

  public handleExportAngryAssignments = () => {
    this.props.exportAngryAssignments(this.state.angryAssignmentsString);
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
          <TextField value={this.state.angryAssignmentsString} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color='primary'>
            Cancel
          </Button>
          <Button variant='contained' onClick={this.handleExportAngryAssignments} color='secondary'>
            Import
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ExportAngryAssignments)