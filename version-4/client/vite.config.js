// vite.config.js
 import { defineConfig } from "vite";
 import react from "@vitejs/plugin-react";

 // <https://vite.dev/config/>
 export default defineConfig({
   server: {
     proxy: {
       "/api": {
        // Proxy API requests from React to our local Express server
         target: "https://countries-app-znhd.onrender.com",
         changeOrigin: true,
         secure: false,
       },
     },
   },
   plugins: [react()],
 });
