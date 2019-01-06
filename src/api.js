import axios from 'axios';

export function getFiatNames() {
  return axios.get('https://openexchangerates.org/api/currencies.json');
}

export function getCryptoNames() {
  return axios.get('https://min-api.cryptocompare.com/data/all/coinlist');
}

export function getDailyAverage(from, to) {
  return axios.get(`https://min-api.cryptocompare.com/data/dayAvg?fsym=${from}&tsym=${to}`);
}