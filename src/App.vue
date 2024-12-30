<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">Materiels</router-link>
        <router-link v-if="user?.data?.role === 'admin'" to="/manage-reservations" class="navbar-item">Réservations</router-link>
        <router-link v-if="user?.data?.role === 'admin'" to="/manage-users" class="navbar-item">Utilisateurs</router-link>
        
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div v-if="user?.value">
            <span class="navbar-item">
              <strong>{{ user?.data?.prenom }}</strong> en tant que <strong>{{ user?.data?.role }}</strong>
              <button @click="logout" class="button is-light">Déconnexion</button>
            </span>
          </div>
          
          <div v-else>
            <span class="navbar-item">
              <router-link to="/auth" class="navbar-item button is-light">Connexion</router-link>
            </span>
          </div>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import { useUserStore } from '@/stores/userStore';

export default {
  name: "App",
  setup() {
    const userStore = useUserStore();
    const { user, logout } = userStore;

    return {
      user,
      logout,
    };
  },
};
</script>

<style>
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

nav {
  margin-bottom: 20px;
}
</style>
