import { createRouter, createWebHistory } from "vue-router";
import Materiels from "@/components/Materiels.vue";
import ViewDetails from "@/components/ViewDetails.vue";
import Auth from "@/components/Auth.vue";
import ManageUsers from "@/components/ManageUsers.vue";
import EditUser from "@/components/EditUser.vue";
import EditMaterial from "@/components/EditMaterial.vue";
import ReserveMaterial from "@/components/ReserveMaterial.vue";
import ManageReservations from "@/components/ManageReservations.vue";


const routes = [
  {
    path: "/",
    name: "Materiels",
    component: Materiels,
  },
  {
    path: "/edit-material/:id",
    name: "EditMaterial",
    component: EditMaterial,
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
  {
    path: "/reserve-material/:id",
    name: "ReserveMaterial",
    component: ReserveMaterial,
  },
  {
    path: "/manage-reservations",
    name: "ManageReservations",
    component: ManageReservations,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
