import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import Menu from './components/Menu';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FindTeachersPage from'./pages/findTeacher.js';
import Inbox from './pages/Inbox.js';
import User from './pages/User.js';
import EditUser from './pages/editUser.js';
import SearchPage from './pages/SearchPage.js';
import Layout from './components/layout.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="findTeacher" element={<FindTeachersPage />}/>
          <Route path="inbox" element={<Inbox />}/>
          <Route path="search" element={<SearchPage />}/>
        </Route>
        <Route path="/user" element={<User />}/>
        <Route path="/user/edit" element={<EditUser />}/>
        
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
