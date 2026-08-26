import * as migration_20260825_150121_initial from './20260825_150121_initial';

export const migrations = [
  {
    up: migration_20260825_150121_initial.up,
    down: migration_20260825_150121_initial.down,
    name: '20260825_150121_initial'
  },
];
