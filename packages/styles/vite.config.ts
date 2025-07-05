// import { defineConfig } from 'vite'
// import { resolve } from 'path'

// export default defineConfig({
//   build: {
//     lib: {
//       entry: resolve(__dirname, 'src/index.ts'),
//       name: 'styles',
//       fileName: 'design',
//       formats: ['es']
//     },
//     rollupOptions: {
//       output: {
//         assetFileNames: 'design.css'
//       }
//     },
//     cssCodeSplit: false
//   }
// })
export { defineConfig } from '@internal/vite-config'