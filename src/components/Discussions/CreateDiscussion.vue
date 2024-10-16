<template>
  <div class="mt-5 max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-extrabold text-center text-indigo-600 mb-8"> New Discussion
      <i class="fas fa-comments ml-2 text-indigo-600"></i>
    </h2>
    
    <form @submit.prevent="createDiscussion" class="space-y-6">
      
      <!-- Title -->
      <div class="relative">
        <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input
          id="title"
          v-model="title"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm  focus:border-indigo-500"
          placeholder="Enter discussion title"
          required
        />
        <!-- Character Counter -->
        <p class="absolute right-3 bottom-3 text-sm text-gray-400">{{ title.length }}/100</p>
      </div>

      <!-- Content -->
      <div class="relative">
        <label for="content" class="block text-sm font-medium text-gray-700 mb-2">Content</label>
        <textarea
          id="content"
          v-model="content"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm  focus:border-indigo-500 resize-none"
          placeholder="Enter discussion content"
          rows="6"
          maxlength="500"
          required
        ></textarea>
        <!-- Character Counter -->
        <p class="absolute right-3 bottom-3 text-sm text-gray-400">{{ content.length }}/500</p>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2  focus:ring-offset-2 transition duration-150 ease-in-out"
      >
        <i class="fas fa-plus-circle mr-2"></i> Create Discussion
      </button>
      
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase';

export default {
  setup() {
    const router = useRouter();
    const title = ref('');
    const content = ref('');

    const createDiscussion = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
          throw new Error('User must be logged in to create a discussion');
        }
        await addDoc(collection(db, 'discussions'), {
          title: title.value,
          content: content.value,
          createdAt: serverTimestamp(),
          authorId: user.uid,
          authorName: user.displayName || 'Anonyme',
        });
        router.push('/');
      } catch (error) {
        console.error('Error creating discussion:', error);
      }
    };

    return {
      title,
      content,
      createDiscussion
    };
  }
};
</script>

<style scoped>
/* Tailwind is handling most of the styles, but you can add custom styles here if needed */
</style>
