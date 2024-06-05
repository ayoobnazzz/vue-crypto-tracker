<!-- src/views/HomeView.vue -->
<template>
  <v-container>
    <CryptoTable />
  </v-container>
</template>

<script>
import CryptoTable from '../components/CryptoTable.vue'

export default {
  name: 'HomeView',
  components: {
    CryptoTable,
  },
}
</script>
