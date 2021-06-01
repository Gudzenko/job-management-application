import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import store from './redux/store'
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import common_en from './translation/en.json';
import common_pl from './translation/pl.json';
import common_ru from './translation/ru.json';

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: 'en',
  resources: {
    en: {
      common: common_en
    },
    pl: {
      common: common_pl
    },
    ru: {
      common: common_ru
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
