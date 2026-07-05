import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
