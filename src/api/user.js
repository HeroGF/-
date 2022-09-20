// user.js 划分是跟后端接口文档
import request from '@/utils/request'

// 引入store
// import store from '@/store'

/**
 * 登录
 * @param {String} mobile 手机号
 * @param {Number} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'post',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */
export const sendCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己的信息
 * @returns Promise
 */
export const getUserInfoAPI = () => {
  return request({
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.tokenObj.token}`
    // }
  })
}

/**
 * 上传图片
 * @param {*} file 裁剪过后的图片的file对象
 * @returns Promise
 */
export const uploadPhoto = (file) => {
  const fm = new FormData()
  fm.append('photo', file)

  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}

/**
 * 获取用户个人资料
 * @returns Promise
 */
export const getUserProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

/**
 * 编辑用户个人资料
 * @param {*} data 请求的字段参数 发送几个保存几个，不发送的不修改
 * @returns Promise
 */
export const updateUserProfileAPI = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
