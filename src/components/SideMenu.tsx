/*
 * @Author: ajie.deng
 * @Date: 2022-01-05 15:10:04
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-03-09 14:50:23
 * @FilePath: \saasplatform\src\components\SideMenu.tsx
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import React, { useState } from "react";
import { Layout, Menu } from 'antd';
import { ReactComponent as ResSvg } from '@/assets/svg/package.svg';
import { ReactComponent as ProSvg } from '@/assets/svg/Profile.svg';
import { ReactComponent as IhgSvg } from '@/assets/svg/ihg.svg';
import { ReactComponent as UserSvg } from '@/assets/svg/people.svg';
import { useHistory } from "react-router-dom";
import '@/assets/css/SideMenu.css'
import { getUserrole } from "../fetch/ServiceConfig";
const { Sider } = Layout;
export default function SideMenu() {
    const history = useHistory();
    const path = ['/resource', '/profile', '/ihg', '/user'];
    const location = history.location.pathname;
    const selectKey = path.findIndex((value) => value === location);
    const permission = getUserrole() == "1" ? true : false;
    const click = (item: any, key: number, keyPath: string, domEvent: any) => {
        const ikey = item.key;
        switch (parseInt(ikey)) {
            case 1:
                history.push('/resource');
                break;
            case 2:
                history.push('/profile');
                break;
            case 3:
                history.push('/ihg');
                break;
            case 4:
                history.push('/user');
                break;
        }

    }
    // console.log(selectKey, 'menuSelected',history);
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                onClick={click as any}
                mode="inline"
                defaultSelectedKeys={[`${selectKey + 1}`]}
                defaultOpenKeys={['sub1']}
                // selectedKeys={[menuSelected]}
                style={{ height: '100%', borderRight: 0 }}>
                <Menu.Item key="1" icon={<ResSvg />}>
                    资源包
                </Menu.Item>
                <Menu.Item key="2" icon={<ProSvg />}>
                    Profile
                </Menu.Item>
                <Menu.Item key="3" icon={<IhgSvg />}>
                    网关数据
                </Menu.Item>
                {permission &&
                    <Menu.Item key="4" icon={<UserSvg />}>
                        人员管理
                    </Menu.Item>
                }

            </Menu>
        </Sider>

    )
}