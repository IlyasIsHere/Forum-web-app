<template>
  <div class="max-w-2xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold mb-6 text-center">Profil Utilisateur</h1>
    <div v-if="currentUser" class="bg-white shadow-lg rounded-lg p-6">
      <div class="flex items-center mb-4">
        <img :src="profileImage || 'https://via.placeholder.com/100'" alt="Photo de profil" class="w-24 h-24 rounded-full mr-6 object-cover">
        <div>
          <h2 class="text-2xl font-semibold">{{ currentUser.displayName || 'Anonyme' }}</h2>
          <p class="text-gray-500">{{ currentUser.email }}</p>
        </div>
      </div>

      <!-- Profile Update Form -->
      <div class="mt-6">
        <h3 class="text-xl font-semibold mb-4">Modifier le profil</h3>
        <form @submit.prevent="updateProfile" class="space-y-4">
          <div>
            <label for="displayName" class="block text-sm font-medium text-gray-700">Nom d'affichage</label>
            <input type="text" id="displayName" v-model="profileForm.displayName" class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          </div>
          <div>
            <label for="photoFile" class="block text-sm font-medium text-gray-700">Photo de profil</label>
            <input type="file" id="photoFile" @change="onFileChange" class="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:border focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
          </div>
          <button type="submit" class="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-150 ease-in-out">
            <i class="fas fa-save"></i> Mettre à jour le profil
          </button>
        </form>
      </div>

      <!-- Discussions Section -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Discussions
          <i class="fas fa-comments ml-2"></i>
        </h3>
        <div v-for="discussion in userDiscussions" :key="discussion.id" class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="text-xl font-semibold text-blue-600">{{ discussion.title }}</h4>
              <p class="text-gray-600">{{ discussion.content }}</p>
              <router-link :to="'/discussion/' + discussion.id" class="text-indigo-500 hover:underline mt-2 inline-block"><i class="fas fa-link"></i> Read more</router-link>
            </div>
            <button @click="deleteDiscussion(discussion.id)" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
          <div class="flex justify-between items-center mt-3">
            <p class="text-sm text-gray-500">
              <i class="fas fa-comments"></i> {{ discussion.responseCount || 0 }} Responses
            </p>
            <p class="text-sm text-gray-500">
              <i class="fas fa-clock"></i> Last response: {{ formatDate(discussion.lastResponse) || 'No responses yet' }}
            </p>
          </div>
        </div>
      </div>

      <!-- Responses Section -->
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4">Commentaires
          <i class="fas fa-pen ml-2"></i>
        </h3>
        <div v-for="response in userResponses" :key="response.id" class="bg-white shadow-lg rounded-lg p-4 mb-4">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-gray-600">{{ response.content }}</p>
              <router-link :to="'/discussion/' + response.discussionId" class="text-indigo-500 hover:underline mt-2 inline-block"><i class="fas fa-link"></i> View Discussion</router-link>
            </div>
            <!-- Delete Response Button -->
            <button @click="deleteResponse(response.id)" class="text-red-500 hover:text-red-700">
              <i class="fas fa-trash-alt"></i> 
            </button>
          </div>
          <div class="flex justify-between items-center mt-3">
            <p class="text-sm text-gray-500">
              <i class="fas fa-clock"></i> Posted: {{ formatDate(response.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Not Logged In -->
    <div v-else class="text-center">
      <p class="text-xl">Veuillez vous connecter pour voir votre profil.</p>
    </div>
  </div>
</template>

<script>
import { getAuth, updateProfile } from 'firebase/auth';
import { ref as storageRef, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase'; // Import Firebase storage instance
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'; // Include deleteDoc
import { db } from '@/firebase';

export default {
  name: 'Profile',
  data() {
    return {
      currentUser: null,
      userDiscussions: [],
      userResponses: [], // Add user responses
      profileForm: {
        displayName: '',
        photoFile: null, // Store the selected file here
        photoURL: ''
      },
      profileImage: '', // Store the profile image URL for display
      isUploading: false,
    };
  },
  methods: {
    async fetchUserDiscussions() {
      if (this.currentUser) {
        const q = query(collection(db, 'discussions'), where('authorId', '==', this.currentUser.uid));
        const querySnapshot = await getDocs(q);
        this.userDiscussions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    },
    async fetchUserResponses() {
      if (this.currentUser) {
        const q = query(collection(db, 'responses'), where('authorId', '==', this.currentUser.uid));
        const querySnapshot = await getDocs(q);
        this.userResponses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    },
    async updateProfile() {
      const auth = getAuth();
      let photoURL = this.profileForm.photoURL;
      if (this.profileForm.photoFile) {
        const fileRef = storageRef(storage, `profilePictures/${auth.currentUser.uid}`);
        const uploadTask = uploadBytesResumable(fileRef, this.profileForm.photoFile);

        this.isUploading = true;

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Optional progress indication
          },
          (error) => {
            console.error('Erreur lors du téléchargement de la photo:', error);
          },
          async () => {
            photoURL = await getDownloadURL(uploadTask.snapshot.ref);
            this.isUploading = false;
            await this.updateUserProfile(photoURL);
          }
        );
      } else {
        await this.updateUserProfile(photoURL);
      }
    },
    async updateUserProfile(photoURL) {
      const auth = getAuth();
      try {
        await updateProfile(auth.currentUser, {
          displayName: this.profileForm.displayName,
          photoURL: photoURL
        });
        this.currentUser = auth.currentUser;
        alert('Profil mis à jour avec succès');
        await this.fetchUserDiscussions();
        await this.fetchUserResponses();
      } catch (error) {
        console.error('Erreur lors de la mise à jour du profil:', error);
        alert('Erreur lors de la mise à jour du profil');
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.profileForm.photoFile = file;
      }
    },
    async deleteDiscussion(discussionId) {
      try {
        await deleteDoc(doc(db, 'discussions', discussionId));
        this.userDiscussions = this.userDiscussions.filter(discussion => discussion.id !== discussionId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la discussion:', error);
        alert('Erreur lors de la suppression de la discussion');
      }
    },
    async deleteResponse(responseId) {
      try {
        await deleteDoc(doc(db, 'responses', responseId));
        this.userResponses = this.userResponses.filter(response => response.id !== responseId);
      } catch (error) {
        console.error('Erreur lors de la suppression de la réponse:', error);
        alert('Erreur lors de la suppression de la réponse');
      }
    },
    formatDate(timestamp) {
      if (timestamp && timestamp.seconds) {
        return new Date(timestamp.seconds * 1000).toLocaleString();
      }
      return '';
    }
  },
  async mounted() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    if (this.currentUser) {
      this.profileForm.displayName = this.currentUser.displayName || '';
      this.profileForm.photoURL = this.currentUser.photoURL || '';
      await this.fetchUserDiscussions();
      await this.fetchUserResponses(); 
    }
  }
};
</script>
