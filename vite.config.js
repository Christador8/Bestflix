import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // <-- this should match your repo name
  plugins: [react()],
});
