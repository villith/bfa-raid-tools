import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { createSegmentValues } from '../../helpers/createSegmentValues';
import SegmentBar from './SegmentBar';

export interface ISegmentBarContainerProps {
  segments: IDefaultSegmentMap;
}

export interface ISegmentBarContainerState {
  placeholder?: string;
}

export interface IDefaultSegmentMap {
  [index: number]: ISegmentValue;
}

export interface ISegmentValue {
  count: number;
  label: string;
  color?: string;
  width?: number;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  segmentContainer: {
    display: 'flex',
    height: '10px',
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
  },
});

class SegmentBarContainer extends React.Component<WithStyles<any> & ISegmentBarContainerProps, ISegmentBarContainerState> {
  public render() {
    const { classes, segments } = this.props;
    const segmentValues = createSegmentValues(segments);
    return (
      <div className={classes.segmentContainer}>
        {segmentValues
          .sort((a, b) => a.count > b.count ? -1 : 1)
          .map((segment, index) => {
          return (
            <SegmentBar
              key={index}
              segment={segment}
            />
          )
        })}
      </div>
    );
  }
}

export default withStyles(styles)(SegmentBarContainer)