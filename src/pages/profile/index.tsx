
import { PaperClipOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchAdd from "../../components/SearchAdd";
import { listClearActions, postDownload, rqQuery } from "../../root/globalSlice";
import moment from 'moment';
import { Spin } from 'antd';
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
const download = (type: number, pid: string) => {
    postDownload({ url: '/profile/download', type: type, pid: pid });
}

export default function Profile() {
    const [search,setSearch]=useState(false);
    const onSearch = (pid: string) => {
        setSearch(true)
        pid && dispatch(rqQuery({
            url: '/profile/querypidlist',
            pid: pid
        }))
    }
    const onChange = (e: any) => {
        // console.log('....search onChange....', e);
        if (Object.keys(e.currentTarget).length === 0) {
            setSearch(false)
            getList()
        }
    }
    const refresh = () => {
        setloading(true)
        getList();
    }
    const add = () => {
        console.log('add');
        history.push('/profile/add');
        dispatch(listClearActions.listClear());
    }
    const history = useHistory();
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
            render: (value: any[]) => <a onClick={() => {
                const pid = value[1]['pid'];
                const type = value[1]['type'];
                history.push(`profile/detail/${pid}_${type}`);
            }}>编辑</a>
        }
    ];
    const dispatch = useDispatch();
  

    const { querylist ,Response} = useSelector((state: any) => state.global);
    console.log('----index-----profilelist', querylist,Response);
    const data_name = querylist.errcode === 200 && querylist.length !== 0 && Object.keys(querylist.data)[0]
    const _total=querylist.errcode === 200 && querylist.length !== 0 && querylist.data.total;
    console.log('data_name', data_name,_total);
    async function getList() {
        dispatch(rqQuery({
            url: '/profile/querylist',
            offset: 1,
            limit: _total>10?_total:10
        }))
    }
    useEffect(() => {
        console.log('*********useEffect.......');
        !search && getList();

    }, [Response, _total, search]);
    const [loading, setloading] = useState(false)
    useEffect(() => {
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setloading(false);
        }, 1000);
    }, [querylist])
    let profileList: DataType[] = [];
    const profiles = querylist.errcode === 200 && querylist.length !== 0 && (querylist.data.profiles || (querylist.data && data_name == "profiles"));
    console.log('120getprofile', profiles);
    profiles && profiles.map((item: any, index: number) => {
        return profileList.push(
            {
                key: `${index}`,
                ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss'),
                type: item.type,
                pid: item.pid,
                name: item.name,
                version: item.version,
                file: [item.pid + '_' + item.type + '.json', { pid: item.pid, type: item.type, key: index }],
                handle: ['操作', { pid: item.pid, type: item.type, key: index }]
            }
        )
    })
    console.log('profileList====', profileList);
    return (
        <div>
            <SearchAdd onSearch={onSearch as any} onChange={onChange as any} Refresh={refresh} Add={add} />
            <Spin spinning={loading}>
                <div className="table-list">
                    <Table
                        columns={columns}
                        dataSource={profileList}
                    />
                </div>
            </Spin>
        </div>
    )
}
