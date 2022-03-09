import { gql } from "apollo-server";

export const typeDefs = gql`
  type Expense {
    id: ID
    currency: String
    price: Float
    category: String
    description: String
    date: String
  }

  type AuthToken {
    # A Firebase Auth ID token for the authenticated user.
    idToken: ID

    # The email for the authenticated user.
    email: String!

    # A Firebase Auth refresh token for the authenticated user.
    refreshToken: String!

    # The number of seconds in which the ID token expires.
    expiresIn: Int!

    # The uid of the authenticated user.
    localId: String!

    # Whether the email is for an existing account.
    registered: Boolean
  }

  type Query {
    expenses(input: ExpenseFilter!): [Expense]
    expense(id: ID!): Expense
  }

  type Mutation {
    createExpense(input: ExpenseInput!): ID
    deleteExpense(id: ID!): ID
    createUser(input: UserCredentials!): AuthToken
    loginUser(input: UserCredentials!): AuthToken
  }

  input ExpenseInput {
    currency: String
    price: Float
    category: String
    description: String
    date: String
  }

  input ExpenseFilter {
    year: Int!
    month: Int!
  }

  input UserCredentials {
    email: String!
    password: String!
  }
`;
