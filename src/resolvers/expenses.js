import { expenseProfile } from '../expenseProfile.js'

const expenses = async (_, { input }, { dataSources }) => {
  const { month, year } = input;
  const startAt = +new Date(`${month}/1/${year}`)
  const endAt = +new Date(`${month + 1}/1/${year}`)
  const data = await dataSources.FirebaseRealData.getExpenses({ startAt, endAt });

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

const expense =  async (_, { id }, { dataSources }) => {
  const data = await dataSources.FirebaseRealData.getExpense({id}); 
  const graphqlExpense = expenseProfile(data);
  return graphqlExpense;
};

const createExpense = async(_, { input }, { dataSources }) => {
  const date = +new Date();
  const data = await dataSources.FirebaseRealData.addExpense({ ...input, date });
  return data.name;
}

const deleteExpense = async(_, { id }, { dataSources }) => {
  await dataSources.FirebaseRealData.deleteExpense({id});
  return id;
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