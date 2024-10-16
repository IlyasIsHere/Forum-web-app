<template>
  <div class="max-w-7xl mx-auto p-6">
    <!--improve the looks-->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-8 text-center text-purple-800">UM6P Forum
        <i class="fas fa-comments ml-2"></i>
      </h1>
      <p class="text-lg text-center text-gray-600">Welcome to the UM6P Forum! Share
        your thoughts and ideas with the community.</p>
    </div>
    



    <!-- Search Bar -->
    <div class="flex justify-center mb-8">
      <div class="relative w-full max-w-md">
        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        <input 
          type="text" 
          v-model="searchQuery" 
          @input="applySearch" 
          placeholder="Search discussions..." 
          class="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
        />
        <i class="fas fa-times-circle absolute right-3 top-3 text-gray-400 cursor-pointer" v-if="searchQuery" @click="clearSearch"></i>
      </div>
    </div>
        <!-- Tag Filter -->
        <div class="mb-6 flex flex-wrap justify-center space-x-2">
      <span 
        v-for="tag in tags" 
        :key="tag" 
        @click="addTagToSearch(tag)" 
        :class="getTagClass(tag)" 
        class="cursor-pointer text-white font-semibold px-4 py-2 rounded-lg transition duration-150 ease-in-out hover:shadow-lg">
        #{{ tag }}
      </span>
    </div>

    <!-- Discussion List -->
    <DiscussionList :discussions="filteredDiscussions" />

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
      filteredDiscussions: [],
      searchQuery: '',
      selectedTag: null,
      tags: ['Technology', 'Business', 'Health', 'Education', 'Lifestyle', 'Entertainment', 'Finance'],
    };
  },
  async created() {
    const querySnapshot = await getDocs(collection(db, 'discussions'));
    this.discussions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    this.filteredDiscussions = this.discussions;
  },
  methods: {
    // Filter discussions by tag
    addTagToSearch(tag) {
      this.searchQuery = `#${tag}`;
      this.applySearch();
    },
    // Apply full-text search and filter by tag if selected
    applySearch() {
      const query = this.searchQuery.toLowerCase();
      this.filteredDiscussions = this.discussions.filter(discussion => {
        return (
          discussion.title.toLowerCase().includes(query) ||
          discussion.content.toLowerCase().includes(query) ||
          (discussion.tags && discussion.tags.some(tag => `#${tag}`.toLowerCase().includes(query)))
        );
      });
    },
    // Clear search input
    clearSearch() {
      this.searchQuery = '';
      this.filteredDiscussions = this.discussions;
    },
    // Assign random colors to tags
    getTagClass(tag) {
      const colors = {
        Technology: 'bg-blue-500',
        Business: 'bg-green-500',
        Health: 'bg-red-500',
        Education: 'bg-yellow-500',
        Lifestyle: 'bg-pink-500',
        Entertainment: 'bg-purple-500',
        Finance: 'bg-orange-500',
      };
      return colors[tag] || 'bg-gray-500';
    }
  },
  components: {
    DiscussionList,
  },
};
</script>
