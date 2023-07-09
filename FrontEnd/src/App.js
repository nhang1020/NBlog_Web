import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import AppClient from './components/AppClient';
import Home from './components/home';
import AdminHome from './components/Admin/Home';
import Admin from './components/Admin/index';
import UserManage from './components/Admin/Managers/UserManage';
import PostManage from './components/Admin/Managers/PostManage';
import Login from './components/Auth/Login'
import PrivateRoute from './hoc/Authentication'
import Register from './components/Auth/Register'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { isLogInSelector, userInfoSelector } from './redux/selector';
import NotFound from './components/Client/Pages/NotFound'
import Toast from './components/componentsCustom/toast';
import appSlice from './redux/silceReducers/appSlice'
import { AnimatePresence } from 'framer-motion';
import AnimationPage from './components/componentsCustom/AnimationPage';

function App() {
  const location = useLocation();
  const login = useSelector(isLogInSelector);
  const user = useSelector(userInfoSelector);

  const [isLogIn, setIsLogIn] = useState('');
  const [userRole, setUserRole] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLogIn(login);
    setUserRole(user.role);
    window.addEventListener('storage', (event) => {
      if (event.storageArea === localStorage) {
        dispatch(appSlice.actions.logOut());
      }
    });
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
          </Route>
          <Route path="/admin" element={userRole === 'R0' ?
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
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Toast />
    </>
  );
}

export default App;
