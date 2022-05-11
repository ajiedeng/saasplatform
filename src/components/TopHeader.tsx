/*
 * @Author: ajie.deng
 * @Date: 2022-01-05 15:09:35
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-03-10 15:20:07
 * @FilePath: \saasplatform\src\components\TopHeader.tsx
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import React, { useEffect } from "react";
import { Layout, Dropdown, Avatar, Button, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import logo from '@/assets/images/logo.png';
import '@/assets/css/TopHeader.css'
import { useHistory } from "react-router-dom";
import { getUsername } from '../fetch/ServiceConfig';
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../pages/login/loginSlice";
// import {logOut} from 
const { Header } = Layout;
export default function TopHeader() {
    const history = useHistory();
    const dispatch =useDispatch();
    const onClick = (item: any) => {
        if (item.key === 'user'){
            history.push('/accoutset');
        }else if(item.key === "logout"){
            localStorage.clear();
            dispatch(logOut)
            history.replace('/login')
        } 

    }
    const DropdownList = (
        <Menu className="drop-list" onClick={onClick as any}>
            <Menu.Item key="user">
                账号设置
            </Menu.Item>
            <Menu.Item key="logout">
                退出登录
            </Menu.Item>
        </Menu>
    );

    let username = getUsername();
    const { userlist } = useSelector((state: any) => state.global);
    const length = Object.keys(userlist).length;
    const info = length && !Array.isArray(userlist.data) && userlist.data;
    console.log('topHeader----',info)
  
    return (
        <Header className="header">
            <a className="logo" ><img src={logo} alt="" /><em>·</em>威法资源管理平台</a>
            <div className="header-right">
                <div className="dropdown-wrap" id="dropdown-wrap" style={{ cursor: 'pointer' }}>
                    <Dropdown overlay={DropdownList}>
                        <Button>
                            <Avatar size="small" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAADwElEQVRYR7WXTWwTVxDH/7Pe9Qf+ahyaOAmBUKeBAyqXSlUrUM/0A6lHxAWE1PbSG+IIoceKG5e2EqKXimMlWtpzRdWqgkurHiDEJTgkcQJx8Bf+2I9Bb8kG2/H6PRL7XfbwZub9dmbezDzCa6z5fH7EqTQ/AuFDZhwBMAUgvmmiDGCBCP+B8bsWC/46nU6vqZonFcFsdvmYCesCHJwggq6iwwwLGn4zoH+TyYz/IdPpCXJvIX9Qs82rzPyxzFCvfSK65QSMrw5PpR/6yfmCzGWXTjFb3wHkuX43LAC4TKR/MZOZuNHNUFeQ+9nFiwTMMrNS6FQJiYgZmD2Umfy6U2fbQQICzJdVje9IjuhSJ0wbiAgH4PzYb09s+3siBrTTrWHaAhGJSVbjH5WcCGga3kjGEI1GEDReXqKmaaFareFZsQLbcRQcxWXWQ0e9BN4Cmcsu/qJyO2LRCEZHUhAw3ZaAWF0roFKtSWHEbZrJTH4iBF0QUScstm7LNAXE2OgwiHrnMDNjZXVdCUYn/bioM67Fe9ncTWJ82gtEeGDqwJivJzp1hWcWHq1Iw8SEnw9n9p8kUbatcnNJVjGHhxIYTiVlTmvbXy8Usb5R6qkjKrAeD07Q3HzuDAPXZSfs3zeKcCgoE2vbrzeayD1eleoQcJbmsrnrzDgjk54+OAHNJ0H9dB3HwfzDJZlpEOEHuj+fuwPgXZn0IEEA3BUgTwDslYEMMjQAngqQOoCQDGRQybp5bkMZZFDXtxVEKTRCYRAFbRPEDY1Ssnqh62eJb0mHu8rXtzWH+tP0Xll0r69qQZMl82723YKmWuJ3c1AvXbfEU3BCuel5xiLhEEIhA8GgAT0Q2OrEouNato1m00SjYaJWbyixbzU9lTFAtP3UUALJeBS6HlA6wLJsFMtVFDZKEJB+q20MEEJ+g5Fh6Ng39ibEdyfLNC08XnkC8e1c2wYjIdBtVBRNbmoyrewFP1DhnYXFPEQTfLV8RsWXXmkfnkf2DrmzaT+WmGXXnm64psSzwnd49g7znhOaRnjrwPhrt34/aOGN/x8tw3FYkPR+TrTCxPZEZsfTw319YC3n17nyvKb2wPJgStXquWg48q2m0c6ytMM1jsNWtV77MhGNXuvmtZ5/XCgU3onHE9/reuC93eSJZdl/l8ulz1Op1L9+dpRcXyo9/ywcNs4bhv6+9wRRAGPTtP6q180ricSen2TySiCekbVi8e2YYZwMGMZxAj4IaNoQkeZWOGbHth1ng4E/bdO8XTHNmyPJ5AMZgLf/At/j2PAbUsw0AAAAAElFTkSuQmCC" />
                            {username} <DownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </div>
        </Header>
    )
}