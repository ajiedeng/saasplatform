
import { Form, Input, Space, Modal } from "antd";
import React, { useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { rqUpdateUser, rquserList } from "../../root/globalSlice";

import './style.scss';

const layout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 14 },
};
export default function SetAccout() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [editform] = Form.useForm();
    const [nameform] = Form.useForm();

    const editPwr = () => {
        setPwrVisible(true);
        editform.setFieldsValue({ oldpwd: '', newpwd: '' });
    }
    const editName = () => {
        setNameVisible(true);
        nameform.setFieldsValue({ name: info.name });
    }
    const onNameOk = (e: any) => {

        const role: any = localStorage.getItem('role')
        const Ro = JSON.parse(role).role
        console.log('onname----ok', { ...Ro, name: 'xx' });

        nameform
            .validateFields()
            .then((values) => {
                nameform.resetFields();
                console.log('onNameOk--values', values);
                dispatch(rqUpdateUser({
                    url: '/user',
                    ...values
                }))
                localStorage.setItem('role', JSON.stringify(Object.assign({}, { role: { ...Ro, name: values.name } })));
                setNameVisible(false)
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }
    const [pwrVisible, setPwrVisible] = useState(false);
    const [nameVisible, setNameVisible] = useState(false);
    const pwrOk = (e: any) => {
        console.log('on---ok', e);
        editform
            .validateFields()
            .then((values) => {
                editform.resetFields();
                console.log('pwrOk--values', values);
                dispatch(rqUpdateUser({
                    url: '/user/modpwd',
                    ...values
                }))
                setPwrVisible(false);

            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
        // form.setFieldsValue({ ...info,name: });    
    }
    // useMemo(() => {
    //     console.log('dispatch----rquserList');
    //     dispatch(rquserList({
    //         url: '/user/queryuserinfo',
    //         memberid: ''
    //     }))
    // }, [dispatch]);
    useEffect(() => {
        console.log('account--effect');
        dispatch(rquserList({
            url: '/user/queryuserinfo',
            memberid: ''
        }))
    }, [dispatch,pwrVisible])
    const { userlist } = useSelector((state: any) => state.global);
    const length = Object.keys(userlist).length;
    console.log('length---', Array.isArray(userlist.data));
    console.log('----account-set-----userlist', userlist);
    const info = length && !Array.isArray(userlist.data) && userlist.data;

    console.log(info, '...info...');
    useEffect(() => {
        console.log('SET---useEffect', info);
        form.setFieldsValue({ ...info });
        // editform.setFieldsValue({ oldpwd: '', newpwd: '' });

    }, [editform, form, info])
    return (
        <div className="account">

            <Form {...layout} name="set"
                form={form}
                layout="horizontal"
            >
                <Form.Item label="?????????">
                    <Space>
                        <Form.Item
                            name={'account'}
                            noStyle
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input style={{ width: 280 }} disabled />
                        </Form.Item>
                    </Space>
                </Form.Item>
                <Form.Item label="?????????">
                    <Space>
                        <Form.Item
                            name={'password'}
                            noStyle
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.Search
                                addonBefore="xxxx"
                                placeholder="input password"
                                type={"password"}
                                style={{ width: 280 }}
                                enterButton={<a>??????</a>}
                                onSearch={editPwr}
                            />
                        </Form.Item>
                    </Space>
                </Form.Item>
                <Form.Item label="?????????">
                    <Space>
                        <Form.Item
                            name={'name'}
                            noStyle
                            rules={[{ required: true, message: '' }]}
                        >
                            <Input.Search
                                addonBefore="xxxx"
                                placeholder="input password"
                                style={{ width: 280 }}
                                enterButton={<a>??????</a>}
                                onSearch={editName}
                            />
                        </Form.Item>
                    </Space>
                </Form.Item>

            </Form>
            <Modal
                forceRender
                title="????????????"
                centered
                closable={false}
                visible={pwrVisible}
                onOk={pwrOk}
                onCancel={() => setPwrVisible(false)}
                className="custom-modal"
                okText="??????"
                cancelText="??????"
            >
                <Form name="edit-password"
                    form={editform}
                    autoComplete="off"
                    initialValues={{ remember: true }}
                >
                    <Form.Item label="????????????">
                        <Space>
                            <Form.Item
                                initialValue={'234'}
                                name={'oldpwd'}
                                noStyle
                                rules={[
                                    {
                                        required: true,
                                        message: '??????????????????',
                                    },
                                    () => ({
                                        validator(_, value) {
                                            const password = userlist.data.password;
                                            // console.log(password,'input-----',value,getFieldValue('password'));
                                            if (!value || password === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('?????????????????????'));
                                        },
                                    }),
                                ]}
                            >
                                <Input style={{ width: 280 }} type="password" placeholder="??????????????????" />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="????????????">
                        <Space>
                            <Form.Item
                                initialValue={'124'}
                                name={'newpwd'}
                                noStyle
                                rules={[
                                    { min: 6, message: '????????????6???' },
                                    { max: 12, message: '????????????12???', },
                                    { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/, message: '????????????????????????????????????' }
                                ]}
                            >
                                <Input style={{ width: 280 }} type="password" placeholder="?????????6~12?????????????????????????????????" />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                forceRender
                title="????????????"
                centered
                closable={false}
                visible={nameVisible}
                onOk={onNameOk}
                onCancel={() => setNameVisible(false)}
                className="custom-modal"
                okText="??????"
                cancelText="??????"
            >
                <Form name="edit-name"
                    form={nameform}
                    autoComplete="off"
                    initialValues={{ remember: true }}
                >
                    <Form.Item label="??????">
                        <Space>
                            <Form.Item
                                name={'name'}
                                noStyle
                            >
                                <Input style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}