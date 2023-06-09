import { Route, Routes, Navigate, useLocation, BrowserRouter } from 'react-router-dom';
import AppClient from './components/AppClient';
import Home from './components/Client/Pages/Home';
import AdminHome from './components/Admin/Home';
import Admin from './components/Admin/index';
import UserManage from './components/Admin/Managers/UserManage';
import PostManage from './components/Admin/Managers/PostManage';
import Login from './components/Auth/Login'
import PrivateRoute from './hoc/Authentication'
import Register from './components/Auth/Register'
import NotFound from './components/Client/Pages/NotFound'
import Toast from './components/componentsCustom/toast';
import appSlice from './redux/silceReducers/appSlice'
import Product from './components/Client/Pages/Products'

import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { isLogInSelector, userInfoSelector } from './redux/selector';
import { AnimatePresence } from 'framer-motion';
function App() {
  const location = useLocation();
  const login = useSelector(isLogInSelector);
  const user = useSelector(userInfoSelector);

  const [isLogIn, setIsLogIn] = useState(login);
  const [userRole, setUserRole] = useState(user.role);
  const dispatch = useDispatch();
  const i = true;
  useEffect(() => {
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        dispatch(appSlice.actions.logOut());
      }
    });
    setIsLogIn(login);
    if (user) {
      setUserRole(user.role);
    }
  }, [login], [user])
  return (
    <>
      <AnimatePresence mode='wait' initial={false}>

        <Routes location={location} key={location.pathname}>
          <Route path="/" element={
            <PrivateRoute>
              <AppClient />
            </PrivateRoute>
          } >
            <Route index element={<Home />} />
            <Route path='products' element={<Product />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={userRole === "R0" ?
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
            :
            <Navigate to='/' replace />
          } >
            <Route index element={<AdminHome />} />
            <Route path="users-manage" element={<UserManage />} />
            <Route path="posts-manage" element={<PostManage />} />
          </Route>
          <Route path='/login' element={isLogIn ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={isLogIn ? <Navigate to='/' /> : <Register />} />
          {/* <Route path="/login" element={isLogIn ? <Navigate to='/' replace /> : <Login />} />*/}
        </Routes>

      </AnimatePresence>
      <Toast />
    </>
  );
}

export default App;
