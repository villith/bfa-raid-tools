import { StyleRulesCallback, Theme, Tooltip, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { ISegmentValue } from './SegmentBarContainer';

export interface ISegmentBarProps {
  segment: ISegmentValue;
}

export interface ISegmentBarState {
  arrowRef: any;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  segmentBar: {
    display: 'flex',
    height: '100%'
  },
  lightTooltip: {
    background: theme.palette.common.white,
    color: theme.palette.text.primary,
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrowPopper: {
    '&[x-placement*="bottom"] $arrowArrow': {
      top: 0,
      left: 0,
      marginTop: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '0 1em 1em 1em',
        borderColor: `transparent transparent ${theme.palette.grey[700]} transparent`,
      },
    },
    '&[x-placement*="top"] $arrowArrow': {
      bottom: 0,
      left: 0,
      marginBottom: '-0.9em',
      width: '3em',
      height: '1em',
      '&::before': {
        borderWidth: '1em 1em 0 1em',
        borderColor: `${theme.palette.grey[700]} transparent transparent transparent`,
      },
    },
    '&[x-placement*="right"] $arrowArrow': {
      left: 0,
      marginLeft: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 1em 1em 0',
        borderColor: `transparent ${theme.palette.grey[700]} transparent transparent`,
      },
    },
    '&[x-placement*="left"] $arrowArrow': {
      right: 0,
      marginRight: '-0.9em',
      height: '3em',
      width: '1em',
      '&::before': {
        borderWidth: '1em 0 1em 1em',
        borderColor: `transparent transparent transparent ${theme.palette.grey[700]}`,
      },
    },
  },
  arrowArrow: {
    position: 'absolute',
    fontSize: 7,
    width: '3em',
    height: '3em',
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
});

class SegmentBar extends React.Component<WithStyles<any> & ISegmentBarProps, ISegmentBarState> {
  public state = {
    arrowRef: null
  }

  public handleArrowRef = (node: any) => {
    this.setState({
      arrowRef: node,
    });
  };

  public render() {
    const { classes, segment } = this.props;
    const segmentStyle = {
      backgroundColor: segment.color,
      width: `${segment.width}%`,
    };

    const tooltipStyle = {
      color: segment.color
    };

    return (
      <Tooltip
        title={
          <React.Fragment>
            <Typography style={tooltipStyle}>{segment.label}:
              <span style={{ color: 'white' }}> {segment.count}</span>
            </Typography>
            <span className={classes.arrowArrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
        classes={{ popper: classes.arrowPopper }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
      >
        <div className={classes.segmentBar} style={segmentStyle} />
      </Tooltip>
    );
  }
}

export default withStyles(styles)(SegmentBar)