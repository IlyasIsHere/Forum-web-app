<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Navbar />
    <main class="flex-grow">
      <router-view/>
    </main>
    <Footer />
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from './firebase';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
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

/* Make the body take up the full height and prevent white gaps below footer */
html, body {
  height: 100%;
  margin: 0;
}

/* Flex container to stretch content and keep footer at the bottom */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex-grow: 1;
}
</style>
