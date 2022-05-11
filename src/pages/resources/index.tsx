
import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from 'antd';
import { PaperClipOutlined } from '@ant-design/icons';
import SearchAdd from "../../components/SearchAdd";
import './style.scss'
import { useHistory } from "react-router-dom";
import moment from 'moment'
import { Spin } from 'antd';
import { rqQuery, listClearActions, postDownload } from "../../root/globalSlice";


interface DataType {
    key: React.Key;
    ctime: string;
    type: number,
    pid: string,
    name: string;
    version: string,
    file: any[];
    handle: any[];
}

export default function Resources() {
    const history = useHistory();
    const download = (type: number, pid: string) => {
        postDownload({ url: '/productsource/download', type: type, pid: pid });
    }
    const columns = [
        {
            title: '上传时间',
            dataIndex: 'ctime'
        },
        {
            title: '产品类型',
            dataIndex: 'type',
        },
        {
            title: '产品pid',
            dataIndex: 'pid',
        },
        {
            title: '产品名称',
            dataIndex: 'name'
        },
        {
            title: '版本',
            dataIndex: 'version',
        },
        {
            title: '文件',
            dataIndex: 'file',
            render: (text: any[]) => <span onClick={() => {
                const pid = text[1]['pid'];
                const type = text[1]['type'];
                download(type, pid);
            }}><PaperClipOutlined /><a>{text[0]}</a></span>
        },
        {
            title: '操作',
            dataIndex: 'handle',
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            render: (value: any[]) => <a onClick={() => { const pid = value[1]['pid']; const type = value[1]['type']; history.push(`resource/detail/${pid}_${type}`); }}>编辑</a>
        }
    ];
    const [search,setSearch]=useState(false);
    const onSearch = (pid: string) => {
        setSearch(true)
        pid && dispatch(rqQuery({
            url: '/productsource/querypidlist',
            pid: pid
        }))
    }
    const onChange = (e: any) => {
        if (Object.keys(e.currentTarget).length === 0){
            setSearch(false)
            getList();
        } 
    }
 

    const dispatch = useDispatch();
    const [loading, setloading] = useState(false)
    const { querylist,Response } = useSelector((state: any) => state.global);
    const _total=querylist.errcode === 200 && querylist.length !== 0 && querylist.data.total;
    const getList = () => {
        console.log('ggggggggg',_total);
        dispatch(rqQuery({
            url: '/productsource/querylist',
            offset: 1,
            limit: _total>10?_total:10
        }))
    }
    const refresh = () => {
        setloading(true)
        getList();
    }
    const add = () => {
        history.push('/resource/add');
        dispatch(listClearActions.listClear());
    }

    useEffect(() => {
        console.log('96----');
        !search && getList();
    }, [Response, _total, search])
    const resourceList: DataType[] = [];
  
    console.log('100----index-----resourceslist', querylist,Response);

    const product_sources = querylist.errcode === 200 && querylist.length !== 0 && querylist.data.product_sources;
    useEffect(() => {
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setloading(false);
        }, 1000);
    }, [querylist])
    product_sources && product_sources.map((item: any, index: number) => {
        return resourceList.push(
            {
                key: `${index}`,
                ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss'),
                type: item.type,
                pid: item.pid,
                name: item.name,
                version: item.version,
                file: [item.pid + '_' + item.type + '.zip', { pid: item.pid, type: item.type, key: index }],
                handle: ['操作', { pid: item.pid, type: item.type, key: index }]
            }
        )
    })
    // console.log(product_sources, 'index----resourceList', resourceList);
    return (
        <div>
            <SearchAdd onSearch={onSearch as any} onChange={onChange as any} Refresh={refresh} Add={add} />
            <Spin spinning={loading}>
                <div className="table-list">
                    <Table
                        columns={columns}
                        dataSource={resourceList}
                    />
                </div>
            </Spin>
        </div>
    )
}
