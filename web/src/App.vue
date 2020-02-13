<template>
  <div id="app">
    <!-- 顶栏 -->
    <top-bar class="top-bar" v-if="isShowTop" />

    <!-- 导航栏 -->
    <nav-bar v-if="isShowNav" class="main-nav" height="1.68rem" />

    <!-- 路由 -->
    <router-view />
  </div>
</template>

<script>
import TopBar from 'components/content/TopBar'
import NavBar from 'components/content/NavBar'

export default {
  name: 'app',
  components: {
    TopBar,
    NavBar
  },
  computed: {
    isShowTop() {
      return this.$route.path.indexOf('/home') !== -1
    },
    isShowNav() {
      return (this.$route.path.indexOf('/home') !== -1 || this.$route.path.indexOf('/article') !== -1) ? true : false
    }
  }
}
</script>

<style lang="scss">
// 导入初始化样式
@import "~assets/css/normal.scss";

//导航栏
.main-nav {
  margin-top: 1.8rem;
}

//轮播图的分页器样式
.swiper-pagination {
  .swiper-pagination-bullet {
    opacity: 1;
    width: 0.32rem;
    height: 0.32rem;
    margin-left: 0 !important;
    margin-right: 0.4rem !important;
    background: #fff;
    border-radius: 0.08rem !important;
    &.swiper-pagination-bullet-active {
      background: #4b67af;
    }
  }
}
</style>
