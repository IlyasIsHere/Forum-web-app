<template>
  <nav class="bg-gradient-to-r from-purple-600 to-blue-500 p-4 shadow-lg">
    <div class="container mx-auto flex justify-between items-center">
      <router-link to="/" class="text-white text-2xl font-bold flex items-center">
        <i class="fas fa-comments mr-2"></i> UM6P Forum
      </router-link>
      <div class="space-x-6 text-lg">
        <router-link to="/" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">
          <i class="fas fa-home mr-1"></i>
          Home
        </router-link>
        <template v-if="isLoggedIn">
          <router-link to="/profile" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">
            <i class="fas fa-user mr-1"></i> 
            Profile</router-link>
          <router-link to="/create-discussion" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">
            <i class="fas fa-plus mr-1"></i>
            Create Discussion</router-link>
          <a href="#" @click.prevent="logout" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">
            <i class="fas fa-sign-out-alt mr-1"></i>
            Logout</a>
        </template>
        <template v-else>
          <router-link to="/login" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">Login</router-link>
          <router-link to="/register" class="text-gray-100 hover:text-blue-500 hover:bg-white transition px-2 py-2 rounded">Register</router-link>
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
