<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="login">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useAuth from '../store/auth';
  
  export default {
    name: 'Login',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const { signIn } = useAuth();
      const router = useRouter();
  
      const login = async () => {
        try {
          await signIn(email.value, password.value);
          error.value = '';
          router.push({ name: 'Home' });  // Navigate to home page after successful login
        } catch (err) {
          error.value = err.message;
        }
      };
  
      return {
        email,
        password,
        error,
        login
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  