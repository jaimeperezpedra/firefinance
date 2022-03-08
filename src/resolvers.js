import { expensesResolvers } from './resolvers/expenses.js'
import { loginResolvers } from './resolvers/login.js'

export const resolvers = {
  ...loginResolvers,
  ...expensesResolvers,
};
