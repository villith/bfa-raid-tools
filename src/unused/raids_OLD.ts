const oldRaids = [
  {
    zoneName: "Antorus, the Burning Throne",
    bosses: {
      VARIMATHRAS: {
        bossName: 'Varimathras',
        bossMapURL: 'antorus_Varimathras',
        bossIcon: 'boss-varimathras',
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      AGGRAMAR: {
        bossName: "Aggramar",
        bossMapURL: "antorus_Aggramar",
        bossIcon: "boss-aggramar",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      PORTAL_KEEPER_HASABEL: {
        bossName: "Portal Keeper Hasabel",
        bossMapURL: "antorus_Hasabel",
        bossIcon: "boss-portalkeeperhasabel",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      THE_COVEN_OF_SHIVARRA: {
        bossName: "The Coven of Shivarra",
        bossMapURL: "antorus_Coven",
        bossIcon: "boss-thecovenofshivarra",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      FELHOUNDS_OF_SARGERAS: {
        bossName: "Felhounds of Sargeras",
        bossMap: {
          url: "antorus_Felhounds"
        },
        bossIcon: "boss-felhoundsofsargeras",
        bossDetails: {
          units: [
            {
              id: 0,
              unitId: 126916,
              name: "F'harg",
              icon: "boss-felhoundsofsargeras"
            },
            {
              id: 1,
              unitId: 126915,
              name: "Shatug",
              icon: "boss-felhoundsofsargeras"
            }
          ],
          abilities: [
            {
              spellId: 251445,
              spellName: "Burning Maw",
              spellIcon: "spell_shadow_lifedrain",
              sourceId: 0,
              target: "ALL",
              getTargetMethod: "NONE",
              targetFilter: ["MELEE", "RANGED", "TANK", "DPS", "HEALER"],
              cooldownTypes: ["HEALING", "MOVEMENT"],
              debuff: {},
              firstCast: null,
              cooldown: null,
              unitIds: []
            }
          ],
          doodads: []
        }
      },
      GAROTHI_WORLDBREAKER: {
        bossName: "Garothi Worldbreaker",
        bossMap: {
          url: "antorus_Garothi"
        },
        bossIcon: "boss-garothiworldbreaker",
        bossDetails: {
          units: [
            {
              id: 0,
              unitId: 123371,
              name: "Garothi Worldbreaker",
              icon: "boss-garothiworldbreaker"
            },
            {
              id: 1,
              unitId: 122773,
              name: "Decimator",
              icon: "boss-goroth"
            },
            {
              id: 2,
              unitId: 122778,
              name: "Annihilator",
              icon: "boss-kiljaeden"
            }
          ],
          abilities: [
            {
              spellId: 244761,
              spellName: "Annihilation",
              spellIcon: "ability_warlock_backdraftgreen",
              sourceId: 122778,
              target: 'GROUND',
              getTargetMethod: 'RANDOM',
              cooldownTypes: ['HEALING'],
              debuff: null,
              firstCast: 8,
              cooldown: 32,
              unitIds: [123371, 122778],
              doodadIds: [0]
            },
            {
              spellId: 244399,
              spellName: "Decimation",
              spellIcon: "ability_mage_firestarter",
              sourceId: 122773,
              target: 'PLAYER',
              getTargetMethod: 'RANDOM',
              targetFilter: ['MELEE', 'RANGED', 'DPS', 'HEALER'],
              cooldownTypes: ['HEALING', 'MOVEMENT'],
              debuff: {
                id: 244410,
                icon: "ability_mage_firestarter",
                radius: 12,
                duration: 5
              },
              firstCast: 24,
              cooldown: 32,
              unitIds: [123371, 122773]
            },
            {
              spellId: 246971,
              spellName: "Haywire Annihilation",
              spellIcon: "ability_warlock_backdraftgreen",
              sourceId: 122778,     // Annihilator
              target: 'GROUND',
              getTargetMethod: 'RANDOM',
              cooldownTypes: ['HEALING'],
              debuff: null,
              firstCast: null,
              cooldown: 32,
              unitIds: [123371, 122778]
            },
            {
              spellId: 246920,
              spellName: "Haywire Decimation",
              spellIcon: "ability_mage_firestarter",
              sourceId: 122773,     // Decimator
              target: 'PLAYER',
              getTargetMethod: 'RANDOM',
              targetFilter: ['MELEE', 'RANGED', 'DPS', 'HEALER'],
              cooldownTypes: ['HEALING', 'MOVEMENT'],
              debuff: {
                id: 245294,
                icon: "ability_mage_firestarter",
                radius: 12,
                duration: 2
              },
              firstCast: null,
              cooldown: 32,
              unitIds: [123371, 122773]
            },
            {
              spellId: 244532,
              spellName: "Fel Bombardment",
              spellIcon: "ability_hunter_snipershot",
              sourceId: 123371,
              target: 'PLAYER',
              getTargetMethod: 'CURRENT_TARGET',
              targetFilter: ['MELEE', 'RANGED', 'TANK', 'DPS', 'HEALER'],
              cooldownTypes: [],
              debuff: {
                id: 244532,
                icon: "ability_hunter_snipershot",
                radius: 7,
                duration: 5
              },
              firstCast: 9,
              cooldown: 16,
              unitIds: [123371]
            },
            {
              spellId: 240277,
              spellName: "Apocalypse Drive",
              spellIcon: "ability_bossfelmagnaron_handempowered",
              sourceId: 123371,
              target: 'ALL',
              getTargetMethod: 'NONE',
              targetFilter: ['MELEE', 'RANGED', 'TANK', 'DPS', 'HEALER'],
              cooldownTypes: [],
              debuff: null,
              firstCast: null,
              cooldown: null,
              unitIds: [123371]
            },
            {
              spellId: 247159,
              spellName: "Luring Destruction",
              spellIcon: "achievement_boss_hellfire_felreaver",
              sourceId: 123371,
              target: "ALL",
              getTargetMethod: "NONE",
              targetFilter: ["MELEE", "RANGED", "TANK", "DPS", "HEALER"],
              cooldownTypes: ["HEALING", "MOVEMENT"],
              debuff: {
                id: 246848,
                icon: "achievement_boss_hellfire_felreaver",
                radius: 0,
                duration: 3
              },
              firstCast: null,
              cooldown: null,
              unitIds: [123371]
            }
          ],
          doodads: [
            {
              id: 0,
              description: "Annihilation",
              x: 352,
              y: 600,
              height: 72,
              width: 72,
              xOffset: 144,
              yOffset: 0
            }
          ]
        }
      },
      ANTORAN_HIGH_COMMAND: {
        bossName: "Antoran High Command",
        bossMapURL: "antorus_HighCommand",
        bossIcon: "boss-warcouncil",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      KINGAROTH: {
        bossName: "Kingaroth",
        bossMapURL: "antorus_Kingaroth",
        bossIcon: "boss-kingaroth",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      IMONAR_THE_SOULHUNTER: {
        bossName: "Imonar the Soulhunter",
        bossMapURL: "antorus_Imonar",
        bossIcon: "boss-imonarthesoulhunter",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      EONAR_THE_LIFEBINDER: {
        bossName: "Eonar the Life-binder",
        bossMapURL: "antorus_Eonar",
        bossIcon: "boss-eonar",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      },
      ARGUS_THE_UNMAKER: {
        bossName: "Argus the Unmaker",
        bossMapURL: "antorus_Argus",
        bossIcon: "boss-argustheunmaker",
        bossDetails: {
          units: [],
          abilities: [],
          doodads: []
        }
      }
    }
  }
];
