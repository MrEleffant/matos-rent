<template>
  <div>
    <h1>Messages</h1>
    <ul>
      <li v-for="msg in messages" :key="msg.id">{{ msg.str }}</li>
    </ul>
  </div>
</template>

<script>
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default {
  data() {
    return {
      messages: [], // Liste des messages récupérés
    };
  },
  mounted() {
    // Référence à la collection "test"
    const messagesCollection = collection(db, "test");

    // Écoute les changements en temps réel dans la collection
    onSnapshot(messagesCollection, (snapshot) => {
      this.messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    });
  },
};
</script>
