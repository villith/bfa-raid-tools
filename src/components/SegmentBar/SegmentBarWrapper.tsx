import { StyleRulesCallback, Theme, WithStyles, withStyles } from '@material-ui/core';
import * as React from 'react';

import { Player } from '../../classes/Player';
import { ArmorType } from '../../enums/armorType';
import { Role } from '../../enums/role';
import { WeaponType } from '../../enums/weaponType';
import { WOWClass } from '../../enums/WOWclass';
import { getClassInfo, getSpecInfo } from '../../helpers/getClassInfo';
import { Aux } from '../winAux';
import SegmentBarContainer, { ISegmentValue } from './SegmentBarContainer';

export interface ISegmentBarWrapperProps {
 players: Player[];
}

export interface ISegmentBarWrapperState {
  placeholder?: string;
}

const styles: StyleRulesCallback<any> = (theme: Theme) => ({
  root: {}
});

class SegmentBarWrapper extends React.Component<WithStyles<any> & ISegmentBarWrapperProps, ISegmentBarWrapperState> {
  public buildClassSegments = (players: Player[]) => {
    type ClassSegmentMap = { [key in WOWClass]: ISegmentValue };
    const classSegments: ClassSegmentMap = {} as ClassSegmentMap;
    players.map(player => {
      const { playerClass } = player;
      const classInfo = getClassInfo(playerClass);
      classSegments.hasOwnProperty(playerClass)
      ? classSegments[playerClass].count += 1
      : classSegments[playerClass] = {
        color: classInfo.classColor,
        count: 1,
        label: classInfo.label,        
      }
    });

    return classSegments;
  }

  public buildRoleSegments = (players: Player[]) => {
    type RoleSegmentMap = { [key in Role]: ISegmentValue };
    const roleColors = [
      '#c2185b',
      '#388e3c',
      '#ffa000',
      '#e64a19',
    ];
    const roleLabels = [
      'Tank',
      'Healer',
      'Melee DPS',
      'Ranged DPS',
    ];
    const roleSegments: RoleSegmentMap = {} as RoleSegmentMap;
    players.map(player => {
      const { playerClass, playerSpec } = player;
      const specInfo = getSpecInfo(playerClass, playerSpec);
      const playerRole = !specInfo.isMelee && specInfo.role === Role.DPS
      ? specInfo.role + 1 : specInfo.role;

      roleSegments.hasOwnProperty(playerRole)
      ? roleSegments[playerRole].count += 1
      : roleSegments[playerRole] = {
        color: roleColors[playerRole],
        count: 1,
        label: roleLabels[playerRole],
      };
    });

    return roleSegments;
  }

  public buildArmorTypeSegments = (players: Player[]) => {
    type ArmorTypeSegmentMap = { [key in ArmorType]: ISegmentValue };
    const armorTypeColors = [
      'red',
      'blue',
      'yellow',
      'green',
    ];
    const armorTypeLabels = [
      'Cloth',
      'Leather',
      'Mail',
      'Plate'
    ];
    const armorTypeSegments: ArmorTypeSegmentMap = {} as ArmorTypeSegmentMap;
    players.map(player => {
      const { playerClass } = player;
      const classInfo = getClassInfo(playerClass);
      const armorType = classInfo.armorType;
      armorTypeSegments.hasOwnProperty(armorType)
      ? armorTypeSegments[armorType].count += 1
      : armorTypeSegments[armorType] = {
        color: armorTypeColors[armorType],
        count: 1,
        label: armorTypeLabels[armorType]
      };
    });

    return armorTypeSegments;
  }

  public buildWeaponTypeSegments = (players: Player[]) => {
    type WeaponTypeSegmentMap = {[key in WeaponType]: ISegmentValue };
    const weaponTypeColors = [
      'brown',
      'grey',
      'red',
      'blue',
      'yellow',
      'green',
      'pink',
      'purple',
      'brown',
      'grey',
      'red',
      'blue',
      'yellow',
      'green',
      'pink',
      'purple'
    ];

    const weaponTypeLabels = [
      'Dagger',
      'Warglaive',
      'Fist',
      'Wand',
      'Bow',
      'Gun',
      'Shield',
      'Offhand',
      'Polearm',
      'Staff',
      'One-Handed Axe',
      'One-Handed Mace',
      'One-Handed Sword',
      'Two-Handed Axe',
      'Two-Handed Mace',
      'Two-Handed Sword'
    ];
    
    const weaponTypeSegments: WeaponTypeSegmentMap = {} as WeaponTypeSegmentMap;
    players.map(player => {
      const { playerClass, playerSpec } = player;
      const specInfo = getSpecInfo(playerClass, playerSpec);
      const weaponTypes = specInfo.weaponTypes;
      weaponTypes.map(weaponType => {
        weaponTypeSegments.hasOwnProperty(weaponType)
        ? weaponTypeSegments[weaponType].count += 1
        : weaponTypeSegments[weaponType] = {
          color: weaponTypeColors[weaponType],
          count: 1,
          label: weaponTypeLabels[weaponType]
        };
      });
    });

    return weaponTypeSegments;
  }
  
  public render() {
    const { players } = this.props;
    const classSegments = this.buildClassSegments(players);
    const roleSegments = this.buildRoleSegments(players);
    const armorTypeSegments = this.buildArmorTypeSegments(players);
    const weaponTypeSegments = this.buildWeaponTypeSegments(players);
    return (
      <Aux>
        { Object.keys(classSegments).length > 0 && <SegmentBarContainer segments={classSegments} /> }
        { Object.keys(roleSegments).length > 0 && <SegmentBarContainer segments={roleSegments} /> }
        { Object.keys(armorTypeSegments).length > 0 && <SegmentBarContainer segments={armorTypeSegments} /> }
        { Object.keys(weaponTypeSegments).length > 0 && <SegmentBarContainer segments={weaponTypeSegments} /> }
      </Aux>
    );
  }
}

export default withStyles(styles)(SegmentBarWrapper)