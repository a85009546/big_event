// 導入 request.js 請求工具
import request from '@/utils/request'

// 提供調用註冊接口的函數
export const userRegisterService = (registerData) => {
  // 借助 UrlSearchParams 完成傳遞
  const params = new URLSearchParams();
  for(let key in registerData){
    params.append(key, registerData[key]);
  }
  return request.post('/user/register', params)
}