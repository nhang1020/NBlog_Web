import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import AdminHome from './components/Admin/Home';
import Admin from './components/Admin/index';
import UserManage from './components/Admin/Managers/UserManage';
import PostManage from './components/Admin/Managers/PostManage';
import { Provider } from 'react-redux';
import store from './redux/store'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} >
            <Route index element={<Home />} />
          </Route>
          <Route path="/admin" element={<Admin />} >
            <Route index element={<AdminHome />} />
            <Route path="users-manage" element={<UserManage />} />
            <Route path="posts-manage" element={<PostManage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
