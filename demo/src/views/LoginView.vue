<template>
  <div class="login">
    <h3 style="color: #fff;text-align: center;margin-bottom: 20px;">登录</h3>
    <el-form :model="form">
      <el-form-item prop="name">
        <el-input prefix-icon="UserFilled" v-model="form.username" placeholder="用户名" />
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="Lock" type="password" show-password v-model="form.password" placeholder="密码" />
      </el-form-item>
      <el-form-item>
        <el-input prefix-icon="PieChart" v-model="form.code" placeholder="验证码">
          <template #append>
            <p @click="getcode" class="code">{{ form.code2 }}</p>
          </template>
        </el-input>

      </el-form-item>


      <el-form-item>
        <el-button type="primary" @click="onlogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

let router = useRouter()

const form = reactive({
  username: '',
  password: "",
  code: '',
  code2: ''
})

// const rules = reactive < FormRules > ({
//   username: [
//     { required: true, message: 'Please input Activity name', trigger: 'blur' },
//   ],
//   password: [
//     { required: true, message: 'Please input Activity name', trigger: 'blur' },
//   ],
//   password: [
//     { required: true, message: 'Please input Activity name', trigger: 'blur' },
//   ],
// })

const onlogin = () => {

  if (form.username == '' || form.password == '') {
    ElMessage.error('请输入用户名或密码')
  } else if (form.username != 'admin' || form.password != '123123') {
    ElMessage.error('用户名或密码错误')
  } else if (form.code != form.code2) {
    ElMessage.error('验证码错误')

  }
  else {

    localStorage.setItem('token', form.username)
    router.push('/')
  }
}

const getcode = () => {

  let code = "";
  for (let i = 0; i < 4; i++) {
    code += Math.floor(Math.random() * 10);
  }
  form.code2 = code;
}
getcode()

</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #313a49;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 400px;

    .el-form-item:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;



      .el-button {
        width: 100%;
      }
    }

  }
}

.code:hover {
  cursor: pointer;
}
</style>