<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Create a New Discussion</h2>
    <form @submit.prevent="createDiscussion" class="space-y-4">
      <div>
        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title</label>
        <input
          id="title"
          v-model="title"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter discussion title"
          required
        />
      </div>
      <div>
        <label for="content" class="block text-sm font-medium text-gray-700 mb-1">Content</label>
        <textarea
          id="content"
          v-model="content"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Enter discussion content"
          rows="6"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
      >
        Create Discussion
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from 'firebase/firestore';
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
        await addDoc(collection(db, 'discussions'), {
          title: title.value,
          content: content.value,
          createdAt: new Date(),
          author: user ? user.displayName : 'Anonymous',
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
