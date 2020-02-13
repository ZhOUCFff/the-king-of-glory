import { request } from './request'

//根据id查询文章
function getHeroById(id) {
  return request({
    url: `/hero/${id}`
  })
}

export {
  getHeroById
}