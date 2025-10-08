import { defineConfig } from "vite"
import { fileURLToPath, URL } from "url"
import { viteStaticCopy } from "vite-plugin-static-copy"

const isProduction = process.env.NODE_ENV === "production"

let buildExtra = {}

const pluginExtra = []
if (isProduction) {
  buildExtra = {
    ...buildExtra,
    cssCodeSplit: false,
    assetsInlineLimit: 100000000
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "json-control/*",
          dest: "omnis_vite_control"
        }
      ]
    }),
    ...pluginExtra
  ],
  build: {
    ...buildExtra,
    sourcemap: true,
    rollupOptions: {
      input: {
        ctrl_omnis_vite_control: fileURLToPath(new URL("./src/json_control_main.ts", import.meta.url))
      },
      output: {
        format: "umd", // Must be UMD to prevent multiple dependencies from colliding when imported into Omnis
        manualChunks: false,
        inlineDynamicImports: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == "style.css") return "ctrl_omnis_vite_control.css"
          return assetInfo.name
        },
        entryFileNames: "[name].js"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
