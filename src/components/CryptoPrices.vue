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
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import axios from 'axios';
  
  export default {
    name: 'CryptoPrices',
    setup() {
      const cryptocurrencies = ref([]);
      const loading = ref(false);
      const error = ref(null);
      const page = ref(1);
      const router = useRouter();
  
      const fetchCryptoData = async () => {
        loading.value = true;
        try {
          const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: page.value,
              sparkline: false
            }
          });
          cryptocurrencies.value = response.data;
          error.value = null;
        } catch (err) {
          error.value = 'Error fetching cryptocurrency data.';
          console.error('Error fetching cryptocurrency data:', err);
        } finally {
          loading.value = false;
        }
      };
  
      const goToDetail = (id) => {
        router.push({ name: 'CryptoDetail', params: { id } });
      };
  
      const nextPage = () => {
        page.value++;
        fetchCryptoData();
      };
  
      const prevPage = () => {
        if (page.value > 1) {
          page.value--;
          fetchCryptoData();
        }
      };
  
      fetchCryptoData();
  
      return {
        cryptocurrencies,
        loading,
        error,
        page,
        fetchCryptoData,
        goToDetail,
        nextPage,
        prevPage
      };
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
  