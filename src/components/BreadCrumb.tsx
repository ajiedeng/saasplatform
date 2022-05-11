/*
 * @Author: ajie.deng
 * @Date: 2022-01-05 15:11:45
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-02-24 10:40:16
 * @FilePath: \saasplatform\src\components\BreadCrumb.tsx
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
import React from "react";
import { Breadcrumb } from 'antd';
import { useLocation, Link } from "react-router-dom";
import { breadcrumbNameMap } from "../fetch/ServiceConfig";
import '../assets/css/BreadCrumb.scss'

export default function BreadCrumb() {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter(i => i);
    console.log('pathSnippets',pathSnippets);
    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url: any = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        console.log('====url',url);
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{breadcrumbNameMap[url]}</Link>
            </Breadcrumb.Item>
        );
    });

    return (
        <Breadcrumb style={{ margin: '16px 0' }}>
            {breadcrumbItems}
        </Breadcrumb>
    )
}