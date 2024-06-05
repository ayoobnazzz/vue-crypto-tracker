<template>
    <div>
      <h2>Cryptocurrency Detail</h2>
      <div v-if="crypto">
        <p><strong>Name:</strong> {{ crypto.name }}</p>
        <p><strong>Symbol:</strong> {{ crypto.symbol.toUpperCase() }}</p>
        <p><strong>Current Price (USD):</strong> {{ crypto.market_data.current_price.usd }}</p>
        <p><strong>Market Cap:</strong> {{ crypto.market_data.market_cap.usd }}</p>
        <p><strong>Description:</strong> <span v-html="crypto.description.en"></span></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        crypto: null
      };
    },
    methods: {
      async fetchCryptoDetail() {
        const id = this.$route.params.id;
        try {
          const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
          this.crypto = response.data;
        } catch (error) {
          console.error('Error fetching cryptocurrency detail:', error);
        }
      }
    },
    created() {
      this.fetchCryptoDetail();
    }
  };
  </script>
  