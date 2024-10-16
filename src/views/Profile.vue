<template>
  <div class="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Profil Utilisateur</h1>
    <div v-if="currentUser" class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center mb-4">
        <img :src="currentUser.photoURL || 'https://via.placeholder.com/100'" alt="Photo de profil" class="w-24 h-24 rounded-full mr-6 object-cover">
        <div>
          <h2 class="text-2xl font-semibold">{{ currentUser.displayName || 'Anonyme' }}</h2>
          <p class="text-gray-500">{{ currentUser.email }}</p>
        </div>
      </div>
      <div class="mt-6">
        <h3 class="text-xl font-semibold mb-4">Modifier le profil</h3>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label for="displayName" class="block text-sm font-medium text-gray-700">Nom d'affichage</label>
            <input type="text" id="displayName" v-model="profileForm.displayName" class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          </div>
          <div>
            <label for="photoURL" class="block text-sm font-medium text-gray-700">URL de la photo</label>
            <input type="url" id="photoURL" v-model="profileForm.photoURL" class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          </div>
          <button type="submit" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">
            Mettre à jour le profil
          </button>
        </form>
      </div>
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-2">Mes Discussions</h3>
        <DiscussionList :discussions="userDiscussions" />
      </div>
    </div>
    <div v-else class="text-center">
      <p class="text-xl">Veuillez vous connecter pour voir votre profil.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, reactive } from 'vue';
import { getAuth, updateProfile } from 'firebase/auth';
import DiscussionList from '@/components/Discussions/DiscussionList.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'Profile',
  components: {
    DiscussionList
  },
  setup() {
    const currentUser = ref(null);
    const userDiscussions = ref([]);
    const profileForm = reactive({
      displayName: '',
      photoURL: ''
    });

    const fetchUserDiscussions = async () => {
      if (currentUser.value) {
        const q = query(collection(db, 'discussions'), where('author', '==', currentUser.value.displayName || 'Anonyme'));
        const querySnapshot = await getDocs(q);
        userDiscussions.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    };

    const updateProfile = async () => {
      const auth = getAuth();
      try {
        await updateProfile(auth.currentUser, {
          displayName: profileForm.displayName,
          photoURL: profileForm.photoURL
        });
        currentUser.value = auth.currentUser;
        alert('Profil mis à jour avec succès');
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Erreur lors de la mise à jour du profil');
      }
    };

    onMounted(() => {
      const auth = getAuth();
      currentUser.value = auth.currentUser;
      if (currentUser.value) {
        profileForm.displayName = currentUser.value.displayName || '';
        profileForm.photoURL = currentUser.value.photoURL || '';
      }
      fetchUserDiscussions();
    });

    return {
      currentUser,
      userDiscussions,
      profileForm,
      updateProfile
    };
  }
};
</script>
