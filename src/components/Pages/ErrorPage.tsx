import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

export interface IErrorPageProps {
  handleFinishedLoading: () => void;
  reason: string;
}

export interface IErrorPageState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class ErrorPage extends React.Component<WithStyles<any> & IErrorPageProps, IErrorPageState> {
  public componentDidMount() {
    this.props.handleFinishedLoading();
  }
  
  public render() {
    const { classes, reason } = this.props;
    return (
      <div className={classes.root}>
        {reason}
      </div>
    );
  }
}

export default withStyles(styles)(ErrorPage);
