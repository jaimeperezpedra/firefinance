import axios from 'axios';
import { config } from '../../config.js';
const loginURL = 'https://identitytoolkit.googleapis.com/v1/'

const createUser =  async(_, { input }) => {
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
}

const loginUser = async(_, { input }) => {
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
}

export const loginResolvers = {
  Mutation: {
    createUser,
    loginUser
  }
}