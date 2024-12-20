<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <router-link to="/" class="navbar-item">Materiels</router-link>
        <router-link v-if="user?.data?.role == 'admin'" to="/manage-users" class="navbar-item">Utilisateurs</router-link>
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
import { ref, onMounted } from 'vue';
import { auth, db} from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

import { doc, getDoc} from "firebase/firestore";

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
    onMounted(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        user.value = {value: currentUser, data: null};

        try {
          const docRef = doc(db, "Utilisateurs", currentUser.uid);
          const data = await getDoc(docRef);

          if (data.exists()) {
            user.value.data = data.data();
          } else {
            user.value.data = null;
          }

        } catch (error) {
          console.log('Error getting user:', error);
        }

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
