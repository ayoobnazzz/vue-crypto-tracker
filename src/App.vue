<template>
  <v-app>
    <v-main>
      <CryptoTable />
    </v-main>
  </v-app>
</template>

<script>
import CryptoTable from './components/CryptoTable.vue';

export default {
  name: 'App',
  components: {
    CryptoTable,
  },
};
</script>
