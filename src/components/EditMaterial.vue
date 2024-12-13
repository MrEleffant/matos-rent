<template>
    <div class="container">
      <h1 class="title">Modifier Matériel</h1>
      <div class="box">
        <form @submit.prevent="updateMaterial">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input class="input" v-model="material.nom" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Référence</label>
            <div class="control">
              <input class="input" v-model="material.ref" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Version</label>
            <div class="control">
              <input class="input" v-model="material.version" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">État</label>
            <div class="control">
              <input class="input" v-model="material.etat" type="text" />
            </div>
          </div>
          <div class="field">
            <label class="label">Photo (URL)</label>
            <div class="control">
              <input class="input" v-model="material.photo" type="text" />
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
    name: "EditMaterial",
    data() {
      return {
        material: {
          nom: "",
          ref: "",
          version: "",
          etat: "",
          photo: "",
        },
      };
    },
    async mounted() {
      const docRef = doc(db, "Materiel", this.$route.params.id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        this.material = { ...docSnap.data() };
      } else {
        alert("Matériel introuvable !");
      }
    },
    methods: {
      async updateMaterial() {
        const docRef = doc(db, "Materiel", this.$route.params.id);
        await updateDoc(docRef, this.material);
        alert("Matériel mis à jour !");
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
  