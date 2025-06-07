// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "file:///run/media/juliano/6EF626C4F6268C81/Users/julia/Documents/epub-reader/reader_frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///run/media/juliano/6EF626C4F6268C81/Users/julia/Documents/epub-reader/reader_frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///run/media/juliano/6EF626C4F6268C81/Users/julia/Documents/epub-reader/reader_frontend/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import vueDevTools from "file:///run/media/juliano/6EF626C4F6268C81/Users/julia/Documents/epub-reader/reader_frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///run/media/juliano/6EF626C4F6268C81/Users/julia/Documents/epub-reader/reader_frontend/vite.config.js";
var vite_config_default = ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      vueDevTools()
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE,
          // <- 這裡是正確的遠端 URL
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, "")
        }
      }
    }
  });
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcnVuL21lZGlhL2p1bGlhbm8vNkVGNjI2QzRGNjI2OEM4MS9Vc2Vycy9qdWxpYS9Eb2N1bWVudHMvZXB1Yi1yZWFkZXIvcmVhZGVyX2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcnVuL21lZGlhL2p1bGlhbm8vNkVGNjI2QzRGNjI2OEM4MS9Vc2Vycy9qdWxpYS9Eb2N1bWVudHMvZXB1Yi1yZWFkZXIvcmVhZGVyX2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ydW4vbWVkaWEvanVsaWFuby82RUY2MjZDNEY2MjY4QzgxL1VzZXJzL2p1bGlhL0RvY3VtZW50cy9lcHViLXJlYWRlci9yZWFkZXJfZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfSkgPT4ge1xuICAvLyBcdThGMDlcdTUxNjUgLmVudiguZGV2ZWxvcG1lbnQvLnByb2R1Y3Rpb24pIFx1ODhFMVx1NjI0MFx1NjcwOVx1OEI4QVx1NjU3OFx1RkYwQ1x1N0IyQ1x1NEUwOVx1NTAwQlx1NTNDM1x1NjU3OFx1NzU1OVx1N0E3QVx1NjI0RFx1NjcwM1x1OEI4MFx1NTIzMCBWSVRFXypcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpLCAnJylcblxuICByZXR1cm4gZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICB2dWUoKSxcbiAgICAgIHZ1ZUpzeCgpLFxuICAgICAgdnVlRGV2VG9vbHMoKSxcbiAgICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6IGVudi5WSVRFX0FQSV9CQVNFLCAgIC8vIDwtIFx1OTAxOVx1ODhFMVx1NjYyRlx1NkI2M1x1NzhCQVx1NzY4NFx1OTA2MFx1N0FFRiBVUkxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgcmV3cml0ZTogcGF0aCA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSlcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWIsU0FBUyxlQUFlLFdBQVc7QUFDcGQsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGlCQUFpQjtBQUowUCxJQUFNLDJDQUEyQztBQU1uVSxJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQU07QUFFM0IsUUFBTSxNQUFNLFFBQVEsTUFBTSxRQUFRLElBQUksR0FBRyxFQUFFO0FBRTNDLFNBQU8sYUFBYTtBQUFBLElBQ2xCLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLE9BQU87QUFBQSxNQUNQLFlBQVk7QUFBQSxJQUNkO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUSxJQUFJO0FBQUE7QUFBQSxVQUNaLGNBQWM7QUFBQSxVQUNkLFNBQVMsVUFBUSxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
