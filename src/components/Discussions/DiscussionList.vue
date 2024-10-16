<template>
  <div>
    <div v-for="discussion in discussions" :key="discussion.id" class="card mb-4">
      <h3 class="text-xl">{{ discussion.title }}</h3>
      <p>{{ discussion.content }}</p>
      <router-link :to="'/discussion/' + discussion.id" class="text-blue-500">Read more</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ['discussions'],
};
</script>

<style scoped>
.card {
  @apply bg-white shadow-md p-4 rounded;
}
</style>
