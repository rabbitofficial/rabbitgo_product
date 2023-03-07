import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

import fs from "fs";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletUIResolver } from "unplugin-vue-components/resolvers";

const postCssPxToRem = require("postcss-pxtorem");

//import basicSsl from '@vitejs/plugin-basic-ssl'
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // https: {
    //   key: fs.readFileSync("./ssl/key2.pem"),
    //   cert: fs.readFileSync("./ssl/cert2.pem"),
    // },
    port: 5174,
    host: "0.0.0.0",
    hmr: true,
    proxy: {
      "^/api": {
        target: "http://192.168.2.87:5858/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    components({
      resolvers: [VarletUIResolver()],
    }),
    autoImport({
      resolvers: [VarletUIResolver({ autoImport: true })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 39, // 1rem的大小
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
        }),
      ],
    },
  },
});
