<template>
  <div>
    <h2>Cryptocurrency Detail</h2>
    <div v-if="crypto">
      <p><strong>Name:</strong> {{ crypto.name }}</p>
      <p><strong>Symbol:</strong> {{ crypto.symbol.toUpperCase() }}</p>
      <p><strong>Current Price (USD):</strong> {{ crypto.market_data.current_price.usd }}</p>
      <p><strong>Market Cap:</strong> {{ crypto.market_data.market_cap.usd }}</p>
      <!-- <p><strong>Description:</strong> <span v-html="crypto.description.en"></span></p> -->
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <h3>Historical Data (Last 7 Days)</h3>
    <HistoricalChart v-if="historicalData.length" :historicalData="historicalData" />
    <div v-else>
      <p>Loading historical data...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import HistoricalChart from '../components/HistoricalChart.vue';

export default {
  name: 'CryptoDetail',
  props: ['id'],
  components: {
    HistoricalChart,
  },
  setup(props) {
    const crypto = ref(null);
    const historicalData = ref([]);

    const fetchCryptoDetail = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}`);
        crypto.value = response.data;
      } catch (error) {
        console.error('Error fetching cryptocurrency detail:', error);
      }
    };

    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${props.id}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: 7,
          },
        });
        historicalData.value = response.data.prices.map((price) => ({
          date: new Date(price[0]).toLocaleDateString(),
          price: price[1].toFixed(2),
        }));
      } catch (error) {
        console.error('Error fetching historical data:', error);
      }
    };

    onMounted(() => {
      fetchCryptoDetail();
      fetchHistoricalData();
    });

    return {
      crypto,
      historicalData,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
