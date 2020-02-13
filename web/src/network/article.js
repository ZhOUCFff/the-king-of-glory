import { request } from './request'

//根据id查询文章
function getArticleById(id) {
  return request({
    url: `/article/${id}`
  })
}

export {
  getArticleById
}