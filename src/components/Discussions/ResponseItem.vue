<template>
  <div class="bg-white shadow-md rounded-lg p-4 mb-4">
    <p class="text-gray-800">{{ response.content }}</p>
    <p class="text-gray-600 mt-2">Posted by {{ response.authorName }} on {{ formatDate(response.createdAt) }}</p>
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
        return new Date(date.seconds * 1000).toLocaleDateString();
      }
      return '';
    }
  }
};
</script>
