import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap-icons/font/bootstrap-icons.css";


import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {hyperlinks} from './Components/Pages'
import NotFound from './Components/NotFound';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        {hyperlinks.map((pages) => (
          <Route path={pages.link} element={pages.class}></Route>
        ))
        }
        <Route path='*' element={<NotFound />} />
      </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
