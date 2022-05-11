
import React, { useCallback, useEffect } from "react";
import {
    Switch,
    Route,
    useLocation,
    useHistory,
    Redirect
} from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { rqLogin } from "./loginSlice";
import { Encrypt, Decrypt } from '../../utils'
import './style.css';
import logo from './images/logo.png'
import { ClearStatusActions } from "../../root/globalSlice";
const FormItem = Form.Item;


// const Account = "vifaadmin@vifa.com";
// const Password = "Admin1234";
export default function Login() {

    const history = useHistory();
    const dispatch = useDispatch();


    const onFinish = (values: any) => {
        const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
        const str = Math.random().toString(36).slice(-6); //随机字符串
        //aes加密
        const stra = timestamp + '_' + str;
        let aesParams = Encrypt(stra);
        dispatch(rqLogin({ url: '/user/login', account: values.username, password: values.password, timestamp: timestamp, messageid: str, signature: aesParams }))
    };
    const { loginInfo, loginRes } = useSelector((state: any) => state.login);
    const { status } = useSelector((state: any) => state.global);
    console.log(status,'....login....', loginInfo,loginRes);

    useEffect(() => {
        console.log('42....loginEffect....');
        if (loginInfo&&loginRes.errcode ===200) {
            localStorage.setItem('access_token', loginInfo.access_token);
            localStorage.setItem('userid', loginInfo.userid)
            localStorage.setItem('role', JSON.stringify(Object.assign({}, { role: { type: loginInfo.role, name: loginInfo.name } })));
            history.push('/resource');
        }else{
            localStorage.removeItem('access_token');
        }
    }, [history, loginInfo, loginRes])

    useEffect(()=>{
        dispatch(ClearStatusActions)
    },[dispatch])


    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);

    };

    // console.log(loginInfo,'........loginInfo',loginRes)
    return (
        <div className="loginPage">
            <div className="content">
                <div className="title"><img src={logo} alt="" />·威法资源管理平台</div>
                <Form
                    className="login-form"
                    name="basic"
                    // labelCol={{ span: 8 }}
                    // wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <FormItem
                        name="username"
                        rules={[
                            { required: true, whitespace: true, message: '请输入账号！' },
                            // { min: 4, message: '用户名最少4位'},
                            // { max: 12,message: '用户名最多12位',},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" />
                    </FormItem >

                    <FormItem
                        name="password"
                        rules={[{ required: true, message: '请填写密码！' }]}
                    >
                        <Input type="password" prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
                    </FormItem >

                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button" >
                            登录
                        </Button>
                    </FormItem >
                    {loginRes && loginRes.errcode === 1021 && <div className="errtips">账户或密码错误</div>}
                </Form>
            </div>
        </div>
    )

}
