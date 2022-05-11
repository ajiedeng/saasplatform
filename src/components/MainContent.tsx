import React,{ ReactNode } from "react";
import { Layout } from 'antd';
import BreadCrumb from "./BreadCrumb";
const { Content } = Layout;
interface Props{
    children:ReactNode
}
export default function MainContent({children}:Props) {
    return (
        <Layout style={{ padding: '0 24px 24px' }}>
            <BreadCrumb/>
            <Content
                className="site-layout-background"
                style={{
                    padding: 24,
                    margin: 0,
                    minHeight: 680,
                }}
            >
                {children}
            </Content>
        </Layout>

    )
}