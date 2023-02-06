import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store,persistor} from './react-redux/store'
import 'antd/dist/reset.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import './util/http'
import './index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store} >
         <PersistGate   persistor={persistor}>
        <App />
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
