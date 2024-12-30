<template>
  <div class="container">
    <h1 class="title">Gestion des Matériels</h1>

    <!-- Formulaire pour ajouter un nouveau matériel (visible uniquement pour les admins) -->
    <div v-if="user?.data?.role === 'admin'" class="box">
      <h2 class="subtitle">Ajouter un nouveau matériel</h2>
      <form @submit.prevent="addMaterial">
        <div class="field">
          <label class="label">Nom</label>
          <div class="control">
            <input
              class="input"
              type="text"
              v-model="newMaterial.nom"
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
              v-model="newMaterial.reference"
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
              v-model="newMaterial.version"
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
              v-model="newMaterial.etat"
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
              v-model="newMaterial.photo"
              placeholder="URL de la photo du matériel"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <button class="button is-primary" type="submit">
              Ajouter Matériel
            </button>
          </div>
        </div>
      </form>
    </div>

    <!-- Tableau des matériels -->
    <div v-if="materials.length > 0">
      <table class="table table-stripped is-fullwidth">
        <thead>
          <tr>
            <th>Index</th>
            <th>Nom</th>
            <th>Référence</th>
            <th>Version</th>
            <th>État</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(material, index) in materials" :key="'material-' + index">
            <td>{{ index + 1 }}</td>
            <td>{{ material.nom }}</td>
            <td>{{ material.reference }}</td>
            <td>{{ material.version }}</td>
            <td>{{ material.etat }}</td>
            <td>
              <img :src="material.photo" alt="Photo" style="max-width: 50px; max-height: 50px;" />
            </td>
            <td>
              <button
                v-if="user?.value"
                class="is-small"
                @click="viewDetails(material.id)"
              >
                👁️
              </button>
              <button
                v-if="user?.value"
                class="button is-small is-success"
                @click="reserveMaterial(material.id)"
              >
                📅
              </button>
              <button
                v-if="user?.data?.role === 'admin'"
                class="button is-small is-info"
                @click="editMaterial(material.id)"
              >
                ✏️
              </button>
              <button
                v-if="user?.data?.role === 'admin'"
                class="button is-small is-danger"
                @click="deleteMaterial(material.id)"
              >
                🗑️
              </button>
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
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useUserStore } from "@/stores/userStore";
import { db } from "../firebase";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Materiels",
  setup() {
    const userStore = useUserStore();
    const { user } = userStore;

    return {
      user,
    };
  },
  data() {
    return {
      materials: [],
      newMaterial: {
        nom: "",
        reference: "",
        version: "",
        etat: "",
        photo: "",
      },
    };
  },
  methods: {
    // Récupérer la liste des matériels
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

    // Ajouter un nouveau matériel
    async addMaterial() {
      if (
        !this.newMaterial.nom.trim() ||
        !this.newMaterial.reference.trim() ||
        !this.newMaterial.version.trim() ||
        !this.newMaterial.etat.trim() ||
        !this.newMaterial.photo.trim()
      ) {
        alert("Tous les champs sont obligatoires !");
        return;
      }

      try {
        const materialsCollection = collection(db, "Materiel");
        await addDoc(materialsCollection, {
          nom: this.newMaterial.nom,
          reference: this.newMaterial.reference,
          version: this.newMaterial.version,
          etat: this.newMaterial.etat,
          photo: this.newMaterial.photo,
        });

        alert("Matériel ajouté avec succès !");
        this.newMaterial = {
          nom: "",
          reference: "",
          version: "",
          etat: "",
          photo: "",
        }; // Réinitialise le formulaire
        this.fetchMaterials(); // Recharge la liste des matériels
      } catch (error) {
        console.error("Erreur lors de l'ajout du matériel :", error);
        alert(error.message);
      }
    },

    async reserveMaterial(id) {
      this.$router.push({ name: "ReserveMaterial", params: { id } });
    },

    // Supprimer un matériel
    async deleteMaterial(id) {
      try {
        const docRef = doc(db, "Materiel", id);
        await deleteDoc(docRef);

        alert("Matériel supprimé avec succès !");
        this.fetchMaterials(); // Recharge la liste des matériels
      } catch (error) {
        console.error("Erreur lors de la suppression du matériel :", error);
        alert(error.message);
      }
    },

    // Accéder aux détails d’un matériel
    viewDetails(id) {
      this.$router.push({ name: "ViewDetails", params: { id } });
    },

    // Éditer un matériel
    editMaterial(id) {
      this.$router.push({ name: "EditMaterial", params: { id } });
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
