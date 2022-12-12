import axios from 'axios';
import nookies from 'nookies';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import Config from '../Config';

// const cookie = new Cookies();
// let token = localStorage.getItem('access-token');
// console.log('token===', token1);
// let token1 = nookies.get();
// console.log('Bearer ' + token);
// console.log(token);
export const getToken = () => {
  if (typeof window !== 'undefined') {
    let token = localStorage.getItem('access-token');
    return token;
  }
};

const BASE_URL = axios.create({
  baseURL: Config.url,
});



console.log('env', process.env.NEXT_PUBLIC_ENVIRONMENT);





BASE_URL.interceptors.request.use((request) => {
  const isLoggedIn = true;
  const isApiUrl = true;

  if (isLoggedIn && isApiUrl) {
    console.log('getToken', getToken());
    if (getToken()) {
      var token = getToken();
      request.headers.common.Authorization = 'Bearer ' + token;
    }
  }

  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (err.response.status === 401) {
      window.location.pathname = '/signin';
    }
    if (err.response.status === 403) {
      // show auth popup
    }

    return Promise.reject(err);
  }
);

export default BASE_URL;
