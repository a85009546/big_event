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

// 提供調用登入接口的函數
export const userLoginService = (loginData) => {
  // 借助 UrlSearchParams 完成傳遞
  const params = new URLSearchParams();
  for(let key in loginData){
    params.append(key, loginData[key]);
  }
  return request.post('/user/login', params)
}

// 獲取用戶詳細信息
export const userInfoService = () => {
  return request.get('/user/userInfo')
}

// 修改用戶信息
export const userInfoUpdateService = (userInfoData) => {
  return request.put('/user/update', userInfoData)
}

// 修改頭像
export const userAvatarUpdateService = (avatarUrl) => {
  const params = new URLSearchParams();
  params.append('avatarUrl', avatarUrl);
  // 注意，這裡是 patch 請求，不是 put
  return request.patch('/user/updateAvatar', params)
}

// 修改密碼
export const userPasswordUpdateService = (passwordData) => {
  return request.patch('/user/updatePwd', passwordData)
}