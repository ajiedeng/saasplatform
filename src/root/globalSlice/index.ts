import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Encrypt } from '../../utils'
import { post, get,DELETE } from '../../fetch';




// 云端上传接口
export const rqUpload: any = createAsyncThunk('/upload', async (options: { url: string, pid: string, id?: string, type: any, name: string, describe: string, file: any }) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    const _formData: FormData = options.file;
    _formData.append('type', options.type )
    _formData.append('pid', options.pid)
    _formData.append('name', options.name)
    _formData.append('describe', options.describe)
    options.id&&_formData.append('id', options.id + '')

    return await post({
        url: options.url,
        data: _formData,
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token
        }
    })
});
// 版本查询接口(搜索) querypidlist
export const rqQuery: any = createAsyncThunk('/query', async (options: { url: string, pid?: string,did?: string, type?: number, offset?: number, limit?: number }) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    return await post({
        url: options.url,
        data: {
            pid: options.pid,
            did: options.did,
            type: options.type,
            offset: options.offset,
            limit: options.limit
        },
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token,
            'Content-type': 'application/json'
        }
    })
});

// 下载接口
export async function postDownload(options: { url: string, pid: string, type?: number,did?:string,newdid?:string }) {
    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    const request = {
        body: JSON.stringify({ pid: options.pid,did:options.did,newdid:options.newdid, type: options.type }),
        method: 'POST',
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token,
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }

    const response: any = await fetch(options.url, request)
    const filename = response.headers.get('content-disposition').split(';')[1].split('=')[1]
    const blob = await response.blob()

    const link = document.createElement('a')
    link.download = decodeURIComponent(filename)
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob)
    document.body.appendChild(link)
    link.click()
    URL.revokeObjectURL(link.href)
    document.body.removeChild(link);
}

// 请求人员列表接口
export const rquserList: any = createAsyncThunk('/user/query', async (options: { url: string,memberid?:string,name?:string}) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');


    return await get({
        url: options.url,
        data: {
            memberid:options.memberid,
            name:options.name
        },
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token
        }
    })
});

// 新增人员接口
export const rqAddUser: any = createAsyncThunk('/user/add', async (options: { url: string,memberid?:string, account?: string, password: string, name: string, email: string,role:number, jobnum:string,sex?:string}) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    return await post({
        url: options.url,
        data: {
            memberid:options.memberid,
            account: options.account,
            password: options.password,
            name: options.name,
            email: options.email,
            role:options.role,
            jobnum:options.jobnum,
            sex:options.sex
        },
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token,
            'Content-type': 'application/json'
        }
    })
});

//管理员删除成员账号
export const rqDeleteUser: any = createAsyncThunk('/user/delete', async (options: { url: string,memberid:string}) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    return await DELETE({
        url: options.url,
        data: {
            memberid:options.memberid,
        },
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token,
            'Content-type': 'application/json'
        }
    })
});

// 账号信息更新
export const rqUpdateUser: any = createAsyncThunk('/user/update', async (options: { url: string,memberid?:string, account?: string,oldpwd:string,newpwd:string, password: string, name: string, email: string,role:number, jobnum:string,sex?:string}) => {

    const timestamp = Date.parse(new Date().toString()) / 1000; //时间戳
    const messageid = Math.random().toString(36).slice(-6); //随机字符串
    const stra = timestamp + '_' + messageid;
    let signature = Encrypt(stra);//aes加密
    const access_token: any = localStorage.getItem('access_token');
    const userid: any = localStorage.getItem('userid');

    return await post({
        url: options.url,
        data: {
            account: options.account,
            oldpwd:options.oldpwd,
            newpwd:options.newpwd,
            password: options.password,
            name: options.name,
            email: options.email,
            role:options.role,
            jobnum:options.jobnum,
            sex:options.sex
        },
        headers: {
            timestamp: timestamp.toString(),
            messageid: messageid,
            signature: signature,
            userid: userid,
            access_token: access_token,
            'Content-type': 'application/json'
        }
    })
});


export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        Response: '',
        querylist: [],
        userlist:{},
        status: ''
    },
    reducers: {
        listClear(state) {
            state.querylist = [];
        },
        StatusClear(state){
            state.status = '';
        }
    },
    extraReducers: {
        [rqUpload.fulfilled]: (state: any, action) => {
            console.log('=====rqUpload.fulfilled======', action.payload)
            state.Response = action.payload;
            state.status=action.payload.errcode;
        },
        [rqQuery.fulfilled]: (state: any, action) => {
            console.log('=====rqQuery.fulfilled======', action.payload)
            state.querylist = action.payload;
            state.status=action.payload.errcode;
        },
        [rquserList.fulfilled]: (state: any, action) => { 
            console.log('=====rquserList.fulfilled======', action.payload)
            state.userlist = action.payload;
            state.status=action.payload.errcode;
        },
        [rqUpdateUser.fulfilled]: (state: any, action) => { 
            console.log('=====rqUpdateUser.fulfilled======', action.payload)
            state.userlist = action.payload;
            state.status=action.payload.errcode;
        },
        [rqAddUser.fulfilled]: (state: any, action) => { 
            console.log('=====rqAddUser.fulfilled======', action.payload)
            state.userlist = action.payload;
            state.status=action.payload.errcode;
        },
        [rqDeleteUser.fulfilled]: (state: any, action) => { 
            console.log('=====rqDeleteUser.fulfilled======', action.payload)
            state.userlist = action.payload;
        },

        [rqUpload.rejected]: (state, action) => {
            try {
                console.log('=====rqUpload.rejected======', action.payload)
                const { Response } = action.payload;
                state.Response = Response.errmsg
            } catch (error) {
                console.log('---rqUpload.rejected---error--', error)
            }
        },
        [rqQuery.rejected]: (state, action) => {
            try {
                console.log('=====rqQuery.rejected======', action.payload)
                const { querylist } = action.payload;
                state.querylist = querylist.errmsg;
            } catch (error) {
                console.log('---rqQuery.rejected---error--', error)
            }
        },
        [rquserList.rejected]: (state, action) => {
            try {
                console.log('=====rquserList.fulfilled======', action.payload)
                const { userlist } = action.payload;
                state.userlist = userlist.errmsg;
            } catch (error) {
                console.log('---rquserList.fulfilled---error--', error)
            }
        },
        [rqUpdateUser.rejected]: (state, action) => {
            try {
                console.log('=====rqUpdateUser.fulfilled======', action.payload)
                const { userlist } = action.payload;
                state.userlist = userlist.errmsg;
            } catch (error) {
                console.log('---rqUpdateUser.fulfilled---error--', error)
            }
        },
        [rqAddUser.rejected]: (state, action) => {
            try {
                console.log('=====rqAddUser.fulfilled======', action.payload)
                const { userlist } = action.payload;
                state.userlist = userlist.errmsg;
            } catch (error) {
                console.log('---rqAddUser.fulfilled---error--', error)
            }
        },
        [rqDeleteUser.rejected]: (state, action) => {
            try {
                console.log('=====rqDeleteUser.fulfilled======', action.payload)
                const { userlist } = action.payload;
                state.userlist = userlist.errmsg;
            } catch (error) {
                console.log('---rqDeleteUser.fulfilled---error--', error)
            }
        }
    }
})


export default globalSlice.reducer

export const Response = (state: any) => state.global.Response;
export const status = (state: any) => state.global.status;
export const listClearActions = globalSlice.actions;
export const ClearStatusActions = globalSlice.actions.StatusClear();