import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import User from './components/user';
import Home from './components/home';
import AdminHome from './components/Admin/Home';
import Admin from './components/Admin/index';
import UserManage from './components/Admin/Managers/UserManage';
import PostManage from './components/Admin/Managers/PostManage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="user" element={<User />} />
          <Route index element={<Home />} />
        </Route>
        <Route path="/admin" element={<Admin />} >
          <Route path="manage-users" element={<User />} />
          <Route index element={<AdminHome />} />
          <Route path="users-manage" element={<UserManage />} />
          <Route path="posts-manage" element={<PostManage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
