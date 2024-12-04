<template>
  <div id="app">
    <nav>
      <router-link to="/">Ajouter un Message</router-link> |
      <router-link to="/view">Voir les Messages</router-link>
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
nav {
  margin-bottom: 20px;
}
</style>
