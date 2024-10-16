<template>
  <nav class="bg-gray-800 p-4">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-xl font-bold">DiscussionApp</router-link>
      <div class="space-x-4">
        <router-link to="/" class="text-gray-300 hover:text-white">Home</router-link>
        <template v-if="isLoggedIn">
          <router-link to="/profile" class="text-gray-300 hover:text-white">Profile</router-link>
          <router-link to="/create-discussion" class="text-gray-300 hover:text-white">Create Discussion</router-link>
          <a href="#" @click.prevent="logout" class="text-gray-300 hover:text-white">Logout</a>
        </template>
        <template v-else>
          <router-link to="/login" class="text-gray-300 hover:text-white">Login</router-link>
          <router-link to="/register" class="text-gray-300 hover:text-white">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter();
    const isLoggedIn = ref(false);

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        isLoggedIn.value = !!user;
      });
    });

    const logout = async () => {
      try {
        await signOut(auth);
        router.push('/login');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };

    return {
      isLoggedIn,
      logout
    };
  }
};
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
