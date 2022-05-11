
import React from "react";
import { Input, Space, Button } from 'antd';
import { ReactComponent as AddSvg } from '@/assets/svg/add.svg';
import '@/assets/css/SearchAdd.scss';
const { Search } = Input;

interface Props {
    onSearch: () => void,
    onChange: () => void,
    placeholder?: string,
    Refresh: () => void,
    Add: () => void,
    noAdd?: boolean
}
export default function SearchAdd({ onSearch, onChange, placeholder = '请输入产品pid', Refresh, Add, noAdd = true }: Props) {
    const search = (value: any) => console.log(value);
    return (
        <div className="SearchAdd">
            <Space direction="vertical">
                <Search
                    placeholder={placeholder}
                    allowClear
                    enterButton="搜索"
                    size="large"
                    onSearch={onSearch}
                    onChange={onChange}
                    // style={{ width: 'calc(100% + 200px)' }}
                    style={{ width: 552 }}

                />
            </Space>
            <div className="right-btn">
                <Button onClick={Refresh}>刷 新</Button>
                {
                   noAdd&& <Button type="primary" icon={<AddSvg />} onClick={Add} >
                        新 增
                    </Button>
                }
            </div>

        </div>
    )
}