import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';

export const useUserStore = defineStore('user', () => {
  const user = reactive({ value: null, data: null });

  // Déconnexion de l'utilisateur
  const logout = async () => {
    try {
      await signOut(auth);
      user.value = null; // Réinitialise l'utilisateur
      user.data = null; // Réinitialise les données
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
    }
  };

  // Écouter l'état de l'utilisateur connecté
  const fetchUser = () => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        user.value = currentUser;

        try {
          const docRef = doc(db, 'Utilisateurs', currentUser.uid);

          // Écoute en temps réel des données Firestore
          onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
              user.data = snapshot.data();
            } else {
              user.data = null;
            }
          });
        } catch (error) {
          console.error('Erreur lors de la récupération des données utilisateur :', error);
        }
      } else {
        user.value = null; // Aucun utilisateur connecté
        user.data = null;
      }
    });
  };

  // Appeler fetchUser lors de l'initialisation de la store
  fetchUser();

  return {
    user,
    logout,
    fetchUser,
  };
});
