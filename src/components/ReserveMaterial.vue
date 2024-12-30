<template>
    <div class="container">
      <h1 class="title">Réserver le Matériel</h1>
      <div v-if="material" class="box">
        <h2 class="subtitle">{{ material.nom }}</h2>
        <form @submit.prevent="makeReservation">
          <div class="field">
            <label class="label">Date de début</label>
            <div class="control">
              <input
                class="input"
                type="date"
                v-model="reservation.startDate"
                :min="minDate"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Date de fin</label>
            <div class="control">
              <input
                class="input"
                type="date"
                v-model="reservation.endDate"
                :min="reservation.startDate"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-primary" type="submit">
                Réserver
              </button>
            </div>
          </div>
        </form>
      </div>
  
      <div v-else>
        <p>Chargement des informations du matériel...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { doc, getDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
  import { db } from "../firebase";
  import { useUserStore } from "@/stores/userStore";
  
  export default {
    name: "ReserveMaterial",
    data() {
      return {
        material: null,
        reservation: {
          startDate: "",
          endDate: "",
        },
        minDate: new Date().toISOString().split("T")[0], // Date du jour au format YYYY-MM-DD
      };
    },
    methods: {
      async fetchMaterial() {
        const id = this.$route.params.id;
        try {
          const docRef = doc(db, "Materiel", id);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            this.material = { id, ...docSnap.data() };
          } else {
            alert("Le matériel n'existe pas.");
            this.$router.push("/");
          }
        } catch (error) {
          console.error("Erreur lors de la récupération du matériel :", error);
        }
      },
      async makeReservation() {
        if (!this.reservation.startDate || !this.reservation.endDate) {
          alert("Les dates sont obligatoires.");
          return;
        }
  
        try {
          const reservationsCollection = collection(db, "Reservations");
  
          // Vérifier la disponibilité
          const q = query(
            reservationsCollection,
            where("materialId", "==", this.material.id),
            where("startDate", "<=", this.reservation.endDate),
            where("endDate", ">=", this.reservation.startDate)
          );
          const querySnapshot = await getDocs(q);
  
          if (!querySnapshot.empty) {
            alert("Le matériel n'est pas disponible aux dates choisies.");
            return;
          }
  
          // Ajouter la réservation
          const userStore = useUserStore();
          await addDoc(reservationsCollection, {
            userId: userStore.user.value.uid,
            materialId: this.material.id,
            startDate: this.reservation.startDate,
            endDate: this.reservation.endDate,
          });
  
          alert("Réservation effectuée avec succès !");
          this.$router.push("/");
        } catch (error) {
          console.error("Erreur lors de la réservation :", error);
        }
      },
    },
    async mounted() {
      await this.fetchMaterial();
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  