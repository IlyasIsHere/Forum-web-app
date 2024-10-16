<template>
  <div class="max-w-2xl mx-auto mt-8" v-if="discussion">
    <h1 class="text-3xl font-bold mb-4">{{ discussion.title }}</h1>
    <p class="text-gray-600 mb-4">Posted by {{ discussion.authorName }} on {{ formatDate(discussion.createdAt) }}</p>
    <div class="bg-white shadow-md rounded-lg p-6 mb-6">
      <p class="text-gray-800">{{ discussion.content }}</p>
    </div>
    <ResponseList :discussionId="$route.params.id" ref="responseList" />
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Add a Response</h2>
      <NewResponseForm @response-added="onResponseAdded" />
    </div>
  </div>
  <div v-else class="max-w-2xl mx-auto mt-8">
    <p>Loading discussion...</p>
  </div>
</template>

<script>
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import NewResponseForm from './NewResponseForm.vue';
import ResponseList from './ResponseList.vue';

export default {
  components: {
    NewResponseForm,
    ResponseList,
  },
  data() {
    return {
      discussion: null,
    };
  },
  created() {
    this.fetchDiscussion();
  },
  methods: {
    async fetchDiscussion() {
      const discussionId = this.$route.params.id;
      const docRef = doc(db, 'discussions', discussionId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        console.log(docSnap.data());
        this.discussion = { id: docSnap.id, ...docSnap.data() };
      } else {
        console.log('No such document!');
        // Handle the case when the discussion doesn't exist
      }
    },
    onResponseAdded(newResponse) {
      if (this.$refs.responseList) {
        this.$refs.responseList.addResponse(newResponse);
      }
    },
    formatDate(date) {
      if (date && date.seconds) {
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return '';
    },
  },
};
</script>
