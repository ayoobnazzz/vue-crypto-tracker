<!-- src/components/CryptoTable.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>
          Cryptocurrency Tracker
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="cryptocurrencies"
            class="elevation-1"
            @click:row="goToDetail"
          >
            <template v-slot:item.price="{ item }">
              \${{ item.current_price.toFixed(2) }}
            </template>
            <template v-slot:item.market_cap="{ item }">
              \${{ item.market_cap.toLocaleString() }}
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { getCryptocurrencies } from '../services/cryptoService'
  
  export default {
    name: 'CryptoTable',
    setup() {
      const router = useRouter()
      const cryptocurrencies = ref([])
      const headers = [
        { text: 'Name', value: 'name' },
        { text: 'Symbol', value: 'symbol' },
        { text: 'Price', value: 'price' },
        { text: 'Market Cap', value: 'market_cap' },
      ]
  
      const fetchCryptocurrencies = async () => {
        try {
          cryptocurrencies.value = await getCryptocurrencies()
        } catch (error) {
          console.error('Error fetching cryptocurrencies:', error)
        }
      }
  
      const goToDetail = (item) => {
        router.push({ name: 'CryptoDetail', params: { id: item.id } })
      }
  
      onMounted(() => {
        fetchCryptocurrencies()
      })
  
      return {
        cryptocurrencies,
        headers,
        goToDetail,
      }
    },
  }
  </script>
  
  <style scoped>
  .v-data-table {
    margin-top: 20px;
  }
  </style>
  