import { CooldownType } from 'src/enums/cooldownType';

export interface ICooldownTypeDetails {
  id: CooldownType;
  icon: string;
  label: string;
  color?: string;
}

const COOLDOWNTYPES: ICooldownTypeDetails[] = [
  {
    id: CooldownType.DEFENSIVE,
    icon: 'shield',
    label: 'Defensive',
  },
  {
    id: CooldownType.CROWD_CONTROL,
    icon: 'sheep',
    label: 'Crowd Control',
  },
  {
    id: CooldownType.IMMUNITY,
    icon: 'shield-1',
    label: 'Immunity',
  },
  {
    id: CooldownType.BATTLE_RESURRECTION,
    icon: 'care',
    label: 'Battle Res',
  },
  {
    id: CooldownType.EXTERNAL,
    icon: 'donation',
    label: 'External',
  },
  {
    id: CooldownType.HEALING,
    icon: 'more',
    label: 'Healing',
  },
  {
    id: CooldownType.MOVEMENT,
    icon: 'speed',
    label: 'Movement',
  },
];

export { COOLDOWNTYPES };
