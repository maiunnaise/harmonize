import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import FindTeachersPage from'./pages/findTeacher.js';
import Layout from './components/layout.js';
import HomeStudent from './pages/homeStudent.js';
import {Activity} from './pages/activity.js';
import History from './pages/history.js';
import Library from './pages/library.js';
import PartitionReader from './pages/partitionReader.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route path="findTeacher" element={<FindTeachersPage />}/>
          <Route path="home" element={<HomeStudent/>}/>
          <Route path="library" element={<Library/>}/>
        </Route>
        
        <Route path="activity/:id" element={<Activity/>}/>
        <Route path="play/:id" element={<PartitionReader/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
