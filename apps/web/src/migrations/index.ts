import * as migration_20260825_150121_initial from './20260825_150121_initial';
import * as migration_20260826_173826_add_bugfix_content from './20260826_173826_add_bugfix_content';
import * as migration_20261102_205714_presse_date from './20261102_205714_presse_date';
import * as migration_20261102_210226_roles_fonds_dotation from './20261102_210226_roles_fonds_dotation';

export const migrations = [
  {
    up: migration_20260825_150121_initial.up,
    down: migration_20260825_150121_initial.down,
    name: '20260825_150121_initial',
  },
  {
    up: migration_20260826_173826_add_bugfix_content.up,
    down: migration_20260826_173826_add_bugfix_content.down,
    name: '20260826_173826_add_bugfix_content',
  },
  {
    up: migration_20261102_205714_presse_date.up,
    down: migration_20261102_205714_presse_date.down,
    name: '20261102_205714_presse_date',
  },
  {
    up: migration_20261102_210226_roles_fonds_dotation.up,
    down: migration_20261102_210226_roles_fonds_dotation.down,
    name: '20261102_210226_roles_fonds_dotation',
  },
];
