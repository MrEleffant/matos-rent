<template>
    <div class="container">
      <h1 class="title">Modifier le Matériel</h1>
  
      <div v-if="material" class="box">
        <form @submit.prevent="updateMaterial">
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
            <label class="label">Référence</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="material.reference"
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
            <label class="label">Photo</label>
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
            <div class="control">
              <button class="button is-primary" type="submit">
                Modifier le Matériel
              </button>
            </div>
          </div>
        </form>
      </div>
  
      <div v-else>
        <p>Chargement des données du matériel...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { doc, getDoc, updateDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    name: "EditMaterial",
    data() {
      return {
        material: {
          nom: "",
          reference: "",
          version: "",
          etat: "",
          photo: "",
        },
      };
    },
    methods: {
      // Charger les données du matériel
      async fetchMaterial() {
        const id = this.$route.params.id; // Récupère l'ID depuis l'URL
        try {
          const docRef = doc(db, "Materiel", id);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            this.material = { id, ...docSnap.data() }; // Charge les données du matériel
          } else {
            alert("Le matériel demandé n'existe pas.");
            this.$router.push("/"); // Redirige si le matériel n'existe pas
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du matériel :", error);
          alert("Une erreur s'est produite lors du chargement des données.");
        }
      },
  
      // Mettre à jour le matériel
      async updateMaterial() {
        // Validation des champs
        if (
          !this.material.nom?.trim() ||
          !this.material.reference?.trim() ||
          !this.material.version?.trim() ||
          !this.material.etat?.trim() ||
          !this.material.photo?.trim()
        ) {
          alert("Tous les champs sont obligatoires !");
          return;
        }
  
        try {
          const docRef = doc(db, "Materiel", this.material.id);
          await updateDoc(docRef, {
            nom: this.material.nom,
            reference: this.material.reference,
            version: this.material.version,
            etat: this.material.etat,
            photo: this.material.photo,
          });
  
          alert("Matériel mis à jour avec succès !");
          this.$router.push("/"); // Redirige vers la page principale après la mise à jour
        } catch (error) {
          console.error("Erreur lors de la mise à jour du matériel :", error);
          alert("Une erreur s'est produite lors de la mise à jour.");
        }
      },
    },
    async mounted() {
      await this.fetchMaterial(); // Charge les données du matériel au montage
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  