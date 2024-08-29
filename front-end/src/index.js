import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

//id가 root인 요소
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <App /> //App.js 집어 넣기
  //</React.StrictMode>
);
