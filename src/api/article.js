// 所有关于文章的接口
import request from '@/utils/request'

/**
 * 获取新闻详情
 * @param {Number,String} articleId
 * @returns Promise
 */
export const getArticleDetailAPI = (articleId) => {
  return request({
    // url: `/v1_0/articles/${articleId}`
    url: '/v1_0/articles/' + articleId
  })
}

/**
 * 关注用户
 * @param {String} target 关注用户的id
 * @returns Promise
 */
export const addFollow = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注用户
 * @param {Number,String} target 目标用户（被取消关注的用户id）
 * @returns Promise
 */
export const delFollow = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}

/**
 * 收藏文章
 * @param {integer} target 收藏的目标文章id
 * @returns Promise
 */
export const addCollect = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消收藏文章
 * @param {*} target 取消收藏的文章id
 * @returns Promise
 */
export const delCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
