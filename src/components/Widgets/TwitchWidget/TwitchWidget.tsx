import { Avatar, Chip, StyleRulesCallback, Theme, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Aux } from 'src/components/winAux';
import { getClassInfo, getSpecInfo } from 'src/helpers/getClassInfo';

import { ITwitchStreamerProfile } from './TwitchWidgetContainer';

export interface ITwitchWidgetProps {
  profile: ITwitchStreamerProfile;
}

export interface ITwitchWidgetState {
  error: any;
  streamData: ITwitchStreamsData;
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
    fontSize: 18,
    lineHeight: 1.33,
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  liveText: {
    display: 'flex'
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
  noChipAvatar: {
    display: 'inline-flex',
    width: 32,
    height: 32,
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
  }
});

class TwitchWidget extends React.Component<WithStyles<any> & ITwitchWidgetProps, ITwitchWidgetState> {
  public state = {
    error: {},
    streamData: {} as ITwitchStreamsData
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
    this.getStreamData();
  }

  public getStreamData = () => {
    const { profile } = this.props;
    const { userId } = profile;
    const corsProxy = 'https://cors-anywhere.herokuapp.com/';
    const url = `${corsProxy}https://api.twitch.tv/helix/streams?user_id=${userId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Client-ID', `${process.env.REACT_APP_CLIENT_ID}`);
    const request = fetch(url, { headers });
    request
      .then(result => {
        return result.json()
      })
      .then((response: ITwitchStreamsResponse) => {
        const { data } = response;
        if (data) {
          this.setState({ streamData: data[0] });
        }
        else {
          console.log(response);
        }
    });

    request.catch(e => {
      this.setState({ error: e });
    });
  }
  public render() {
    const { streamData } = this.state;
    const { classes, profile } = this.props;
    const { characterName, realm, channelName, classes: cls, specs, roles, contentTypes } = profile;
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
                    <Typography variant='caption' className={classes.liveText}>
                      - LIVE! -
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
              {cls.map((c, index) => {
                const classInfo = getClassInfo(c);
                const classSpecs = classInfo.specs.filter(s => specs.includes(s.id));
                const specInfoArray = classSpecs.map(s => getSpecInfo(c, s.id));
                return (
                  <Aux key={index}>
                    <Chip key={index} label={classInfo.label} variant='outlined' avatar={<Avatar className={classes.noChipAvatar} src={`classIcons/${classInfo.icon}.jpg`} />} />
                    {specInfoArray.map((spec, i) => {
                      return <Chip key={i} label={spec.name} variant='outlined' avatar={<Avatar src={`classIcons/${spec.icon}.jpg`} />} />
                    })}
                  </Aux>
                )
              })}
              {roles.map((role, index) => {
                const roleLabels = ['Tank', 'Healer', 'DPS']; // temp                  
                return (
                  <Chip key={index} label={roleLabels[role]} variant='outlined' />
                )
              })}
              {contentTypes.map((type, index) => {
                return (
                  <Chip key={index} label={type} variant='outlined' />
                )
              })}
            </div>
          </Aux>
        {/* )} */}
      </div>
    );
  }
}

export default withStyles(styles)(TwitchWidget)