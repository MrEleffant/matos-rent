import { createRouter, createWebHistory } from "vue-router";
import AddMessage from "../components/AddMessage.vue";
import ViewMessages from "../components/ViewMessages.vue";

const routes = [
  { path: "/", component: AddMessage },
  { path: "/view", component: ViewMessages },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
