<template>
    <div>
      <h1>Ajouter un Message</h1>
      <form @submit.prevent="addMessage">
        <input
          type="text"
          v-model="message"
          placeholder="Écrivez un message"
        />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  import { addDoc, collection } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    data() {
      return {
        message: "",
      };
    },
    methods: {
      async addMessage() {
        if (!this.message.trim()) return alert("Le champ message est vide !");
        try {
          await addDoc(collection(db, "test"), {
            str: this.message
          });
          this.message = "";
          alert("Message ajouté avec succès !");
        } catch (error) {
          console.error("Erreur lors de l'ajout :", error);
        }
      },
    },
  };
  </script>
  