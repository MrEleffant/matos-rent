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
              v-model="newUser.nom"
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
              v-model="newUser.prenom"
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
              v-model="newUser.mail"
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
              v-model="newUser.matricule"
              placeholder="Matricule de l'utilisateur"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Mot de passe</label>
          <div class="control">
            <input
              class="input"
              type="password"
              v-model="newUser.password"
              placeholder="Mot de passe de l'utilisateur"
            />
          </div>
        </div>
        <div class="field">
          <label class="label">Rôle</label>
          <div class="control">
            <label class="radio">
              <input type="radio" v-model="newUser.role" value="admin" />
              Admin
            </label>
            <label class="radio">
              <input type="radio" v-model="newUser.role" value="emprunteur" />
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
              <router-link
              :to="{ name: 'EditUser', params: { id: user.id } }"
              class="button is-info is-small"
              >
              ✏️
            </router-link>
            <button
              class="button is-danger is-small"
              @click="deleteUser(user.id)"
            >
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
import { collection, doc, onSnapshot, deleteDoc, setDoc } from "firebase/firestore";
import { useUserStore } from '@/stores/userStore';
import { db } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      newUser: {
        nom: "",
        prenom: "",
        mail: "",
        matricule: "",
        password: "",
        role: "emprunteur",
      },
      users: [],
    };
  },
  computed: {
    currentUser() {
      const userStore = useUserStore();
      return userStore.user;
    },
  },
  methods: {
    async addUser() {
      if (!this.newUser.nom.trim() || !this.newUser.prenom.trim()) {
        alert("Les champs 'Nom' et 'Prénom' sont obligatoires !");
        return;
      }

      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.newUser.mail,
          this.newUser.password
        );

        const uid = userCredential.user.uid;

        await setDoc(doc(db, "Utilisateurs", uid), {
          nom: this.newUser.nom,
          prenom: this.newUser.prenom,
          mail: this.newUser.mail,
          matricule: this.newUser.matricule,
          role: this.newUser.role,
        });

        this.newUser = {
          nom: "",
          prenom: "",
          mail: "",
          matricule: "",
          password: "",
          role: "emprunteur",
        };
        alert("Utilisateur ajouté avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", error);
        alert(error.message);
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
