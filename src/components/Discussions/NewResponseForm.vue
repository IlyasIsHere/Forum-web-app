<template>

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
