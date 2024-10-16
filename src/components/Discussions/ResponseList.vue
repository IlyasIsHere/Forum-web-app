<template>
  <div class="max-w-7xl mx-auto p-6">
    <h2 class="text-3xl font-bold mb-6 text-gray-800 flex items-center">
      <i class="fas fa-comments mr-2"></i> Responses
    </h2>

    <!-- Response List -->
    <div v-if="responses.length > 0" class="space-y-6">
      <ResponseItem
        v-for="response in responses"
        :key="response.id"
        :response="response"
        @like-response="likeResponse"
      />
    </div>

    <!-- No Responses Yet -->
    <p v-else class="text-gray-500 text-center">No responses yet. Be the first to reply!</p>

    <!-- New Response Input -->
    <div class="mt-6 flex items-center space-x-4">
      <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
        S
      </div>
      <input
        type="text"
        v-model="newResponseContent"
        class="w-full border border-gray-300 rounded-full px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
        placeholder="Post your comment"
      />
      <button
        @click="submitResponse"
        class="bg-indigo-600 text-white rounded-full px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
import ResponseItem from './ResponseItem.vue';
import { collection, query, where, getDocs, updateDoc, doc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import {auth} from '../../firebase';

export default {
  name: 'ResponseList',
  components: {
    ResponseItem
  },
  props: {
    discussionId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      responses: [],
      newResponseContent: ''
    };
  },
  async created() {
    await this.fetchResponses();
  },
  methods: {
    async fetchResponses() {
      const responsesRef = collection(db, 'responses');
      const q = query(responsesRef, where('discussionId', '==', this.discussionId));
      const querySnapshot = await getDocs(q);
      this.responses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },
    
    async likeResponse(responseId) {
      const responseRef = doc(db, 'responses', responseId);
      const response = this.responses.find(res => res.id === responseId);

      try {
        await updateDoc(responseRef, {
          likes: response.likes ? response.likes + 1 : 1,
        });
        response.likes = response.likes ? response.likes + 1 : 1;
      } catch (error) {
        console.error('Error liking response:', error);
      }
    },

    async submitResponse() {
      if (!this.newResponseContent.trim()) return;
      try {
        await addDoc(collection(db, 'responses'), {
          content: this.newResponseContent,
          discussionId: this.discussionId,
          //authorId: user.uid, // Add authorId and authorName
          authorName: auth.currentUser.displayName || auth.currentUser.email,
          createdAt: serverTimestamp(),
          likes: 0
        });
        this.newResponseContent = ''; // Clear input after submitting
        await this.fetchResponses(); // Refresh the list after submission
      } catch (error) {
        console.error('Error submitting response:', error);
      }
    }
  }
};
</script>
