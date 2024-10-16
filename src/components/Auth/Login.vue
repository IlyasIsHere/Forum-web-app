<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
    <h2 class="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>
    <form @submit.prevent="login">
      <div class="mb-4">
        <input type="email" v-model="email" class="input" placeholder="Email" required />
        <p v-if="!isEmailValid" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
      </div>
      <div class="mb-4">
        <input type="password" v-model="password" class="input" placeholder="Password" required minlength="6" />
        <p v-if="!isPasswordValid" class="text-red-500 text-sm mt-1">Password must be at least 6 characters long.</p>
      </div>
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
      <button type="submit" class="btn" :disabled="!isFormValid">
        <i class="fas fa-sign-in-alt mr-2"></i> Login
      </button>
    </form>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPasswordValid() {
      return this.password.length >= 6;
    },
    isFormValid() {
      return this.isEmailValid && this.isPasswordValid;
    }
  },
  methods: {
    async login() {
      if (!this.isFormValid) {
        return;
      }
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = error.message || 'Login failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.input {
  @apply w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400;
}
.btn {
  @apply bg-blue-500 text-white p-3 rounded w-full mt-4 hover:bg-blue-600 transition;
}
</style>
