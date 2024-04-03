import { defineConfig } from 'wxt';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  runner: {
    startUrls: [process.env.VIDEO_WALL_URL ?? 'https://vision.meraki.com']
  },
  vite: () => ({
    plugins: [
      svelte({
        // Using a svelte.config.js file causes a segmentation fault when importing the file
        configFile: false,
        preprocess: [vitePreprocess()]
      })
    ],
    envPrefix: 'PUBLIC_'
  })
});
