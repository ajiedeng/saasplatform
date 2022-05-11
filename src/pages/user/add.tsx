
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, message, Button, Space, Select, Radio, Modal } from 'antd';
import { CloseOutlined, ExclamationCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { rqAddUser, rqDeleteUser, rquserList } from "../../root/globalSlice";
import { useHistory, useLocation } from "react-router-dom";
const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 14 },
};
const { Option } = Select;

export default function Add() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [mask,setMask]=useState(false)

    const onClose = () => {
        message.destroy('addRe');
        setMask(false)
    }
    const onFinishFailed = async (values: any, errorFields: any, outOfDate: any) => {
        console.log('onFinishFailed', values, errorFields, outOfDate);
        setMask(true)
        message.warning({
            content: <div className="my-icon"><span>内容未填写，请补充后提交</span><div onClick={onClose}><CloseOutlined style={{ color: '#D9D9D9' }} /></div></div>,
            className: 'custom-warning',
            duration: 0,
            style: {
                marginTop: '20vh',
            },
            key: 'addRe'
        });
    }
    const location = useLocation();
    const memberid = location.pathname.split('/').filter(i => i)[2];
    const messageid = Math.random().toString(36).slice(-8); //随机字符串
    useEffect(() => {
        dispatch(rquserList({
            url: 'user/queryuserinfo',
            memberid: memberid
        }))
    }, [dispatch]);
    const onFinish = (values: any) => {
        console.log(memberid, '.........onFishish', values);
        if (memberid) {
            dispatch(rqAddUser({
                url: '/user/modmemberinfo',
                memberid: memberid,
                account: values.account,
                password: values.password,
                name: values.name,
                email: values.email,
                role: parseInt(values.role),
                jobnum: values.jobnum,
                sex: values.sex
            }))
        } else {
            dispatch(rqAddUser({
                url: '/user/createmember',
                managerid: memberid,
                account: values.account,
                password: values.password,
                name: values.name,
                email: values.email,
                role: parseInt(values.role),
                jobnum: values.jobnum,
                sex: values.sex
            }))
        }
        history.goBack();
    };
    const { userlist } = useSelector((state: any) => state.global);
    const [pwrShow, setpwrShow] = useState(false)
    const reSet = (value: any, event: any) => {
        const messageid = Math.random().toString(36).slice(-8); //随机字符串
        console.log(messageid, 'value, event', value, event);
        form.setFieldsValue({ password: messageid })
        setpwrShow(true)
    }
    const list = Object.keys(userlist).length !== 0 && userlist.data;
    const getId = list && list.userid;
    const history = useHistory();
    useEffect(() => {
        if (userlist.errcode === 1103) {
            message.error(userlist.errmsg)
        }
        form.setFieldsValue({ ...list, role: !memberid ? '请选择角色' : (list.role ? '管理员' : '员工'), sex: !memberid ? '男' : list.sex, password: messageid })
    }, [dispatch, getId])

    const delUser = () => {
        showDeleteConfirm()
    }
    const { confirm } = Modal;
    function showDeleteConfirm() {
        confirm({
            wrapClassName: 'delModal',
            title: '此操作将永久删除该人员，是否继续？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                console.log('OK');
                dispatch(rqDeleteUser({
                    url: '/user/memberdel',
                    memberid: memberid
                }))
                history.goBack();
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    return (

        <div className="add-user">
            <h3>
                {!Boolean(memberid) && ' 新增人员'}
            </h3>

            <div className="form-add-user">
                <Form {...layout} name="nest-messages" onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed as any}
                    layout="horizontal"
                >
                    <Form.Item label="账号：">
                        <Space>
                            <Form.Item
                                name={'account'}
                                noStyle
                                rules={[
                                    { required: true, message: '' },
                                    // { pattern: /^[0-9]*$/, message: '产品类型必须是数字组成' }
                                ]}
                            >
                                <Input style={{ width: 280 }} disabled={Boolean(memberid)} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="密码：">
                        <Space>
                            <Form.Item
                                name={'password'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input.Search
                                    addonBefore="xxxx"
                                    type={memberid && !pwrShow ? "password" : ''}
                                    style={{ width: 280 }}
                                    enterButton={memberid && !pwrShow ? <a>重置为初始密码</a> : <ReloadOutlined />}
                                    onSearch={reSet}
                                    prefix={memberid&&!pwrShow?'':"初始密码为："}
                                />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="昵称：">
                        <Space>
                            <Form.Item
                                name={'name'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="邮箱：">
                        <Space>
                            <Form.Item
                                name="email"
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="角色：">
                        <Space>
                            <Form.Item
                                initialValue={'管理员'}
                                name={'role'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Select placeholder="请选择角色">
                                    <Option value="1">管理员</Option>
                                    <Option value="0">员工</Option>
                                </Select>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="工号：">
                        <Space>
                            <Form.Item
                                name={'jobnum'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="性别：">
                        <Space>
                            <Form.Item
                                name={'sex'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Radio.Group>
                                    <Radio value={'男'}>男</Radio>
                                    <Radio value={'女'}>女</Radio>
                                </Radio.Group>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 1 }}>
                        <Space style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Button type="primary" htmlType="submit">
                                {memberid ? '保 存' : '提 交'}
                            </Button>
                            {
                                Boolean(memberid) && <Button type="primary" danger onClick={delUser}> 删 除</Button>
                            }

                        </Space>

                    </Form.Item>
                </Form>
            </div>
            {mask&&<div className="mask"></div>}
        </div>
    )
}
