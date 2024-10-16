<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Responses</h2>
    <div v-if="responses.length > 0">
      <ResponseItem
        v-for="response in responses"
        :key="response.id"
        :response="response"
      />
    </div>
    <p v-else>No responses yet.</p>
  </div>
</template>

<script>
import ResponseItem from './ResponseItem.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

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
      responses: []
    };
  },
  created() {
    this.fetchResponses();
  },
  methods: {
    async fetchResponses() {
      const responsesRef = collection(db, 'responses');
      const q = query(responsesRef, where('discussionId', '==', this.discussionId));
      const querySnapshot = await getDocs(q);
      this.responses = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    },

    addResponse(newResponse) {
      this.responses.push(newResponse);
    }
  }
};
</script>
