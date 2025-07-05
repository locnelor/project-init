import { defineConfig, mergeConfig, type UserConfig } from 'vite';
import vuePlugin from "@vitejs/plugin-vue"
export const defineApplicationConfig = (userConfig: UserConfig = {}) => {
  const config = defineConfig({
    plugins: [vuePlugin()]
  })
  return mergeConfig(config, userConfig)
}