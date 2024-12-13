<template>
    <div class="container">
      <h1 class="title">Détails du Matériel</h1>
      <div v-if="material">
        <p><strong>Nom :</strong> {{ material.nom }}</p>
        <p><strong>Référence :</strong> {{ material.ref }}</p>
        <p><strong>Version :</strong> {{ material.version }}</p>
        <p><strong>État :</strong> {{ material.etat }}</p>
        <p><strong>Photo :</strong></p>
        <img :src="material.photo" alt="Photo" width="200" />
      </div>
      <div v-else>
        <p>Chargement des détails du matériel...</p>
      </div>
      <button class="button is-primary" @click="goBack">Retour</button>
    </div>
  </template>
  
  <script>
  import { doc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    name: "ViewDetails",
    data() {
      return {
        material: null, // Détails du matériel
      };
    },
    methods: {
      async fetchMaterialDetails() {
        const id = this.$route.params.id;
        try {
          const docRef = doc(db, "Materiel", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            this.material = docSnap.data();
          } else {
            console.error("Matériel introuvable !");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des détails :", error);
        }
      },
      goBack() {
        this.$router.push({ name: "Materiels" });
      },
    },
    mounted() {
      this.fetchMaterialDetails();
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  