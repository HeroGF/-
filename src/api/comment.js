import request from '@/utils/request'

/**
 * 获取评论或评论回复
 * @param {*} params 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
 * @returns Promise
 */
export const getCommentsAPI = (params) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params
  })
}

/**
 * 对文章或者评论进行评论
 * @param {*} data 评论信息参数
 * @returns
 */
export const addCommentsAPI = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}
