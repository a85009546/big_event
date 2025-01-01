// 訂製請求的實力

// 導入axios  npm install axios
import axios from 'axios';

import { ElMessage } from 'element-plus'
// 定義一個變量，紀錄公共的前綴 ,  baseURL
// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL})


// 添加響應攔截器
instance.interceptors.response.use(
    result=>{
        // 判斷業務狀態碼
        if(result.data.code === 0){
            return result.data;
        }

        // 操作失敗
        // alert(result.data.msg ? result.data.msg : '操作失敗')
        ElMessage.error(result.data.msg ? result.data.msg : '操作失敗')
        // 異步操作的狀態轉化為失敗
        return Promise.reject(result.data);
    },
    err=>{
        alert('服务异常');
        return Promise.reject(err); // 異部的狀態轉化成失敗的狀態
    }
)

export default instance;