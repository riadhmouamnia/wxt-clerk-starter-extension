import { defineConfig } from "wxt";
import react from "@vitejs/plugin-react";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: {
    permissions: ["storage", "cookies"],
    host_permissions: ["http://localhost:3000/*"],
    action: {},
    // name: "__MSG_extName__",
    // description: "__MSG_extDescription__",
    // default_locale: "en",
  },
  // modules: ["@wxt-dev/module-react"],
  vite: () => ({
    plugins: [react()],
  }),
  runner: {
    startUrls: ["https://google.com"],
  },
});
