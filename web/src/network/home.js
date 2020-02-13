import { request } from './request'

function getAds() {
  return request({
    url: '/ads'
  })
}

function getNews() {
  return request({
    url: '/news'
  })
}
function getHeros() {
  return request({
    url: '/heros'
  })
}

export {
  getAds,
  getNews,
  getHeros
}