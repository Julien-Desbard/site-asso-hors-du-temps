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
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
