
import { Spin, Table } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchAdd from "../../components/SearchAdd";
import { rqAddUser, rquserList } from "../../root/globalSlice";


interface DataType {
  key: React.Key;
  name: string;
  account: string,
  sex: string,
  role: string,
  email: string,
  jobnum: string,
  handle: any[];
}
export default function User() {

  const history = useHistory();
  const onSearch = (value: any) => {
    // console.log(value,'user onSearch value');
    dispatch(rquserList({
      url: '/user/getmembers',
      name: value,
    }))
  }
  const onChange = (e: any) => {
    console.log('search onChange', e)
    if (Object.keys(e.currentTarget).length === 0) getList();
  }
  const refresh = () => {
    setloading(true)
    getList();
  }
  const add = () => {
    console.log('add');
    history.push('/user/add');
  }
  const columns = [
    {
      title: '昵称',
      dataIndex: 'name'
    },
    {
      title: '账号',
      dataIndex: 'account'
    },
    {
      title: '性别',
      dataIndex: 'sex',
    },
    {
      title: '角色',
      dataIndex: 'role',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '工号',
      dataIndex: 'jobnum',
    },
    {
      title: '操作',
      dataIndex: 'handle',
      render: (value: any[]) => <a onClick={() => {
        console.log('user---index', value);
        const memberid = value[0]['memberid'];
        history.push(`user/detail/${memberid}`);
      }}>编辑</a>
    }
  ];
  const { userlist } = useSelector((state: any) => state.global);
  const [loading, setloading] = useState(false)
  useEffect(() => {
      let timer
      if (timer) {
          clearTimeout(timer)
      }
      timer = setTimeout(() => {
          setloading(false);
      }, 1000);
  }, [userlist])
  const dispatch = useDispatch();
  const getList = () => {
    dispatch(rquserList({
      url: '/user/getmembers',
      name: ''
    }))
  }
  useEffect(() => {
    getList();
  }, []);

  console.log('----index-----userlist', userlist);
  const profiles = userlist.errcode === 200 && userlist.length !== 0 && userlist.data;
  const list = useMemo(() => {
    const arr = Array.isArray(profiles) && profiles.map((item: any, index: number) => {
      return (
        {
          key: `${index}`,
          name: item.name,
          account: item.account,
          sex: item.sex,
          role: item.role ? '管理员' : '员工',
          email: item.email,
          jobnum: item.jobnum,
          handle: [{ memberid: item.userid }]
        }
      )
    })
    return arr
  }, [profiles]);
  return (
    <div>
      <SearchAdd onSearch={onSearch as any} onChange={onChange as any} Refresh={refresh} Add={add} placeholder="请输入人员名称" />
      <Spin spinning={loading}>
        <div className="table-list">
          <Table
            columns={columns}
            dataSource={list as any}
          />
        </div>
      </Spin>

    </div>
  )
}