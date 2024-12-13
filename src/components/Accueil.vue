<template>
    <div class="container">
      <h1 class="title">Liste des Matériels</h1>
  
      <!-- Tableau des matériels -->
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Référence</th>
              <th>Version</th>
              <th>État</th>
              <th>Photo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in materials" :key="item.id">
              <td>{{ item.nom }}</td>
              <td>{{ item.ref }}</td>
              <td>{{ item.version }}</td>
              <td>{{ item.etat }}</td>
              <td>
                <img :src="item.photo" alt="Photo" width="50" height="50" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, onSnapshot } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Accueil",
    data() {
      return {
        materials: [], // Liste des matériels
      };
    },
    mounted() {
      // Écoute des mises à jour en temps réel
      const materialsCollection = collection(db, "Materiel");
  
      onSnapshot(materialsCollection, (snapshot) => {
        this.materials = snapshot.docs.map((doc) => ({
          id: doc.id, // L'identifiant unique du document
          ...doc.data(), // Les données du document
        }));
      });
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  
  .table-container {
    margin-top: 40px;
  }
  
  /* Étendre le tableau sur toute la largeur */
  .table.is-fullwidth {
    width: 100%;
  }
  </style>
  