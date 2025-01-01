// 訂製請求的實力

// 導入axios  npm install axios
import axios from 'axios';
// 定義一個變量，紀錄公共的前綴 ,  baseURL
const baseURL = 'http://localhost:8080';
const instance = axios.create({baseURL})


// 添加響應攔截器
instance.interceptors.response.use(
    result=>{
        return result.data;
    },
    err=>{
        alert('服务异常');
        return Promise.reject(err); // 異部的狀態轉化成失敗的狀態
    }
)

export default instance;