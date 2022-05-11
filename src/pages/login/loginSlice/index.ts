/*
 * @Author: ajie.deng
 * @Date: 2022-01-08 09:55:58
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-03-09 15:41:42
 * @FilePath: \saasplatform\src\pages\login\loginSlice\index.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {post,get} from '../../../fetch';

//全局路径
const baseUrl='http://10.10.30.216:8686'

// 云端登录接口
export const rqLogin:any  = createAsyncThunk('/login', async (options: {url:string, account: string, password: string,timestamp:string,messageid:string,signature:string,callback:()=>void }) => {
    return await post({
        url: options.url,
        data: {
            account: options.account,
            password: options.password
        },
        headers: {
            timestamp:options.timestamp,
            messageid:options.messageid,
            signature:options.signature,
            'Content-type': 'application/json'
        }
    })
  });

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        ready: false,
        loading: false,
        loginInfo: '',
        loginRes:''
    },
    reducers: {
        loadingUpdate: (state: any, action) => {
            state.loading = action.payload
        },
        readyUpdate: (state: any, action) => {
            state.ready = action.payload
        },
        clearlogRes:(state: any)=>{
            state.loginRes=null;
            state.loginInfo=null
        }
    },
    extraReducers: {
        [rqLogin.fulfilled]: (state, action) => {
            console.log('res====',action);
            state.loginInfo = action.payload.data;
            state.loginRes = action.payload;
        }

    }

})

export default loginSlice.reducer

export const { loadingUpdate, readyUpdate } = loginSlice.actions;

export const getLoading = (state: any) => state.login.loading;

export const loginRes=(state:any)=>state.login.loginRes;
export const loginInfo=(state:any)=>state.login.loginInfo;
export const logOut = loginSlice.actions.clearlogRes();
