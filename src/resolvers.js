import { expenseProfile } from './expenseProfile.js'
import axios from 'axios';
import { config } from '../config.js';
const baseURL = 'https://finance-1d797-default-rtdb.firebaseio.com';
const loginURL = 'https://identitytoolkit.googleapis.com/v1/'
axios.defaults.baseURL = baseURL;

export const resolvers = {
  Query: {
    expenses: async (_, { input }) => {
      const { month, year } = input;
      const startAt = +new Date(`${month}/1/${year}`)
      const endAt = +new Date(`${month + 1}/1/${year}`)
      let expenses = `/bbdd/expenses.json?orderBy="date"&startAt=${startAt}&endAt=${endAt}`
      const { data } = await axios.get(expenses)
      if (data.length === 0) {
        return [];
      }
      const keys = Object.keys(data);
      const mapsKeys = keys.map(function(item) {
        const expenseData = data[item];
        const graphqlExpense= expenseProfile(expenseData, item);
        return graphqlExpense;
      });
      return mapsKeys;
    },
    expense: async (_, input) => {
      let expenses = `/bbdd/expenses/${input.id}.json`
      const { data } = await axios.get(expenses);
      const graphqlExpense = expenseProfile(data);
      return graphqlExpense;
    }
  },
  Mutation: {
    createExpense: async(_, { input }) => {
      const date = +new Date();
      const { data } = await axios.post(`/bbdd/expenses.json`, { ...input, date });
      return data.name;
    },
    deleteExpense: async(_, { input }) => {
      const url = `/bbdd/expenses/${input}.json`
      await axios.delete(url);
      return input;
    },
    createUser: async(_, { input }) => {
      const url = `accounts:signUp?key=${config.firebaseConfig.apiKey}`
      const { data } = await axios(
        {
          baseURL: loginURL,
          url,
          method: 'POST',
          data: { ...input, returnSecureToken: true }
        }
      ).catch(function (err) {
        if (err.response) {
          throw new Error(err.response.data.error.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(err.message);
        }
      });
      return data;
    },
    loginUser: async(_, { input }) => {
      const url = `accounts:signInWithPassword?key=${config.firebaseConfig.apiKey}`
      const { data } = await axios(
        {
          baseURL: loginURL,
          url,
          method: 'POST',
          data: { ...input, returnSecureToken: true }
        }
      ).catch(function (err) {
        if (err.response) {
          throw new Error(err.response.data.error.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          throw new Error(err.message);
        }
      });
      return data;
    },
  }
};
