import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// BASE_PATH lets the same build run at a domain root ("/") or under a sub-path,
// e.g. GitHub Pages project sites ("/loyalty-path/"). The router reads it via import.meta.env.BASE_URL.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
});
