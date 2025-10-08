import { defineConfig } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"
import { createHtmlPlugin } from "vite-plugin-html"
import multiple from "vite-plugin-multiple"
import { fileURLToPath, URL } from "url"

const isProduction = process.env.NODE_ENV === "production"
const isHistoire = process.env.HISTOIRE != null ? process.env.HISTOIRE : false

let buildExtra = {}
const pluginExtra = []
if (isProduction && !isHistoire) {
  buildExtra = {
    ...buildExtra,
    rollupOptions: {
      input: {
        "omnis-vite-control": fileURLToPath(new URL("./omnis-vite-control.html", import.meta.url))
      }
    },
    cssCodeSplit: false,
    assetsInlineLimit: 100000000
  }
  pluginExtra.push(viteSingleFile({ removeViteModuleLoader: true }))
  pluginExtra.push(createHtmlPlugin())
  pluginExtra.push(
    multiple([
      {
        name: "ctrl_omnis_vite_control",
        config: "vite.json-control.config.ts"
      }
    ])
  )
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [...pluginExtra],
  build: {
    sourcemap: false,
    ...buildExtra
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
