<template>
  <div class="login">
    <!-- 登陆表单区域 -->
    <el-card class="login-card">
      <el-form
        label-width="0"
        ref="loginFormRef"
        :rules="LoginRules"
        :model="LoginForm"
        class="login-form"
      >
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input v-model="LoginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <!-- 密码 -->
          <el-input v-model="LoginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
 
<script>
//导入网络请求
import { loginReq } from 'network/admin/login'

export default {
  name: 'Login',
  data() {
    let checkUsername = (rule, value, callback) => {
      const regUsername = /^[a-zA-Z][\w]{2,9}$/
      if (regUsername.test(value)) return callback()
      callback(new Error('请输入合法的用户名'))
    }

    let checkPassword = (rule, value, callback) => {
      const regPsw = /^[\w.]{6,15}$/
      if (regPsw.test(value)) return callback()
      callback(new Error('请输入合法的登陆密码'))
    }

    return {
      //登陆表单的数据绑定对象
      LoginForm: {
        username: '',
        password: ''
      },
      //表单验证规则
      LoginRules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            validator: checkUsername,
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登陆密码',
            trigger: 'blur'
          },
          {
            validator: checkPassword,
            trigger: 'blur'
          }
        ],
      }
    }
  },
  methods: {
    //点击按钮,重置表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    },
    login() {

      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请输入格式正确的用户名和密码')

        const res = await loginReq(this.LoginForm)
        if (!res) return

        this.$message.success('登陆成功')
        // 保存token
        sessionStorage.setItem('token', res.data.token)
        // 跳转到main
        this.$router.push('/')

      })

    }
  }
}
</script>
 
<style  scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #b3c0d1;
}
.login-card {
  position: absolute;
  left: 50%;
  top: 50%;
  padding: 30px;
  transform: translate(-50%, -50%);
  width: 25%;
  height: 30%;
  min-width: 350px;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.login-form {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 75%;
  margin-top: 15px;
}
</style>