import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Components/Components/LayoutArea/Layout/Layout';
import interceptorService from './Services/InterceptorService';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interceptorService.createInterceptors()

root.render(
  // <React.StrictMode>
    <BrowserRouter>
     <Layout></Layout>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
