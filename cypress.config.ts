import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      TEST_EMAIL: process.env.NEXT_PUBLIC_TEST_EMAIL,
      TEST_PASSWORD: process.env.NEXT_PUBLIC_TEST_PASSWORD
    }
  },
});
