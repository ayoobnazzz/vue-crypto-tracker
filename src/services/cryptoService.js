// src/services/cryptoService.js
import axios from 'axios'

const API_URL = '/api'

export const getCryptocurrencies = async () => {
  try {
    const response = await axios.get(`${API_URL}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    })
    return response.data
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error)
    throw error
  }
}

export const getCryptoHistory = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '30', // last 30 days
      },
    })
    return response.data.prices
  } catch (error) {
    console.error('Error fetching cryptocurrency history:', error)
    throw error
  }
}
