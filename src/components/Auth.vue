<template>
  <div class="container">
    <section class="section">
      <div class="columns is-centered">
        <div class="column is-half">
          <h1 class="title has-text-centered">Authentication</h1>
          <form @submit.prevent="login" class="box">
            <div class="field">
              <label class="label" for="email">Email:</label>
              <div class="control has-icons-left">
                <input 
                  class="input" 
                  type="email" 
                  id="email" 
                  v-model="email"
                  required 
                  placeholder="Enter your email" />
                <span class="icon is-small is-left">
                  <i class="fas fa-envelope"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <label class="label" for="password">Password:</label>
              <div class="control has-icons-left">
                <input 
                  class="input" 
                  type="password" 
                  id="password" 
                  v-model="password" 
                  required 
                  placeholder="Enter your password" />
                <span class="icon is-small is-left">
                  <i class="fas fa-lock"></i>
                </span>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth">Login</button>
              </div>
            </div>
          </form>
          <p v-if="user" class="notification is-success">Logged in as: {{ user.email }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref } from 'vue';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase.js';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Auth',
  setup() {
    const email = ref('');
    const password = ref('');
    const user = ref(null);

    const login = async () => {
      try {
        await signInWithEmailAndPassword(auth, email.value, password.value);
      } catch (error) {
        console.error('Error logging in:', error);
      }
    };

    onAuthStateChanged(auth, async (currentUser) => {
      user.value = currentUser;
    });

    return {
      email,
      password,
      user,
      login,
    }
  },
};
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.4/css/bulma.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
</style>
