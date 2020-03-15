import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from 'views/Main'
import Category from 'views/category/Category'

import Item from 'views/item/Item'

import HeroEdit from 'views/hero/HeroEdit'
import HeroList from 'views/hero/HeroList'

import ArticleEdit from 'views/article/ArticleEdit'
import ArticleList from 'views/article/ArticleList'

import AdList from 'views/ad/AdList'

import AdminUserList from 'views/adminUser/AdminUserList'

import Login from 'views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,
    meta: { noRequiredAuth: true }
  },
  {
    path: '/',
    component: Main,
    redirect: '/category',
    children: [
      //分类
      { path: 'category', component: Category },
      //物品
      { path: 'item', component: Item },
      //英雄
      { path: 'hero/create', component: HeroEdit },
      { path: 'hero/edit/:id', component: HeroEdit, props: true },
      { path: 'hero/list', component: HeroList },
      //文章
      { path: 'article/create', component: ArticleEdit },
      { path: 'article/edit/:id', component: ArticleEdit, props: true },
      { path: 'article/list', component: ArticleList },
      //广告位
      { path: 'ad/list', component: AdList },
      //用户
      { path: 'admin_user/list', component: AdminUserList }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

router.beforeEach((to, from, next) => {

  if (!to.meta.noRequiredAuth && !sessionStorage.token) return next('/login')

  return next()

})

export default router
