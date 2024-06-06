<template>
    <div>
      <h2>Sign Up</h2>
      <form @submit.prevent="signUp">
        <div>
          <label>Email:</label>
          <input v-model="email" type="email" required />
        </div>
        <div>
          <label>Password:</label>
          <input v-model="password" type="password" required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { auth } from '../firebase';
  import { createUserWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    name: 'SignUp',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter();

      const signUp = async () => {
        try {
          const response = await createUserWithEmailAndPassword(auth, email.value, password.value);
          console.log(response.user);
          error.value = '';
          router.push({ name: 'Home' }); 

        } catch (err) {
          error.value = err.message;
        }
      };
  
      return {
        email,
        password,
        error,
        signUp
      };
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  