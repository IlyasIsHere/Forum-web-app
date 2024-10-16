<template>
  <div id="app">
    <Navbar />
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase';
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          // User is signed in
          console.log('User is signed in:', user.email);
        } else {
          // User is signed out
          console.log('User is signed out');
          router.push('/login');
        }
      });
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
