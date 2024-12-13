import { createRouter, createWebHistory } from "vue-router";
import Materiels from "@/components/Materiels.vue";
import ViewDetails from "@/components/ViewDetails.vue";
import Auth from "@/components/Auth.vue";
import ManageUsers from "@/components/ManageUsers.vue";
import EditUser from "@/components/EditUser.vue";


const routes = [
  {
    path: "/",
    name: "Materiels",
    component: Materiels,
  },
  {
    path: "/details/:id",
    name: "ViewDetails",
    component: ViewDetails,
  },
  {
    path: "/manage-users",
    name: "ManageUsers",
    component: ManageUsers,
  },
  {
    path: "/edit-user/:id",
    name: "EditUser",
    component: EditUser,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
