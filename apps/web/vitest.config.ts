import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],

    // `clearMocks` remet les compteurs d'appels à zéro entre les tests, mais conserve les
    // implémentations posées par les factories `vi.mock` (ce que `mockReset` effacerait).
    clearMocks: true,
    // Restaure automatiquement `process.env` et les globals stubés après chaque test.
    unstubEnvs: true,
    unstubGlobals: true,

    css: {
      modules: {
        // `styles.active` vaut littéralement 'active' : les assertions de classes restent lisibles.
        classNameStrategy: 'non-scoped',
      },
    },

    coverage: {
      reporter: ['text', 'lcov'],
      // On ne mesure que le code réellement testable : ni la config Payload, ni les
      // collections/globals (pure déclaration), ni les migrations, ni les pages serveur.
      include: [
        'src/app/actions/**/*.ts',
        'src/hooks/**/*.ts',
        'src/lib/**/*.ts',
        'src/components/**/*.tsx',
      ],

      // Seuils posés ~5 points sous les chiffres réels mesurés au moment de leur
      // introduction (statements/lines/functions à 100 % partout ; branches : 94,44 %
      // pour les actions, 98,07 % pour les composants, 100 % pour hooks et lib).
      //
      // Aucun seuil global : Vitest saute un jeu dont les 4 clés sont `undefined`, et
      // un plancher global masquerait une régression localisée.
      //
      // Ne JAMAIS écrire `src/app/(payload)/**` dans un glob : picomatch lirait les
      // parenthèses comme un groupe extglob. On s'appuie sur l'`include` restrictif.
      thresholds: {
        'src/app/actions/**/*.ts': { statements: 95, branches: 90, functions: 100, lines: 95 },
        'src/hooks/**/*.ts': { statements: 95, branches: 95, functions: 100, lines: 95 },
        'src/lib/**/*.ts': { statements: 95, branches: 95, functions: 100, lines: 95 },
        'src/components/**/*.tsx': { statements: 95, branches: 93, functions: 95, lines: 95 },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
