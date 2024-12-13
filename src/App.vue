<template>
  <div id="app">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">

        <router-link to="/" class="navbar-item">Accueil</router-link>
        <router-link to="/manage-material" class="navbar-item">Gérer Matériel</router-link>
        <router-link to="/manage-user" class="navbar-item">Gérer les utilisateurs</router-link>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
/* Importation des styles Bulma */
@import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";

nav {
  margin-bottom: 20px;
}
</style>
