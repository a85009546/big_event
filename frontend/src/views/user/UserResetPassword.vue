<script setup>
import { ref } from 'vue'
const passwordData = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})

import useUserInfoStore from '@/stores/userInfo.js'
const userInfoStore = useUserInfoStore();
const userInfo = ref({...userInfoStore.info})
// console.log(userInfo.value.password)
// 校驗原密碼的函數
import CryptoJS from 'crypto-js'
const checkPassword = (rule, value, callback) => {
  const md5Password = CryptoJS.MD5(value).toString();
  if(md5Password === ''){
    callback(new Error('請輸入原密碼'))
  }else if(md5Password !== userInfo.value.password) {
    callback(new Error('原密碼錯誤'))
  }else{
    callback()
  }
}
// 校驗密碼的函數
const checkRePassword = (rule, value, callback) => {
  if(value === ''){
    callback(new Error('請再次輸入密碼'))
  }else if(value !== passwordData.value.new_pwd) {
    callback(new Error('兩次輸入的密碼不一致'))
  } else {
    callback()
  }
}

// 定義表單校驗規則
const rules = {
    old_pwd: [
        { required: true, message: '請輸入密碼', trigger: 'blur' },
        { validator: checkPassword, trigger: 'blur'}
    ],
    new_pwd: [
        { required: true, message: '請輸入新密碼', trigger: 'blur' },
        { min: 5, max: 16, message: '長度在 5 到 16 個非空字符', trigger: 'blur' }
    ],
    re_pwd: [
        { required: true, message: '請輸入新密碼', trigger: 'blur' },
        { validator: checkRePassword, trigger: 'blur'}
    ]
}

import { userPasswordUpdateService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
// 修改密碼
const updatePassword = async () => {
    // 調用接口
    let result = await userPasswordUpdateService(passwordData.value);
    ElMessage.success(result.msg ? result.msg : '修改成功')
    // 更新 pinia 中的數據
    userInfoStore.info.password = passwordData.value.new_pwd;
    // 清空表單
    clearPassword()
}
// 重置密碼
const clearPassword = () => {
    passwordData.value.old_pwd = ''
    passwordData.value.new_pwd = ''
    passwordData.value.re_pwd = ''
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>重置密碼</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="passwordData" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="原密碼" prop="old_pwd">
                        <el-input v-model="passwordData.old_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="新密碼" prop="new_pwd">
                        <el-input v-model="passwordData.new_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="確認新密碼" prop="re_pwd">
                        <el-input v-model="passwordData.re_pwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updatePassword">修改密碼</el-button>
                        <el-button @click="clearPassword">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>