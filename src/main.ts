import { createApp } from "vue";

// 重置样式
import "@unocss/reset/normalize.css";
import "@unocss/reset/tailwind.css";

// 自定义样式
import "@/assets/style/style.css";

import "virtual:uno.css";
import App from "./App.vue";

createApp(App).mount("#app");
