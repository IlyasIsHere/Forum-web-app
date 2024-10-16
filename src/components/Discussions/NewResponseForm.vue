<template>
  <form @submit.prevent="submitResponse" class="mt-4">
    <div class="mb-4">
      <label for="response" class="block text-sm font-medium text-gray-700">Your Response</label>
      <textarea
        id="response"
        v-model="responseContent"
        rows="4"
        class="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:border focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        placeholder="Write your response here..."
      ></textarea>
    </div>
    <button
      type="submit"
      class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Submit Response
    </button>
    <p v-if="errorMessage" class="mt-2 text-red-600">{{ errorMessage }}</p>
  </form>
</template>

<script>
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/firebase';

export default {
  name: 'NewResponseForm',
  emits: ['response-added'],
  data() {
    return {
      responseContent: '',
      errorMessage: ''
    };
  },
  methods: {
    async submitResponse() {
      if (!this.responseContent.trim()) return;

      try {
        const user = auth.currentUser;
        if (!user) throw new Error('User must be logged in to submit a response');

        const newResponseData = {
          content: this.responseContent,
          authorId: user.uid,
          authorName: user.displayName || user.email,
          createdAt: serverTimestamp(),
          discussionId: this.$route.params.id
        };

        const newResponseRef = await addDoc(collection(db, 'responses'), newResponseData);

        this.responseContent = '';
        this.errorMessage = '';
        this.$emit('response-added', { id: newResponseRef.id, ...newResponseData });
      } catch (error) {
        console.error('Error submitting response:', error);
        this.errorMessage = 'Failed to submit response. Please try again.';
      }
    }
  }
};
</script>
