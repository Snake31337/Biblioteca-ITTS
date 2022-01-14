import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";

import Home from './Components/Home'
import SearchPage from './Components/SearchPage'
import reportWebVitals from './reportWebVitals';
import UserForm from './Components/UserForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}> 
          <Route path="/usermanagement" element={<UserForm />}></Route>
        </Route>
        
        <Route path="/search/:nome" element={<SearchPage />}> </Route>
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
