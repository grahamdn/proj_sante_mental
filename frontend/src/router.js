import { createMemoryHistory, createRouter } from "vue-router";
import App from "./App.vue";
import Forum from "./pages/Forum.vue";
import Videos from "./pages/Videos.vue";
import About from "./pages/About.vue";

const routes = [
  { path: "/", component: App },
  { path: "/forum", component: Forum },
  { path: "/videos", component: Videos },
  { path: "/about", component: About },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
