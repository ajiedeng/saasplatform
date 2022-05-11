/*
 * @Author: ajie.deng
 * @Date: 2022-01-08 17:49:16
 * @LastEditors: ajie.deng
 * @LastEditTime: 2022-03-28 13:59:15
 * @FilePath: \smart_dimmer_developf:\Code\saasplatform\src\fetch\ServiceConfig.ts
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
const SERVICEURL = 'http://10.10.30.216:8686';
export { SERVICEURL }
export function getUsername() {
    const getname: any = localStorage.getItem('role');
    const username = getname&&JSON.parse(getname).role.name;
    return username
}
export function getUserrole() {
    const getname: any = localStorage.getItem('role');
    const role = getname&&JSON.parse(getname).role.type;
    return role
}

const breadcrumbNameMap: any = {
    '/resource': '资源包管理',
    '/resource/add': '新增资源包',
    '/resource/detail': '资源包详情',
    '/profile': 'Profile管理',
    '/profile/add': '新增Profile',
    '/profile/detail': 'Profile详情',
    '/ihg': '网关数据',
    '/user': '人员管理',
    '/user/add': '新增人员',
    '/user/detail': '人员详情',
    '/accoutset': '账号设置'
};
export {
    breadcrumbNameMap
}