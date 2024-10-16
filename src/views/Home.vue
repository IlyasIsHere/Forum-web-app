<template>
  <div>
    <h1 class="text-3xl mb-4">Recent Discussions</h1>
    <DiscussionList :discussions="discussions" />
  </div>
</template>

<script>
import DiscussionList from '../components/Discussions/DiscussionList.vue';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default {
  data() {
    return {
      discussions: [],
    };
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, 'discussions'));
    console.log(querySnapshot.docs);
    this.discussions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log(this.discussions);
  },
  components: {
    DiscussionList,
  },
};
</script>
