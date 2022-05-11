/*
 * @Author: ajie.deng
 * @Date: 2022-01-05 15:53:01
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-02-23 14:39:36
 * @FilePath: \saasplatform\src\pages\frame\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import React, { Component, ReactNode, useEffect } from "react";
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import TopHeader from "../../components/TopHeader";
import SideMenu from "../../components/SideMenu";
import MainContent from "../../components/MainContent";
import { Layout } from 'antd';

import Resources from '../../pages/resources';
import AddResources from '../../pages/resources/add';
import AddProfiles from '../../pages/profile/add'
import Profile from '../../pages/profile';
import Ihg from '../../pages/ihg';
import User from '../../pages/user';
import AddUser from '../../pages/user/add';
import SetAccout from '../../pages/user/accoutSet';
import { useSelector } from "react-redux";


export default function Frame() {
    return (
        <Layout>
            <TopHeader />
            <Layout>
                <SideMenu />
                <MainContent>
                    <Switch>
                        <Route exact path={'/resource'} render={(props) => <Resources />} />
                        <Route exact path={'/resource/add'} render={(props) => <AddResources />} />
                        <Route exact path={'/resource/detail/:key'} render={(props) => <AddResources />} />
                        <Route exact path={'/profile'} render={(props) => <Profile />}  />
                        <Route exact path={'/profile/add'} render={(props) => <AddProfiles />} />
                        <Route exact path={'/profile/detail/:key'} render={(props) => <AddProfiles />} />
                        <Route exact path={'/ihg'} render={(props) => <Ihg />} />
                        <Route exact path={'/user'} render={(props) => <User />} />
                        <Route exact path={'/user/add'} render={(props) => <AddUser />} />
                        <Route exact path={'/user/detail/:key'} render={(props) => <AddUser />} />
                        <Route exact path={'/accoutset'} render={(props) => <SetAccout />}></Route>
                    </Switch>
                </MainContent>
            </Layout>
        </Layout>
    )
}