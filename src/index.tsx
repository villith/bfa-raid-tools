import './index.css';

import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppContainer from './components/AppContainer/AppContainer';
import registerServiceWorker from './registerServiceWorker';

// tslint:disable-next-line:no-string-literal
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((req) => {
  console.log(`[Request Success]`);
  console.log(req);
  return req;
}, (err) => {
  console.log(`[Request Error]`);
  console.log(err);
  return Promise.reject(err);
});

axios.interceptors.response.use((res) => {
  console.log(`[Response Success]`);
  console.log(res);
  return res;
}, (err) => {
  console.log(`[Response Error]`);
  console.log(err);
  return Promise.reject(err);
});

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
