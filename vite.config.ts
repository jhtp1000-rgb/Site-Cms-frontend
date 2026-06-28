import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          title: process.env.VITE_CITY_NAME,
          favicon: process.env.VITE_FAVICON,
          logo: process.env.VITE_LOGO,
        },
      },
    }),
  ],
});
