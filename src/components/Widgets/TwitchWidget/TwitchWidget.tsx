import { Avatar, Chip, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Aux } from 'src/components/winAux';
import { getClassInfo, getSpecInfo } from 'src/helpers/getClassInfo';

import { ITwitchStreamerProfile } from './TwitchWidgetContainer';

export interface ITwitchWidgetProps {
  profile: ITwitchStreamerProfile;
}

export interface ITwitchWidgetState {
  controller: AbortController;
  streamData: ITwitchStreamsData;
  lastUpdate: number;
}

export interface ITwitchStreamsResponse {
  data: ITwitchStreamsData[];
  pagination: {
    cursor: string;
  };
}

export type TwitchStreamType = 'live' | '';

export interface ITwitchStreamsData {
  id: string;
  user_id: string;
  user_name: string;
  game_id: string;
  community_ids: string[];
  type: TwitchStreamType;
  language: string;
  started_at: string;
  title: string;
  viewer_count: number;
  thumbnail_url: string;
  tag_ids: string[];
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {
    padding: theme.spacing.unit
  },
  actions: {
    float: 'right'
  },
  characterName: {
    display: 'flex',
    fontSize: 17,
    lineHeight: 1.33,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  liveText: {
    color: 'red',
    WebkitAnimation: 'pulsate 3s ease-out',
    WebkitAnimationIterationCount: 'infinite',
    opacity: 0.5,
    textIndent: 6,
    fontSize: 12,
    fontWeight: 'bolder'
  },
  '@keyframes pulsate': {
    '0%': {
      opacity: 0.5,
    },
    '50%': {
      opacity: 1.0,
    },
    '100%': {
      opacity: 0.5,
    }
  },
  channelName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'right',
    marginLeft: 'auto',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  channelNameText: {
    color: 'rgba(100, 65, 165, 1)'
  },
  cardHeader: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center'
  },
  spacer: {
    flex: '1 1 100%',
  },
  cardTitle: {
    flex: '0 0 auto',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
  loading: {
    margin: 'auto'
  },
  nameAndRealm: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  nameAndLive: {
    display: 'flex',
    alignItems: 'center'
  },
  chipAvatar: {
    display: 'inline-flex',
    width: 24,
    height: 24,
    borderRadius: 16,
    verticalAlign: 'middle',
    justifyContent: 'center'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
  },
  realm: {
  },
  chip: {
    height: 24,
    margin: theme.spacing.unit / 3
  }
});

const UPDATE_INTERVAL = 300000; // 5 seconds

class TwitchWidget extends React.Component<WithStyles<any> & ITwitchWidgetProps, ITwitchWidgetState> {
  public state = {
    controller: new AbortController(),
    streamData: {} as ITwitchStreamsData,
    lastUpdate: 0,
  }
  // public buildClassesComponent = () => {

  // }
  // public buildSpecsComponent = () => {
    
  // }
  // public buildRolesComponent = () => {

  // }
  // public buildContentTypesComponent = () => {

  // }
  public componentDidMount() {
    const { lastUpdate } = this.state;
    const currentTime = Date.now();
    const diff = currentTime - lastUpdate;
    if (diff > UPDATE_INTERVAL) {
      this.getStreamData();
    }
  }

  public componentWillUnmount() {
    const { controller } = this.state;
    controller.abort();
  }

  public getStreamData = () => {
    const { controller } = this.state;
    const { signal } = controller;
    const { profile } = this.props;
    const { userId } = profile;
    const corsProxy = process.env.NODE_ENV !== 'production' ? 'https://cors-anywhere.herokuapp.com/' : '';
    const url = `${corsProxy}https://api.twitch.tv/helix/streams?user_id=${userId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Client-ID', `${process.env.REACT_APP_CLIENT_ID}`);
    const request = fetch(url, {
      headers,
      signal
    });
    request
      .then(result => {
        return result.json()
      })
      .then((response: ITwitchStreamsResponse) => {
        const { data } = response;
        if (data) {
          this.setState({ streamData: data[0], lastUpdate: Date.now() });
        }
        else {
          // console.log(response);
        }
      })
      .catch(error => console.log(error));
  }
  public render() {
    const { streamData } = this.state;
    const { classes, profile } = this.props;
    const { characterName, realm, channelName, classes: cls, specs, contentTypes } = profile;
    const rIoLink = `https://raider.io/characters/us/${realm}/${characterName}`;
    const twitchLink = `https://twitch.tv/${channelName}`;
    return (
      <div className={classes.root}>
        {/* {loading ? (
          <CircularProgress className={classes.loading} />
        ) : ( */}
          <Aux>
            <div className={classes.profileHeader}>
              <div className={classes.nameAndRealm} onClick={() => window.open(rIoLink, '_blank')}>
                <div className={classes.nameAndLive}>
                  <Typography variant='overline' className={classes.characterName}>
                    {characterName}
                  </Typography>
                  {streamData && streamData.type === 'live' &&
                    <Typography variant='overline' className={classes.liveText}>
                      LIVE
                    </Typography>
                  }
                </div>
                <Typography variant='caption' className={classes.realm}>
                  {realm} (US)
                </Typography>
              </div>
              <div className={classes.channelName} onClick={() => window.open(twitchLink, '_blank')}>
                <Typography variant='subtitle1' className={classes.channelNameText}>
                  {`twitch.tv/${channelName}`}
                </Typography>
                <Avatar src='GlitchBadge_White_48px.png' className={classes.twitchAvatar} />
              </div>
            </div>
            <div className={classes.characterProfile}>
              <div className={classes.classChips}>
                {cls.map((c, index) => {
                  const classInfo = getClassInfo(c);
                  const classSpecs = classInfo.specs.filter(s => specs.includes(s.id));
                  const specInfoArray = classSpecs.map(s => getSpecInfo(c, s.id));
                  return (
                    <Aux key={index}>
                      {/* <Chip className={classes.chip} key={index} avatar={<Avatar className={classes.chipAvatar} src={`classIcons/${classInfo.icon}.jpg`} />} /> */}
                      {specInfoArray.map((spec, i) => {
                        return <Chip className={classes.chip} key={i} label={spec.name} variant='outlined' avatar={<Avatar className={classes.chipAvatar} src={`classIcons/${spec.icon}.jpg`} />} />
                      })}
                    </Aux>
                  )
                })}
              </div>
              {/* <div className={classes.roleChips}>
                {roles.map((role, index) => {
                  const roleLabels = ['Tank', 'Healer', 'DPS']; // temp                  
                  return (
                    <Chip className={classes.chip} key={index} label={roleLabels[role]} variant='outlined' />
                  )
                })}
              </div> */}
              <div className={classes.contentTypeChips}>
                {contentTypes.map((type, index) => {
                  return (
                    <Chip className={classes.chip} key={index} label={type} variant='outlined' />
                  )
                })}
              </div>
            </div>
          </Aux>
        {/* )} */}
      </div>
    );
  }
}

export default withStyles(styles)(TwitchWidget)