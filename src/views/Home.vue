<template>
  <v-container>
    <CryptoTable />
  </v-container>
</template>

<script>
import CryptoTable from '../components/CryptoTable.vue'

export default {
  name: 'Home',
  components: {
    CryptoTable,
  },
}
</script>
