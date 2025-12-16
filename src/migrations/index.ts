import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251216_131016_initial_setup from './20251216_131016_initial_setup';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251216_131016_initial_setup.up,
    down: migration_20251216_131016_initial_setup.down,
    name: '20251216_131016_initial_setup'
  },
];
