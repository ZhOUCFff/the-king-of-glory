<template>
  <div id="app">
    <!-- 顶栏 -->
    <top-bar v-if="isTopBarShow" class="top-bar" />

    <!-- 导航栏 -->
    <nav-bar v-if="isNavBarShow" class="main-nav" height="1.68rem" />

    <!-- 路由 -->
    <transition name="slide" mode="out-in">
      <keep-alive>
        <router-view class="view" />
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import TopBar from 'components/content/TopBar'
import NavBar from 'components/content/NavBar'

export default {
  name: 'app',
  components: {
    TopBar,
    NavBar,
  },
  computed: {
    path() {
      return this.$route.path
    },
    isTopBarShow() {
      return (
        this.path === '/home' ||
        this.path === '/strategy' ||
        this.path === '/race' ||
        this.$store.state.isTopBarShow
      )
    },
    isNavBarShow() {
      return (
        this.path === '/home' ||
        this.path === '/strategy' ||
        this.path === '/race' ||
        this.$store.state.isNavBarShow
      )
    },
  },
}
</script>

<style lang="scss">
// 导入初始化样式
@import '~assets/css/normal.scss';

.scroll {
  touch-action: none;
}

//导航栏
// .main-nav {
//   margin-top: 1.8rem;
// }

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

// 路由过渡效果
.view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  // transition-delay: 0.1s;
}

.slide-enter {
  -webkit-transform: translate(0, 300px);
  transform: translate(0, 100px);
}
.slide-enter-active {
  -webkit-transform: translate(0, 300px);
  transform: translate(0, 300px);
}
.slide-leave {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
.slide-leave-active {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}
</style>
