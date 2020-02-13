<template>
  <div class="card bgc-w" :class="{padding}">
    <!-- 标题 -->
    <div v-if="title" :class="{padding: !padding}">
      <div class="title p15-0" :class="{'border': titleBorder}">
        <slot name="icon-l"></slot>
        <span class="pl20 fs16" :class="{bold}">{{title}}</span>
        <slot name="icon-r"></slot>
        <slot name="img"></slot>
      </div>
    </div>
    <!-- 导航栏 -->
    <div
      v-if="data.length!==0"
      class="card-nav-bar d-flex fc-2mb15 mb10"
      :class="{'jc-between':!around,'jc-around':around,'nav-border': navBorder,'nav-margin':!padding}"
    >
      <div class="nav-item fs13 fs14" v-for="(item,i) in data" :key="i" @click="navClick(i)">
        <span :class="{ active: currentIndex === i }">{{item.name?item.name:item}}</span>
      </div>
    </div>
    <slot name="content"></slot>
    <swiper
      :options="swiperOption"
      ref="mySwiper"
      @slide-change="() => {currentIndex =$refs.mySwiper.swiper.realIndex}"
    >
      <swiper-slide v-for="(item, i) in data" :key="i">
        <slot :item="item"></slot>
      </swiper-slide>
    </swiper>
  </div>
</template>
 
<script>
export default {
  name: "Card",
  data() {
    return {
      swiperOption: {
        autoHeight: true
      },
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    titleBorder: {
      type: Boolean,
      default: false
    },
    navBorder: {
      type: Boolean,
      default: false
    },
    around: {
      type: Boolean,
      default: false
    },
    bold: {
      type: Boolean,
      default: false
    },
    padding: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    navClick(i) {
      this.$refs.mySwiper.swiper.slideTo(i)
    }
  },
}
</script>
 
<style lang="scss" scoped>
.nav-margin {
  margin: 0 15px;
}
.padding {
  padding-left: 0.6rem;
  padding-right: 0.6rem;
}
.card {
  width: 100%;
  border-bottom: 0.04rem solid #d4d9de;
  .title {
    position: relative;
    font-size: 0.64rem;
  }
  .title-border {
    border-bottom: 0.04rem solid #e9ecee;
  }
  .card-nav-bar {
    height: 0.96rem;
    line-height: 0.96rem;

    &.nav-border {
      padding-bottom: 1.2rem;
      border-bottom: 0.04rem solid #d4d9de;
    }
    .nav-item {
      vertical-align: middle;
    }
    .active {
      padding-bottom: 0.04rem;
      border-bottom: 0.12rem solid;
      color: #db9e3f;
    }
  }
}
</style>