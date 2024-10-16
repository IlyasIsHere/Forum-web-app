<template>
  <div class="max-w-5xl mx-auto py-8 px-4">
    <div v-for="discussion in discussions" :key="discussion.id" class="bg-white shadow-lg rounded-lg p-6 mb-6 hover:shadow-xl transition">
      <div class="flex items-center justify-between">
        <h3 class="text-2xl font-semibold text-blue-600 mb-2 flex items-center">
          <i class="fas fa-comments mr-2"></i> {{ discussion.title }}
        </h3>
        <!-- Tag Badges -->
        <div class="flex space-x-2">
          <span 
            v-for="tag in discussion.tags" 
            :key="tag" 
            :class="getTagClass(tag)" 
            class="text-white font-semibold px-2 py-1 rounded-lg text-xs">
            #{{ tag }}
          </span>
        </div>
      </div>
      <p class="text-gray-600 mb-4">{{ discussion.content }}</p>
      <router-link :to="'/discussion/' + discussion.id" class="text-indigo-500 hover:underline mt-4 inline-block flex items-center">
        <i class="fas fa-arrow-right mr-2"></i> Read more
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['discussions'],
  methods: {
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
  }
};
</script>

<style scoped>
/* Tailwind classes manage most of the styling here */
</style>
