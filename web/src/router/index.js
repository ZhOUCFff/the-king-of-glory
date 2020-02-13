import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home')
const Article = () => import('views/article/Article')
const Hero = () => import('views/hero/Hero')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/article/:id',
    component: Article,
    props: true
  },
  {
    path: '/hero/:id',
    component: Hero,
    props: true
  }
]

const router = new VueRouter({
  routes,
  mode: 'hash'
})

export default router