import { createRouter, createWebHistory } from "vue-router";
// import AddMessage from "../components/AddMessage.vue";
import ViewMessages from "../components/ViewMessages.vue";
import ManageMaterial from "../components/ManageMaterial.vue";


const routes = [
  { path: "/", component: ManageMaterial },
  { path: "/manage-material", component: ManageMaterial },
  { path: "/view", component: ViewMessages },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
