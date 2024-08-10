import { defineConfig, ConfigEnv, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    define: {
      "process.env": {
        VITE_API_URL: env.VITE_API_URL,
      },
    },
    server: {
      host: true,
    },
  });
};
