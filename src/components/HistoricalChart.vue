<template>
    <div>
      <LineChart v-if="historicalData.length" :chart-data="chartData" :options="chartOptions" />
      <p v-else>Loading chart data...</p>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
  } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);
  
  export default {
    name: 'HistoricalChart',
    components: {
      LineChart: Line,
    },
    props: {
      historicalData: {
        type: Array,
        required: true,
        default: () => [], // Ensure historicalData is always an array
      },
    },
    computed: {
        chartData() {
        if (!this.historicalData || !Array.isArray(this.historicalData)) {
            return {
            labels: [],
            datasets: [
                {
                label: 'Price (USD)',
                data: [],
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                },
            ],
            };
        }

  return {
    labels: this.historicalData.map((data) => data.date),
    datasets: [
      {
        label: 'Price (USD)',
        data: this.historicalData.map((data) => data.price),
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
      },
    ],
  };
},
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            title: {
              display: true,
              text: 'Cryptocurrency Price (Last 7 Days)',
            },
          },
        };
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>
  