<template>
  <div class="bg-white shadow-lg rounded-lg p-6 flex items-start space-x-4">
    <!-- Avatar Placeholder or Initials -->
    <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-bold text-lg">
      {{ getInitials(response.authorName) }}
    </div>

    <!-- Response Content -->
    <div class="flex-1">
      <div class="flex justify-between items-start">
        <div>
          <div class="text-lg font-medium text-gray-800 flex items-center">
            <i class="fas fa-user-circle mr-2 text-indigo-500"></i> {{ response.authorName || 'Anonymous' }}
          </div>
          <p class="text-sm text-gray-500 flex items-center">
            <i class="fas fa-clock mr-1"></i> {{ formatDate(response.createdAt) }}
          </p>
        </div>

        <div class="flex items-center space-x-4">
          <button @click="$emit('like-response', response.id)" class="text-gray-500 hover:text-blue-500 focus:outline-none">
            <i class="fas fa-thumbs-up"></i> {{ response.likes || 0 }}
          </button>
          <button class="text-gray-500 hover:text-blue-500 focus:outline-none">
            <i class="fas fa-comment"></i> 3
          </button>
        </div>
      </div>

      <p class="text-gray-700 mt-3">{{ response.content }}</p>

      <!-- Tags Section -->
      <div v-if="response.tags && response.tags.length" class="flex space-x-2 mt-3">
        <span v-for="tag in response.tags" :key="tag" class="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold">
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResponseItem',
  props: {
    response: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(date) {
      if (date && date.seconds) {
        return new Date(date.seconds * 1000).toLocaleString();
      }
      return '';
    },
    getInitials(name) {
      if (!name) return 'A';
      const parts = name.split(' ');
      return parts.map(part => part.charAt(0).toUpperCase()).join('');
    }
  }
};
</script>
