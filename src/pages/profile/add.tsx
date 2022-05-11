
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Space, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { rqQuery, rqUpload } from "../../root/globalSlice";


const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
};
export default function Add() {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([{}]);// 上传成功文件列表
    const [mask,setMask]=useState(false)
    const { querylist } = useSelector((state: any) => state.global);

    const list = querylist.length !== 0 && querylist.data
    const getId = list && list.id;
    const location = useLocation();
    const pathname = location.pathname.split('/').filter(i => i)[2];
    const _pid = pathname && pathname.split('_')[0];
    const _type = pathname && parseInt(pathname.split('_')[1]);
    console.log('.......list......', list);


    const normFile = (e: any) => { //如果是typescript, 那么参数写成 e: any 
        if (Array.isArray(e)) { return e; }
        return e && e.fileList;
    };

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
    useEffect(() => {
        console.warn('.........useEffect...........',querylist);
        dispatch(rqQuery({
            url: '/profile/query',
            pid: _pid,
            type: _type
        }))
        form.setFieldsValue(pathname&&querylist.data)
    }, [dispatch, getId]);
    const props: any = {
        beforeUpload: (file: any) => {
            let fileType = file.name.split('.');
            const fileDate = fileType.slice(-1);
            if (['json'].indexOf(fileDate[0]) < 0) {
                message.error('仅支持文件格式：.json格式附件!');
                return Upload.LIST_IGNORE;
            }
            setFileList([file]);
            return false;
        },
        maxCount: 1,
        accept: '.json',
        // defaultFileList: pathname && [
        //     {
        //         name: pathname ? `profile.json` : '',
        //         status: 'done'
        //     }],
        fileList,
    };
    const history = useHistory();
    const onFinish = (values: any) => {
        console.log(fileList, '.........onFishish', values);
        const formData = new FormData();
        fileList.forEach((file: any) => {
            formData.append("file", file);
        });
        dispatch(rqUpload({
            url: '/profile/upload',
            type: parseInt(values.type),
            pid: values.pid,
            name: values.name,
            describe: values.describe,
            file: formData,
            id: list.id
        }))
        history.goBack();

    };
    console.log('---pathname',pathname);
    return (

        <div className="add-resource">
            <h3>
                {!Boolean(pathname) && ' 新增Profile'}
            </h3>

            <div className="form-add-resource">
                <Form {...layout} name="nest-messages" onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed as any}
                    layout="horizontal"
                >
                    <Form.Item label="产品类型：">
                        <Space>
                            <Form.Item
                                initialValue={Boolean(pathname)? list.type:''}
                                name={'type'}
                                noStyle
                                rules={[
                                    { required: true, message: '' },
                                    { pattern: /^[0-9]*$/, message: '产品类型必须是数字组成' }
                                ]}
                            >
                                <Input style={{ width: 280 }} disabled={Boolean(pathname)} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="产品pid：">
                        <Space>
                            <Form.Item
                                initialValue={pathname && list.pid}
                                name={'pid'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input style={{ width: 280 }} disabled={Boolean(pathname)} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="产品名称：">
                        <Space>
                            <Form.Item
                                initialValue={pathname && list.name}
                                name={'name'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item label="版本描述：">
                        <Space>
                            <Form.Item
                                initialValue={pathname && list.describe}
                                name={'describe'}
                                noStyle
                                rules={[{ required: true, message: '' }]}
                            >
                                <Input.TextArea style={{ width: 280 }} />
                            </Form.Item>
                        </Space>
                    </Form.Item>

                    <Form.Item label="资源包：">
                        <Space>
                            <Form.Item
                                name="upload"
                                noStyle
                                rules={[{ required: true, message: '' }]}
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload {...props}>
                                    <Button icon={<UploadOutlined />}>上传文件</Button>
                                </Upload>
                            </Form.Item>
                        </Space>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                        <Space style={{ display: 'flex', marginBottom: 8 }} align="start">
                            <Button type="primary" htmlType="submit">
                                {pathname ? '保 存' : '提 交'}
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </div>
            {mask&&<div className="mask"></div>}
        </div>
    )

}