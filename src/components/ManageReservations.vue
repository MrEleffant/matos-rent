<template>
    <div class="container">
      <h1 class="title">Gestion des Réservations</h1>
      <div v-if="reservations.length > 0" class="box">
        <table class="table is-fullwidth">
          <thead>
            <tr>
              <th>Utilisateur</th>
              <th>Matériel</th>
              <th>Date de début</th>
              <th>Date de fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="reservation in reservations" :key="reservation.id">
              <td>{{ reservation.user?.nom }} {{ reservation.user?.prenom }}</td>
              <td>{{ reservation.material?.nom }}</td>
              <td>{{ reservation.startDate }}</td>
              <td>{{ reservation.endDate }}</td>
              <td>
                <button class="button is-small is-danger" @click="deleteReservation(reservation.id)">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Aucune réservation disponible.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { collection, getDocs, deleteDoc, doc, getDoc } from "firebase/firestore";
  import { db } from "../firebase";
  
  export default {
    name: "ManageReservations",
    data() {
      return {
        reservations: [],
      };
    },
    methods: {
      // Récupérer les détails des utilisateurs et des matériels
      async enrichReservations(reservations) {
        const enrichedReservations = [];
        for (const reservation of reservations) {
          try {
            const userDoc = await getDoc(doc(db, "Utilisateurs", reservation.userId));
            const materialDoc = await getDoc(doc(db, "Materiel", reservation.materialId));
  
            enrichedReservations.push({
              ...reservation,
              user: userDoc.exists() ? userDoc.data() : null,
              material: materialDoc.exists() ? materialDoc.data() : null,
            });
          } catch (error) {
            console.error("Erreur lors de l'enrichissement des réservations :", error);
          }
        }
        return enrichedReservations;
      },
  
      // Récupérer toutes les réservations
      async fetchReservations() {
        try {
          const reservationsCollection = collection(db, "Reservations");
          const snapshot = await getDocs(reservationsCollection);
  
          const reservations = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          this.reservations = await this.enrichReservations(reservations);
        } catch (error) {
          console.error("Erreur lors de la récupération des réservations :", error);
        }
      },
  
      // Supprimer une réservation
      async deleteReservation(id) {
        try {
          const docRef = doc(db, "Reservations", id);
          await deleteDoc(docRef);
          alert("Réservation supprimée !");
          this.fetchReservations();
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      },
    },
    async mounted() {
      await this.fetchReservations();
    },
  };
  </script>
  
  <style>
  .container {
    margin-top: 20px;
  }
  </style>
  