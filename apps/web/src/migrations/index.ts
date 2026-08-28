import * as migration_20260825_150121_initial from './20260825_150121_initial';
import * as migration_20260826_173826_add_bugfix_content from './20260826_173826_add_bugfix_content';

export const migrations = [
  {
    up: migration_20260825_150121_initial.up,
    down: migration_20260825_150121_initial.down,
    name: '20260825_150121_initial',
  },
  {
    up: migration_20260826_173826_add_bugfix_content.up,
    down: migration_20260826_173826_add_bugfix_content.down,
    name: '20260826_173826_add_bugfix_content'
  },
];
