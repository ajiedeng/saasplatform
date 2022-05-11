/*
 * @Author: ajie.deng
 * @Date: 2022-01-08 09:53:35
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-02-23 14:46:40
 * @FilePath: \saasplatform\src\store\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import loginReducer from '../pages/login/loginSlice';
import uploadReducer from '../root/globalSlice';

export default configureStore({
  reducer: {
    login: loginReducer,
    global:uploadReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([logger])
})
