<template>
    <header class="bg-blue-500 p-4 text-white">
      <nav class="flex justify-around">
        <router-link to="/" class="hover:underline">Home</router-link>
        <router-link v-if="!user" to="/login" class="hover:underline">Login</router-link>
        <router-link v-if="!user" to="/signup" class="hover:underline">Sign Up</router-link>
        <button v-if="user" @click="logout" class="hover:underline">Logout</button>
      </nav>
    </header>
  </template>
  
  <script>
  import useAuth from '../store/auth';
  import { useRouter } from 'vue-router';
  
  export default {
    name: 'Header',
    setup() {
      const { user, signOut } = useAuth();
      const router = useRouter();
  
      const logout = async () => {
        try {
          await signOut();
          router.push({ name: 'Home' });  // Navigate to home page after logout
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };
  
      return {
        user,
        logout
      };
    }
  };
  </script>
  
  <style scoped>
  header {
    background-color: #35495e;
    padding: 10px;
  }
  
  nav {
    display: flex;
    justify-content: space-around;
  }
  
  router-link, button {
    color: white;
    text-decoration: none;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
  }
  
  router-link:hover, button:hover {
    text-decoration: underline;
  }
  </style>
  