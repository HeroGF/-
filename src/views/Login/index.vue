<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" class="nav-bar" />
    <!-- 表单 -->
    <van-form ref="form" @submit="onSubmit" class="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <!-- 字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <!-- 验证码 -->
        <template #button>
          <van-button
            class="btn"
            type="default"
            size="small"
            round
            native-type="button"
            v-if="isShowCodeBtn"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            v-else
            :time="5 * 1000"
            format="ss 秒"
            @finish="isShowCodeBtn = true"
          />
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mobileRules, codeRules } from './rule'
// 引入API
import { login, sendCodeAPI } from '@/api'

import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCodeBtn: true
    }
  },
  methods: {
    ...mapMutations(['SET_TOKEN']),
    async onSubmit(values) {
      this.loading()
      try {
        // 登录
        const { data } = await login(this.mobile, this.code)
        // console.log(data)
        // 将token存进vuex
        this.SET_TOKEN(data.data)
        // 跳转路由
        this.$router.push('/profile')
        // 成功的提示
        this.$toast.success('登录成功')
      } catch (error) {
        // 细分一下失败：提示用户手机号和验证码
        // 如果是手机号或者验证码错了，用户能知道
        // error:1.js抛的错2.axios封装的error对象

        // axios封装的error对象
        // error.response.data 后端返回的数据
        // error.response.status后端返回的状态码
        if (error.response && error.response.status === 400) {
          this.$toast.fail(error.response.data.message)
        } else {
          // 1. js导致的错误， 2.507
          // console.dir(error)
          this.$toast.clear()
          throw error
        }
      }
    },
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
    },
    async sendCode() {
      // 0. 验证用户是否输入了有效的手机号
      //  - 1. form绑定ref
      //  - 2. $refs.form.validate(name)
      await this.$refs.form.validate('mobile')
      this.loading()
      // 1. 发送请求
      try {
        await sendCodeAPI(this.mobile)
        // 2. 开始显示倒计时
        this.isShowCodeBtn = false

        this.$toast.success('发送验证码成功')
      } catch (error) {
        if (
          error.response &&
          (error.response.status === 429 || error.response.status === 404)
        ) {
          this.$toast.fail(error.response.data.message)
        } else {
          this.$toast.clear()
          throw error
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}
:deep(.form) {
  .van-cell__title {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
.btn {
  height: 0.64rem;
  background-color: #eee;
  color: #a58594;
}
</style>
