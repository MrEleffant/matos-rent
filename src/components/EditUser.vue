<template>
    <div class="container">
      <h1 class="title">Modifier Utilisateur</h1>
      <div class="box">
        <form @submit.prevent="updateUser">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input class="input" v-model="user.nom" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Prénom</label>
            <div class="control">
              <input class="input" v-model="user.prenom" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" v-model="user.mail" type="email" />
            </div>
          </div>
          <div class="field">
            <label class="label">Matricule</label>
            <div class="control">
              <input class="input" v-model="user.matricule" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Rôle</label>
            <div class="control">
              <label class="radio">
                <input type="radio" v-model="user.role" value="admin" />
                Admin
              </label>
              <label class="radio">
                <input type="radio" v-model="user.role" value="emprunteur" />
                Emprunteur
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Mettre à jour</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    data() {
      return {
        user: {
          nom: "",
          prenom: "",
          mail: "",
          matricule: "",
          role: "emprunteur",
        },
      };
    },
    async mounted() {
      const docRef = doc(db, "Utilisateurs", this.$route.params.id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        this.user = { ...docSnap.data() };
      } else {
        alert("Utilisateur introuvable !");
      }
    },
    methods: {
      async updateUser() {
        const docRef = doc(db, "Utilisateurs", this.$route.params.id);
        await updateDoc(docRef, this.user);
        alert("Utilisateur mis à jour !");
        this.$router.push("/");
      },
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  