<template>
  <div class="login">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="ruleForm.password" />
      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import {loginApi} from '@/api'
import {useRouter} from 'vue-router'

let router = useRouter()
const formSize = ref('default')
let ruleFormRef = ref()
const ruleForm = reactive({
  email: '',
  password:''
})

const rules = reactive({
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
})

const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      loginApi(ruleForm).then(res=>{
        console.log(res.data);
        localStorage.setItem('token',res.data.access_token)
        router.push('/')
      })

    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .el-form{
    width: 600px;
    box-shadow:  0 0 10px 3px #cccccc7c;
    padding: 100px 50px 100px 0;
    background-color: #fff;
  }
}
</style>