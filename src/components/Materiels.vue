<template>
    <div class="container">
      <h1 class="title">Gestion des Matériels</h1>
  
      <div v-if="materials.length > 0">
        <table class="table table-stripped is-fullwidth">
          <thead>
            <tr>
              <th>Index</th>
              <th>Nom</th>
              <th>Version</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(material, index) in materials" :key="'material-' + index">
              <td>{{ index + 1 }}</td>
              <td>{{ material.nom }}</td>
              <td>{{ material.version }}</td>
              <td>
                <button class="is-small" @click="viewDetails(material.id)">👁️</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Chargement des matériels...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Materiels",
    data() {
      return {
        materials: [],
      };
    },
    methods: {
      async fetchMaterials() {
        try {
          const materialsCollection = collection(db, "Materiel");
          const snapshot = await getDocs(materialsCollection);
  
          this.materials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log("Matériels récupérés :", this.materials);
        } catch (error) {
          console.error("Erreur lors de la récupération des matériels :", error);
        }
      },
      viewDetails(id) {
        this.$router.push({ name: "ViewDetails", params: { id } });
      },
    },
    async mounted() {
      await this.fetchMaterials();
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  