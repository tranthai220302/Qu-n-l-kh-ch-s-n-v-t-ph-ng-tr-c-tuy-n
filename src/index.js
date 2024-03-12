import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DarkModeContextProvider } from "./context/darkModeContext";
import ChatraIntegration from './compoments/customer/Chatra/ChatraIntegration';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51OqC8TITL44jpS8tuL8TkL0wvSWBrDrmjPpuVTmjgR6rBweVHw7jgkZEfq2hWoX9ATXOF2z4xeg85VCMA5Jwk7K900FkqfmARh');

const options = {
  mode: 'payment',
  amount: 1099,
  currency: 'usd',
  // Fully customizable with appearance API.
  appearance: {
    /*...*/
  },
};
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
        <Provider store={store}>
        <Elements stripe={stripePromise} options={options}>
          <App />
          </Elements>
        </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
