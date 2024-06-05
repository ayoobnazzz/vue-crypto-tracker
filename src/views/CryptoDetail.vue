<template>
    <v-container>
      <v-card>
        <v-card-title>{{ cryptoName }} Historical Data</v-card-title>
        <v-card-text>
          <canvas id="cryptoChart"></canvas>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'
  import axios from 'axios'
  import { Chart } from 'chart.js'
  
  export default {
    name: 'CryptoDetail',
    setup() {
      const route = useRoute()
      const cryptoName = ref(route.params.id)
      const cryptoData = ref([])
  
      const fetchCryptoData = async () => {
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${cryptoName.value}/market_chart`, {
            params: {
              vs_currency: 'usd',
              days: '30', // last 30 days
            },
          })
          cryptoData.value = response.data.prices
          createChart()
        } catch (error) {
          console.error('Error fetching cryptocurrency data:', error)
        }
      }
  
      const createChart = () => {
        const ctx = document.getElementById('cryptoChart').getContext('2d')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: cryptoData.value.map(data => new Date(data[0]).toLocaleDateString()),
            datasets: [{
              label: 'Price (USD)',
              data: cryptoData.value.map(data => data[1]),
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
              fill: false,
            }],
          },
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
            },
          },
        })
      }
  
      onMounted(() => {
        fetchCryptoData()
      })
  
      return {
        cryptoName,
        cryptoData,
      }
    },
  }
  </script>
  