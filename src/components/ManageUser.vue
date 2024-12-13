<template>
    <div class="container">
      <h1 class="title">Gérer Utilisateurs</h1>
  
      <!-- Formulaire pour ajouter un utilisateur -->
      <div class="box">
        <form @submit.prevent="addUser">
          <div class="field">
            <label class="label">Nom</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="user.nom"
                placeholder="Nom de l'utilisateur"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Prénom</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="user.prenom"
                placeholder="Prénom de l'utilisateur"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                class="input"
                type="email"
                v-model="user.mail"
                placeholder="Email de l'utilisateur"
              />
            </div>
          </div>
          <div class="field">
            <label class="label">Matricule</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="user.matricule"
                placeholder="Matricule de l'utilisateur"
              />
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
              <button class="button is-primary" type="submit">Ajouter Utilisateur</button>
            </div>
          </div>
        </form>
      </div>
  
      <!-- Tableau des utilisateurs -->
      <div class="table-container">
        <table class="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Matricule</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.nom }}</td>
              <td>{{ user.prenom }}</td>
              <td>{{ user.mail }}</td>
              <td>{{ user.matricule }}</td>
              <td>{{ user.role }}</td>
              <td>
                <button
                  class="button is-danger is-small"
                  @click="deleteUser(user.id)"
                >
                  🗑️
                </button>
                <router-link
                  :to="{ name: 'EditUser', params: { id: user.id } }"
                  class="button is-info is-small"
                >
                  ✏️
                </router-link>
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
        user: {
          nom: "",
          prenom: "",
          mail: "",
          matricule: "",
          role: "emprunteur",
        },
        users: [],
      };
    },
    methods: {
      async addUser() {
        if (!this.user.nom.trim() || !this.user.prenom.trim()) {
          alert("Les champs 'Nom' et 'Prénom' sont obligatoires !");
          return;
        }
  
        try {
          await addDoc(collection(db, "Utilisateurs"), {
            nom: this.user.nom,
            prenom: this.user.prenom,
            mail: this.user.mail,
            matricule: this.user.matricule,
            role: this.user.role,
          });
          this.user = {
            nom: "",
            prenom: "",
            mail: "",
            matricule: "",
            role: "emprunteur",
          };
          alert("Utilisateur ajouté avec succès !");
        } catch (error) {
          console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        }
      },
  
      async deleteUser(id) {
        try {
          const docRef = doc(db, "Utilisateurs", id);
          await deleteDoc(docRef);
          alert("Utilisateur supprimé avec succès !");
        } catch (error) {
          console.error("Erreur lors de la suppression :", error);
        }
      },
    },
    mounted() {
      const usersCollection = collection(db, "Utilisateurs");
      onSnapshot(usersCollection, (snapshot) => {
        this.users = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
  .table.is-fullwidth {
    width: 100%;
  }
  </style>
  