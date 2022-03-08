import { RESTDataSource } from 'apollo-datasource-rest';

export class FirebaseRealData extends RESTDataSource {
  constructor() {
    super();
    this.fetch = this.fetch.bind(this);
    this.baseURL = 'https://finance-1d797-default-rtdb.firebaseio.com';
  }

  async getExpenses({ startAt, endAt }) {
    return await this.get(`/bbdd/expenses.json?orderBy="date"&startAt=${startAt}&endAt=${endAt}`);
  }

  async getExpense({ id }) {
    return await this.get(`/bbdd/expenses/${id}.json`);
  }

  async addExpense({ input, date }) {
    console.log(input, date);
    return await this.post(`/bbdd/expenses.json`, { ...input, date })
  }

  async deleteExpense({ id }) {
    return await this.delete(`/bbdd/expenses/${id}.json`)
  }
}
