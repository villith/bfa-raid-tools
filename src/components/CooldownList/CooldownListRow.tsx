import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface ICooldownListRowProps {
  placeholder?: string;
}

export interface ICooldownListRowState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class CooldownListRow extends React.Component<WithStyles<any> & ICooldownListRowProps, ICooldownListRowState> {
  public render() {
    return (
      null
    );
  }
}

export default withStyles(styles)(CooldownListRow)