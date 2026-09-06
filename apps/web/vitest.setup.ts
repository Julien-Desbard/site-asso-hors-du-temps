// Setup global exécuté avant chaque fichier de test (cf. `setupFiles` dans vitest.config.ts).

// Entrée `/vitest` (et non la racine) : elle enregistre les matchers via `expect.extend`
// de Vitest au lieu de ceux de Jest.
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Testing Library n'auto-nettoie que si `globalThis.afterEach` existe au moment de son
// import ; on le fait explicitement pour ne dépendre d'aucune détection implicite.
afterEach(() => {
  cleanup();
});
