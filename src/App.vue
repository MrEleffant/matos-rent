<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <router-link to="/" class="navbar-item">Materiels</router-link>
        <router-link to="/manage-users" class="navbar-item">Utilisateurs</router-link>
      </div>

      <div class="navbar-menu">
        <div class="navbar-end">
          <div v-if="user">
            <span class="navbar-item">
              Connecté en tant que <strong>{{ user.name }}</strong>
            </span>
            <button @click="logout" class="button is-light">Déconnexion</button>
          </div>
          
          <div v-else>
            <router-link to="/auth" class="navbar-item">Connexion</router-link>
          </div>
        </div>
      </div>

    </nav>
    <router-view />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  name: "App",
  setup() {
    const user = ref(null);

    // Déconnexion de l'utilisateur
    const logout = async () => {
      try {
        await signOut(auth);
      } catch (error) {
        console.error('Erreur lors de la déconnexion :', error);
      }
    };

    // Écouter l'état de l'utilisateur connecté
    onMounted(() => {
      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser;
      });
    });

    return {
      user,
      logout,
    };
  },
};
</script>

<style>
/* Importation des styles Bulma */
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

nav {
  margin-bottom: 20px;
}
</style>
