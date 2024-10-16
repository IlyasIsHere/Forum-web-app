<template>
  <div class="max-w-4xl mx-auto mt-8">
    <h1 class="text-3xl font-bold mb-6">{{ categoryName }}</h1>
    <div v-if="discussions.length > 0">
      <DiscussionList :discussions="discussions" />
    </div>
    <div v-else class="text-center py-8">
      <p class="text-xl text-gray-600">No discussions in this category yet.</p>
    </div>
  </div>
</template>

<script>
import DiscussionList from '@/components/Discussions/DiscussionList.vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'Category',
  components: {
    DiscussionList
  },
  data() {
    return {
      categoryName: '',
      discussions: []
    };
  },
  async created() {
    this.categoryName = this.$route.params.category;
    await this.fetchDiscussions();
  },
  methods: {
    async fetchDiscussions() {
      const q = query(collection(db, 'discussions'), where('category', '==', this.categoryName));
      const querySnapshot = await getDocs(q);
      this.discussions = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  }
};
</script>
