<template>
    <div class="container">
      <h1 class="title">Gérer Matériel</h1>
  
      <!-- Formulaire pour ajouter un matériel -->
      <div class="box">
        <form @submit.prevent="addMaterial">
          <div class="field">
            <label class="label">État</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.etat"
                placeholder="État du matériel"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.nom"
                placeholder="Nom du matériel"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Photo (URL)</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.photo"
                placeholder="URL de la photo"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Référence</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.ref"
                placeholder="Référence du matériel"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Version</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.version"
                placeholder="Version du matériel"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">Ajouter Matériel</button>
            </div>
          </div>
        </form>
      </div>
  
      <!-- Tableau des matériels -->
      <div class="table-container">
        <table class="table is-striped is-hoverable">
          <thead>
            <tr>
              <th>ID</th>
              <th>État</th>
              <th>Nom</th>
              <th>Photo</th>
              <th>Référence</th>
              <th>Version</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in materials" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.etat }}</td>
              <td>{{ item.nom }}</td>
              <td>
                <img :src="item.photo" alt="Photo" width="50" height="50" />
              </td>
              <td>{{ item.ref }}</td>
              <td>{{ item.version }}</td>
              <td>
                <button class="button is-danger is-small" @click="deleteMaterial(item.id)">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    data() {
      return {
        material: {
          etat: "",
          nom: "",
          photo: "",
          ref: "",
          version: "",
        },
        materials: [], // Liste des matériels
      };
    },
    methods: {
      async addMaterial() {
        // Vérification des champs
        if (!this.material.nom.trim()) {
          alert("Le champ 'Nom' est obligatoire !");
          return;
        }
  
        try {
          // Ajouter un document dans la collection "Materiel"
          await addDoc(collection(db, "Materiel"), {
            etat: this.material.etat,
            nom: this.material.nom,
            photo: this.material.photo,
            ref: this.material.ref,
            version: this.material.version,
          });
  
          // Réinitialiser le formulaire
          this.material = {
            etat: "",
            nom: "",
            photo: "",
            ref: "",
            version: "",
          };
  
          alert("Matériel ajouté avec succès !");
        } catch (error) {
          console.error("Erreur lors de l'ajout du matériel :", error);
        }
      },
  
      async deleteMaterial(id) {
        try {
          const docRef = doc(db, "Materiel", id);
          await deleteDoc(docRef);
          alert("Matériel supprimé avec succès !");
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      },
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
  </style>
  