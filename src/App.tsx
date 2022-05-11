/*
 * @Author: ajie.deng
 * @Date: 2022-01-04 18:06:57
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-03-28 14:02:08
 * @FilePath: \smart_dimmer_developf:\Code\saasplatform\src\App.tsx
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import React, { useEffect, useState } from 'react';
import {
  Switch,
  Route,
  Redirect,
  HashRouter,
  // useHistory
} from "react-router-dom";

import Login from './pages/login';
import Frame from './pages/frame';
import 'antd/dist/antd.css';
import './App.css';
import { useSelector } from 'react-redux';
function App() {
  const isLogged = localStorage.getItem('access_token') ? true : false;
  const { status } = useSelector((state: any) => state.global);
  useEffect(() => {
    console.log('bbbbbbbbbb',status);
    if (status === 1101) {
      // console.log('aaaaaaaaa');
      localStorage.removeItem('access_token');
    }
  }, [status])
  console.log('35global-----status', isLogged, status); //true 200 false

  return (
    <HashRouter>
      <Switch >
        <Route exact path={'/login'} render={(props) => <Login />} />
        {/* <Route path="/" render={(props) => isLogged && !access_token ? <Frame /> : <Redirect to="/login" />} /> */}
        <Route path="/" render={(props) => {
          console.log('rrrrrrrrr',localStorage.getItem('access_token'));
          if (localStorage.getItem('access_token')) {
            console.log('lllllllll', isLogged);
            return <Frame />
          }
          return <Redirect to="/login" />
        }} />

      </Switch>
    </HashRouter>

  );
}

export default App;
function dispatch(logOut: { payload: undefined; type: string; }) {
  throw new Error('Function not implemented.');
}

