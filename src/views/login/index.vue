<template>
  <div class='login-container'>
    <el-form
      :model='loginForm'
      :rules='loginRules'
      ref='loginFormRef'
      class='login-form'
    >
      <div class='title-container'>
        <h3 class='title'>用户登录</h3>
      </div>

      <!-- username -->
      <el-form-item prop='username'>
        <span class='svg-container'>
          <SvgIcon icon='user' />
        </span>
        <el-input
          v-model='loginForm.username'
          placeholder='username'
          name='username'
          type='text'
        />
      </el-form-item>

      <!-- password -->
      <el-form-item prop='password'>
        <span class='svg-container'>
          <SvgIcon icon='password' />
        </span>
        <el-input
          v-model='loginForm.password'
          :type='passwordType'
          placeholder='password'
          name='password'
        />
        <span @click='onChangePwdType' class='show-pwd'>
          <SvgIcon :icon="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <!-- 登录按钮 -->
      <el-button
        @click='handleLogin'
        :loading='loading'
        type='primary'
        style='width: 100%; margin-bottom: 30px'
      >
        登录
      </el-button>
    </el-form>
  </div>
</template>

<script setup>
// 表单校验：
// 1. 为 el-form 绑定 model 表单数据
// 2. 为 el-form 绑定 rules 表单验证规则
// 3. 为 el-form-item 绑定 prop 表单域 model 字段
import { validatePassword } from './rules'
import { useStore } from 'vuex'
import { ref } from 'vue'

// 数据源
const loginForm = ref({
  username: 'super-admin',
  password: '123456'
})

// 验证规则
const loginRules = ref({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: '用户名为必填项'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      // 自定义校验函数
      validator: validatePassword()
    }
  ]
})

// 处理密码框文本显示
// el-input 绑定 type 属性，密码和明文根据数据 type 来控制
const passwordType = ref('password')
// 更改数据事件
const onChangePwdType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

// 登录请求动作
const store = useStore()
const loginFormRef = ref(null)
const loading = ref(false)
const handleLogin = () => {
  loginFormRef.value.validate(valid => {
    if (!valid) return
    loading.value = true
    store.dispatch('user/login', loginForm.value).then(() => {
      loading.value = false
    })
  })
}
</script>

<style lang='scss' scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  width: 100%;
  min-height: 100%;
  background: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba($color: #000000, $alpha: 0.1);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        height: 47px;
        border: 0;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        background: transparent;
        -webkit-appearance: none;
        color: $light_gray;
        caret-color: $cursor;
      }
    }

    .svg-container {
      display: inline-block;
      vertical-align: middle;
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        color: $light_gray;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
