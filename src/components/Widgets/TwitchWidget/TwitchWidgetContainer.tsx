import { Paper, StyleRulesCallback, Theme, Toolbar, Typography, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';
import { Aux } from 'src/components/winAux';
import { Role } from 'src/enums/role';
import { WOWClass } from 'src/enums/WOWclass';
import { WOWSpec } from 'src/enums/WOWspec';

import TwitchWidget from './TwitchWidget';

export interface ITwitchWidgetContainerProps {
  placeholder?: string;
}

export interface ITwitchWidgetContainerState {
  scriptLoaded: boolean;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {},
  profileList: {
    maxHeight: '80vh',
    overflowY: 'scroll'
  },
  title: {
    flex: '0 0 auto',
  },
  '::-webkit-scrollbar-track': {
    WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
    backgroundColor: '#F5F5F5'
  },  
  '::-webkit-scrollbar': {
    width: 6,
    backgroundColor: '#F5F5F5'
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#000000'
  }
});

type TwitchContentType = 'Raiding' | 'M+' | 'PvP';

export interface ITwitchStreamerProfile {
  userId: string;
  characterName: string;
  realm: string;
  channelName: string;
  classes: WOWClass[];
  specs: WOWSpec[];
  roles: Role[];
  contentTypes: TwitchContentType[];
}

const twitchProfiles: ITwitchStreamerProfile[] = [
  {
    userId: '184554448',
    characterName: 'Undäddy',
    realm: 'Area 52',
    channelName: 'undadtv',
    classes: [WOWClass.ROGUE],
    specs: [WOWSpec.ASSASSINATION, WOWSpec.SUBTLETY],
    roles: [Role.DPS],
    contentTypes: ['Raiding', 'M+']
  },
  {
    userId: '56013273',
    characterName: 'Ward',
    realm: 'Illidan',
    channelName: 'wardthemage',
    classes: [WOWClass.MAGE],
    specs: [WOWSpec.ARCANE, WOWSpec.FIRE, WOWSpec.FROST_MAGE],
    roles: [Role.DPS],
    contentTypes: ['Raiding', 'M+']
  },
  {
    userId: '119585602',
    characterName: 'Gutterglaive',
    realm: 'Illidan',
    channelName: 'gutterstylez1',
    classes: [WOWClass.DEMON_HUNTER, WOWClass.DEATH_KNIGHT],
    specs: [WOWSpec.VENGEANCE, WOWSpec.BLOOD],
    roles: [Role.TANK],
    contentTypes: ['Raiding', 'M+']
  },
  {
    userId: '72059383',
    characterName: 'Barokoshama',
    realm: 'Area 52',
    channelName: 'barokoshama',
    classes: [WOWClass.SHAMAN],
    specs: [WOWSpec.ELEMENTAL],
    roles: [Role.DPS],
    contentTypes: ['Raiding', 'M+']
  },
  {
    userId: '167685447',
    characterName: 'Fuzzyweng',
    realm: 'Illidan',
    channelName: 'parsedlel',
    classes: [WOWClass.SHAMAN, WOWClass.PRIEST],
    specs: [WOWSpec.RESTORATION_SHAMAN, WOWSpec.ELEMENTAL, WOWSpec.DISCIPLINE],
    roles: [Role.HEALER, Role.DPS],
    contentTypes: ['Raiding', 'M+', 'PvP']
  }
]

class TwitchWidgetContainer extends React.Component<WithStyles<any> & ITwitchWidgetContainerProps, ITwitchWidgetContainerState> {
  public render() {
    const { classes } = this.props;
    return (
      <Aux>
        <Paper className={classes.root}>
          <Toolbar>
            <div className={classes.title}>
              <Typography variant='h6'>
                TWITCH STREAMS
              </Typography>
            </div>
          </Toolbar>
          <div className={classes.profileList}>
            {twitchProfiles.map((profile, index) => {
              return <TwitchWidget key={index} profile={profile} />;
            })}
          </div>
        </Paper>
        <Typography variant='caption'>
          Want to be listed here?
        </Typography>
      </Aux>
    );
  }
}

export default withStyles(styles)(TwitchWidgetContainer)