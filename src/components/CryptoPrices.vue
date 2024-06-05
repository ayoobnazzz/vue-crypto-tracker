<template>
    <div>
      <h2>Cryptocurrency Prices</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price (USD)</th>
            <th>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="crypto in cryptocurrencies" :key="crypto.id" @click="goToDetail(crypto.id)">
            <td>{{ crypto.name }}</td>
            <td>{{ crypto.symbol.toUpperCase() }}</td>
            <td>{{ crypto.current_price }}</td>
            <td>{{ crypto.market_cap }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cryptocurrencies: []
      };
    },
    methods: {
      async fetchCryptoData() {
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false
            }
          });
          this.cryptocurrencies = response.data;
        } catch (error) {
          console.error('Error fetching cryptocurrency data:', error);
        }
      },
      goToDetail(id) {
        this.$router.push({ name: 'Detail', params: { id } });
      }
    },
    created() {
      this.fetchCryptoData();
    }
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }
  
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  tbody tr {
    cursor: pointer;
  }
  
  tbody tr:hover {
    background-color: #f5f5f5;
  }
  </style>
  