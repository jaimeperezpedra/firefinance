import axios from 'axios';

import { expensesResolvers } from './resolvers/expenses.js'
import { loginResolvers } from './resolvers/login.js'

const baseURL = 'https://finance-1d797-default-rtdb.firebaseio.com';
axios.defaults.baseURL = baseURL;

export const resolvers = {
  ...loginResolvers,
  ...expensesResolvers,
};
