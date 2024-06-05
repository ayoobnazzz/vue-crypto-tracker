<!-- src/views/CryptoDetail.vue -->
<template>
    <v-container>
      <v-card>
        <v-card-title>{{ cryptoName }} Historical Data</v-card-title>
        <v-card-text>
          <Bar v-if="chartData" :chart-data="chartData" :options="chartOptions" />
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script>
  import { onMounted, ref, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { getCryptoHistory } from '../services/cryptoService'
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale } from 'chart.js'
  import 'chartjs-adapter-date-fns'
  
  // Register necessary components
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, TimeScale)
  
  export default {
    name: 'CryptoDetail',
    components: {
      Bar
    },
    props: ['id'],
    setup(props) {
      const route = useRoute()
      const cryptoName = ref(route.params.id || props.id)
      const cryptoData = ref([])
  
      const chartData = ref(null)
  
      const chartOptions = {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
        },
      }
  
      const fetchCryptoData = async () => {
        try {
          const data = await getCryptoHistory(cryptoName.value)
          cryptoData.value = data
          updateChart()
        } catch (error) {
          console.error('Error fetching cryptocurrency data:', error)
        }
      }
  
      const updateChart = () => {
        chartData.value = {
          labels: cryptoData.value.map(data => new Date(data[0]).toLocaleDateString()),
          datasets: [{
            label: 'Price (USD)',
            data: cryptoData.value.map(data => data[1]),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          }]
        }
      }
  
      watch(
        () => route.params.id,
        async (newId) => {
          cryptoName.value = newId
          await fetchCryptoData()
        },
        { immediate: true }
      )
  
      onMounted(() => {
        fetchCryptoData()
      })
  
      return {
        cryptoName,
        chartData,
        chartOptions,
      }
    },
  }
  </script>
  