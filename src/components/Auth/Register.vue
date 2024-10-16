<template>
  <div class="max-w-md mx-auto p-4">
    <h2 class="text-2xl font-bold mb-4">Register</h2>
    <form @submit.prevent="register">
      <div class="mb-4">
        <input type="text" v-model="username" class="input" placeholder="Username" required minlength="3" maxlength="20" />
        <p v-if="!isUsernameValid" class="text-red-500 text-sm mt-1">Username must be 3-20 characters long.</p>
      </div>
      <div class="mb-4">
        <input type="email" v-model="email" class="input" placeholder="Email" required />
        <p v-if="!isEmailValid" class="text-red-500 text-sm mt-1">Please enter a valid email address.</p>
      </div>
      <div class="mb-4">
        <input type="password" v-model="password" class="input" placeholder="Password" required minlength="8" />
        <p v-if="!isPasswordValid" class="text-red-500 text-sm mt-1">Password must be at least 8 characters long.</p>
      </div>
      <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>
      <button type="submit" class="btn" :disabled="!isFormValid">Register</button>
    </form>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  },
  computed: {
    isUsernameValid() {
      return this.username.length >= 3 && this.username.length <= 20;
    },
    isEmailValid() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(this.email);
    },
    isPasswordValid() {
      return this.password.length >= 8;
    },
    isFormValid() {
      return this.isUsernameValid && this.isEmailValid && this.isPasswordValid;
    }
  },
  methods: {
    async register() {
      if (!this.isFormValid) {
        return;
      }
      const auth = getAuth();
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
        await updateProfile(userCredential.user, { displayName: this.username });
        this.$router.push('/');
      } catch (error) {
        console.error('Registration failed:', error);
        this.errorMessage = error.message || 'Registration failed. Please try again.';
      }
    }
  }
};
</script>

<style scoped>
.input {
  @apply w-full p-2 border rounded;
}
.btn {
  @apply bg-green-500 text-white p-2 rounded w-full;
}
.btn:disabled {
  @apply bg-gray-400 cursor-not-allowed;
}
</style>
