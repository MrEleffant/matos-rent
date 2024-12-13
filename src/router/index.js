import { createRouter, createWebHistory } from "vue-router";
// import AddMessage from "../components/AddMessage.vue";
import Accueil from "@/components/Accueil.vue";
import ManageMaterial from "@/components/ManageMaterial.vue";
import ManageUser from "@/components/ManageUser.vue";
import EditUser from "@/components/EditUser.vue";
import EditMaterial from "@/components/EditMaterial.vue";




const routes = [
  { path: "/", component: Accueil },
  { path: "/manage-material", component: ManageMaterial },
  { path: "/manage-user", component: ManageUser },
  { path: "/edit/:id", name: "EditUser", component: EditUser },
  { path: "/edit-material/:id", name: "EditMaterial", component: EditMaterial },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
