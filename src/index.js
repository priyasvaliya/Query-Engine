import React from 'react';
import ReactDOM from 'react-dom';
import { Provider  } from 'react-redux'
import store from './store'
import './index.css';
import './bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import awsconfig from "./aws-exports";
import {AmplifyProvider} from '@aws-amplify/ui-react';

Amplify.configure(awsconfig)


ReactDOM.render(
  <Provider store={store}>
    <AmplifyProvider>
    <App />
    </AmplifyProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
