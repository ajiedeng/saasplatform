
import { PaperClipOutlined } from "@ant-design/icons";
import { Spin, Table } from "antd";
import moment from "moment";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchAdd from "../../components/SearchAdd";
import { postDownload, rqQuery } from "../../root/globalSlice";

/*
下载资源不成功
*/

interface DataType {
    key: React.Key;
    ctime: string;
    family: string,
    newdid: string,
    did: string,
    account: string,
    file: any[];
}
const download = (did: string, newdid: string, pid: string) => {
    postDownload({ url: '/ihgbackupdata/download', did: did, newdid: newdid, pid: pid });
}


export default function Ihg() {

    const columns = [
        {
            title: '备份时间',
            dataIndex: 'ctime'
        },
        {
            title: '旧网关',
            dataIndex: 'did',
        },
        {
            title: '新网关',
            dataIndex: 'newdid',
        },
        {
            title: '归属账号',
            dataIndex: 'account'
        },
        {
            title: '归属家庭',
            dataIndex: 'family',
        },
        {
            title: '文件',
            dataIndex: 'file',
            render: (text: any[]) => <span onClick={() => {
                const pid = text&&text[1]['pid'];
                const did = text&&text[1]['did'];
                const newdid = text&&text[1]['newdid'];
                console.log(pid, did, newdid, 'ddddddd', text);
                download(did, newdid, pid);
            }}><PaperClipOutlined /><a>{text&&text[0]}</a></span>
        }
    ];
    const [search, setSearch] = useState(false);
    const onSearch = (did: string) => {
        setSearch(true)
        did && dispatch(rqQuery({
            url: '/ihgbackupdata/query',
            did: did
        }))
    }
    const onChange = (e: any) => {
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
    }
    const dispatch = useDispatch();


    const [resourceList,setresourceList]=useState([]);
    const { querylist } = useSelector((state: any) => state.global);
    const _total = querylist.errcode === 200 && querylist.length !== 0 && querylist.data.total;
   
    const getList = useCallback(()=>{
        dispatch(rqQuery({
            url: '/ihgbackupdata/querylist',
            offset: 1,
            limit: _total > 10 ? _total : 10
        }))
    },[_total, dispatch])
    useEffect(() => {
        !search && getList();
    }, [search, getList]);

    const [loading, setloading] = useState(false)
    useEffect(() => {
        let timer
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            setloading(false);
        }, 1000);
    }, [])
 
    const profiles = querylist.errcode === 200 && querylist.length !== 0 && querylist.data?.ihgbackupinfos;
    const queryDid = querylist.errcode === 200 && querylist.length !== 0 && querylist.data;
    const key=Object.keys(queryDid)[0]
    // console.log('----get------', profiles,queryDid);
    // console.log('----index-----ihglist', querylist,key);
    useMemo(()=>{
        const searArr:any=[];
        const arr:any=[];
        if (key!=="ihgbackupinfos") {
            if(key===undefined){
                setresourceList([]);
            }else{
                arr.push(queryDid)
                arr && arr.map((item: any, index: number) => {
                    return searArr.push(
                        {
                            key: `${index}`,
                            ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss'),
                            did: item.did,
                            newdid: item.newdid,
                            family: item.family,
                            account: item.account,
                            file: [item.did + '.zip', { did: item.did, newdid: item.newdid, pid: item.pid }]
                        }
                    )
                })
            }
            
        }else{
            profiles && profiles.map((item: any, index: number) => {
                return searArr.push(
                    {
                        key: `${index}`,
                        ctime: moment(item.ctime).format('YYYY-MM-DD HH:mm:ss'),
                        did: item.did,
                        newdid: item.newdid,
                        family: item.family,
                        account: item.account,
                        file: [item.did + '.zip', { did: item.did, newdid: item.newdid, pid: item.pid }]
                    }
                )
            })
           
        }
        setresourceList(searArr);
    },[key, profiles, queryDid])

    console.log('----index-----resourceList', resourceList);
    return (
        <div>
            <SearchAdd onSearch={onSearch as any} onChange={onChange as any} Refresh={refresh} Add={add} noAdd={false} placeholder={'请输入产品did'} />
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