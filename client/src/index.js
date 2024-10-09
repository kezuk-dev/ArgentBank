import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Home, Logging, User} from './pages/';
import {Footer, Header} from './components/';

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer.js";


const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <React.StrictMode>
        <Router>
          <Header />
                  <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/signin" element={<Logging />}/>
                    <Route path="/profile" element={<User />} />
                  </Routes>
            <Footer />
        </Router>
    </React.StrictMode>
  </Provider>
);