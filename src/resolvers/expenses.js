import axios from 'axios';
import { expenseProfile } from '../expenseProfile.js'

const expenses = async (_, { input }) => {
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
};

const expense =  async (_, input) => {
  let expenses = `/bbdd/expenses/${input.id}.json`
  const { data } = await axios.get(expenses); 
  const graphqlExpense = expenseProfile(data);
  return graphqlExpense;
};

const createExpense = async(_, { input }) => {
  const date = +new Date();
  const { data } = await axios.post(`/bbdd/expenses.json`, { ...input, date });
  return data.name;
}

const deleteExpense = async(_, { input }) => {
  const url = `/bbdd/expenses/${input}.json`
  await axios.delete(url);
  return input;
}

export const expensesResolvers = {
  Query: {
    expense,
    expenses
  },
  Mutation: {
    createExpense,
    deleteExpense
  }
}