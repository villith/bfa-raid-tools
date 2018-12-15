import './index.css';

import axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import * as wdyu from 'why-did-you-update';

import AppContainer from './components/AppContainer/AppContainer';
import { unregister } from './registerServiceWorker';

unregister();
// tslint:disable-next-line:no-string-literal
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

if (process.env.NODE_ENV === 'dev') {
  wdyu.whyDidYouUpdate(React);
}

axios.interceptors.request.use((req) => {
  // console.log(`[Request Success]`);
  // console.log(req);
  return req;
}, (err) => {
  // console.log(`[Request Error]`);
  // console.log(err);
  return Promise.reject(err);
});

axios.interceptors.response.use((res) => {
  // console.log(`[Response Success]`);
  // console.log(res);
  return res;
}, (err) => {
  // console.log(`[Response Error]`);
  // console.log(err);
  return Promise.reject(err);
});

const devApp = (
  <BrowserRouter>
    <AppContainer />
  </BrowserRouter>
);

const prodApp = (
  <HashRouter>
    <AppContainer />
  </HashRouter>
);

ReactDOM.render(process.env.NODE_ENV === 'production' ? prodApp : devApp, document.getElementById('root') as HTMLElement);
