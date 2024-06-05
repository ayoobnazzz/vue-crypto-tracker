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
      <div v-if="loading" class="loading">Loading...</div>
      <div v-if="error" class="error">{{ error }}</div>
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">Previous</button>
        <span>Page {{ page }}</span>
        <button @click="nextPage">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        cryptocurrencies: [],
        loading: false,
        error: null,
        page: 1
      };
    },
    methods: {
      async fetchCryptoData() {
        this.loading = true;
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: this.page,
              sparkline: false
            }
          });
          this.cryptocurrencies = response.data;
          this.error = null;
        } catch (error) {
          this.error = 'Error fetching cryptocurrency data.';
          console.error('Error fetching cryptocurrency data:', error);
        } finally {
          this.loading = false;
        }
      },
      goToDetail(id) {
        this.$router.push({ name: 'Detail', params: { id } });
      },
      nextPage() {
        this.page++;
        this.fetchCryptoData();
      },
      prevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchCryptoData();
        }
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
  
  .loading {
    text-align: center;
    margin: 20px 0;
  }
  
  .error {
    color: red;
    text-align: center;
    margin: 20px 0;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .pagination button {
    margin: 0 5px;
  }
  </style>
  