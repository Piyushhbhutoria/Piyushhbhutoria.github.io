// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  site: 'https://piyushhbhutoria.github.io',
  integrations: [
    react(),
    mdx(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
    })
  ],

  build: {
    inlineStylesheets: 'auto',
    assets: '_assets',
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    build: {
      minify: 'esbuild',
      cssMinify: true,
      cssCodeSplit: true,
      sourcemap: false,
      rollupOptions: {
        plugins: [
          visualizer({
            filename: 'dist/stats.html',
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ],
        output: {
          manualChunks(id) {
            // Vendor chunks
            if (id.includes('node_modules')) {
              // React core
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              // Radix UI - only include used packages
              if (id.includes('@radix-ui')) {
                if (id.includes('react-dialog') || id.includes('react-dropdown-menu') || id.includes('react-accordion')) {
                  return 'vendor-radix-core';
                }
                if (id.includes('react-tooltip') || id.includes('react-toast') || id.includes('react-slot')) {
                  return 'vendor-radix-ui';
                }
                // Other Radix packages go to a separate chunk (they're likely unused)
                return 'vendor-radix-unused';
              }
              // Icons
              if (id.includes('lucide-react')) {
                return 'vendor-icons';
              }
              // Other vendor code
              return 'vendor';
            }
          },
          // Optimize chunk names
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
        treeshake: {
          moduleSideEffects: false,
          propertyReadSideEffects: false,
          tryCatchDeoptimization: false,
        },
      },
      chunkSizeWarningLimit: 1000,
      target: 'esnext',
    },
    css: {
      devSourcemap: false,
    },
    optimizeDeps: {
      include: ['react', 'react-dom'],
      exclude: ['@radix-ui/react-alert-dialog', '@radix-ui/react-aspect-ratio', '@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-collapsible', '@radix-ui/react-context-menu', '@radix-ui/react-hover-card', '@radix-ui/react-menubar', '@radix-ui/react-navigation-menu', '@radix-ui/react-popover', '@radix-ui/react-progress', '@radix-ui/react-radio-group', '@radix-ui/react-scroll-area', '@radix-ui/react-select', '@radix-ui/react-separator', '@radix-ui/react-slider', '@radix-ui/react-switch', '@radix-ui/react-tabs', '@radix-ui/react-toggle', '@radix-ui/react-toggle-group'],
    },
  },

  compressHTML: true,
});
