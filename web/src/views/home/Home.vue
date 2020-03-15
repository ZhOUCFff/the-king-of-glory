<template>
  <scroll class="scroll" click>
    <!-- 轮播图 -->
    <swiper v-if="adList" :options="swiperOption">
      <swiper-slide v-for="(item,i) in adList[0].items" :key="i">
        <img class="w100" :src="item.img" alt />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- 入口 -->
    <div class="entry bgc-w m15-0 fc-2">
      <div :class="{'entry-hidden': !isEntry}" class="hidden-height d-flex f-wrap">
        <div class="entry-list" v-for="(item,i) in spriteData" :key="i">
          <i :style="item.position"></i>
          <div>{{item.text}}</div>
        </div>
      </div>
      <div class="entry-btn t-center" @click="entryBtnClick">
        <i :class="{is_entry:!isEntry}"></i>
        <span class="fc-3">{{isEntry?'收起':'展开'}}</span>
      </div>
    </div>
    <!-- 新闻资讯 -->
    <card :data="newsList" titleBorder title="新闻资讯">
      <i class="card-icon-l" slot="icon-l"></i>
      <i class="card-icon-r" slot="icon-r"></i>
      <template slot-scope="scope">
        <div
          class="fs14 d-flex mb15"
          v-for="item in scope.item.news_list"
          :key="item._id"
          @click="newsClick(item._id)"
        >
          <span class="cate_name">[{{item.cate_name}}]</span>
          <span>|</span>
          <span class="t-ellipsis flex1 pr8">{{item.title}}</span>
          <span>{{item.updatedAt | date}}</span>
        </div>
      </template>
    </card>
    <!-- 英雄列表 -->
    <card :data="heroList" titleBorder title="英雄列表" class="hero-list m15-0">
      <i class="card-icon-l" slot="icon-l"></i>
      <i class="card-icon-r" slot="icon-r"></i>
      <div slot="img">
        <img class="w100 mt15" src="~assets/img/common/new_hero.jpg" alt />
      </div>
      <template slot-scope="scope">
        <ul class="clearfix mb15">
          <li
            class="hero"
            v-for="item in scope.item.hero_list"
            :key="item._id"
            @click="heroClick(item._id)"
          >
            <div class="avatar-container">
              <img class="hero-avatar" :src="item.avatar" />
            </div>
            <h3 class="fs12 fc-2 mt5">{{item.name}}</h3>
          </li>
        </ul>
      </template>
    </card>
  </scroll>
</template>
 
<script>
import dayjs from 'dayjs'

import { getAds, getNews, getHeros } from 'network/home'

import Card from 'components/content/Card'
import Scroll from '../../components/common/scroll/Scroll'

export default {
  name: "Main",
  filters: {
    date(val) {
      return dayjs(val).format('MM/DD')
    }
  },
  components: {
    Card,
    Scroll
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination'
        }
      },
      //轮播图图片数据
      adList: null,
      //精灵图数据
      spriteData: [
        {
          text: '爆料站',
          position: { 'background-position': '-8.78rem -2.6rem' }
        },
        {
          text: '故事站',
          position: { 'background-position': '-12.58rem -2.6rem' }
        },
        {
          text: '周边商城',
          position: { 'background-position': '-4.98rem -0.12rem' }
        },
        {
          text: '体验服',
          position: { 'background-position': '-1.26rem -2.6rem' }
        },
        {
          text: '新人专区',
          position: { 'background-position': '-12.52rem -0.12rem' }
        },
        {
          text: '荣耀传承',
          position: { 'background-position': '-4.98rem -2.56rem' }
        },
        {
          text: '模拟战资料库',
          position: { 'background-position': '-1.28rem -0.12rem' }
        },
        {
          text: '王者营地',
          position: { 'background-position': '-8.76rem -0.12rem' }
        },
        {
          text: '公众号',
          position: { 'background-position': '0.16rem -16.64rem' }
        },
        {
          text: '版本介绍'
        },
        {
          text: '对局环境'
        },
        {
          text: '无限王者团'
        },
        {
          text: '创意互动营'
        }
      ],
      //收起展开
      isEntry: false,
      //新闻列表数据
      newsList: [],
      heroList: []
    }
  },
  methods: {
    async getAds() {
      const res = await getAds()
      if (!res) return
      this.adList = res.data
    },
    async getNews() {
      const res = await getNews()
      if (!res) return
      this.newsList = res.data
    },
    async getHeros() {
      const res = await getHeros()
      if (!res) return
      this.heroList = res.data
    },
    entryBtnClick() {
      this.isEntry = !this.isEntry
    },
    newsClick(id) {
      this.$router.push(`/article/${id}`)
    },
    heroClick(id) {
      // console.log(id);

      this.$router.push(`/hero/${id}`)
    }
  },
  created() {
    this.getAds()
    this.getNews()
    this.getHeros()
  }
}
</script>
 
<style lang="scss" scoped>
.scroll {
  height: calc(100vh - 3.48rem);
  overflow: hidden;
}

//精灵图部分
.entry {
  border-top: 0.04rem solid #d4d9de;
  border-bottom: 0.04rem solid #d4d9de;
  .hidden-height {
    height: 11.2rem;
    transition: all 0.1s;
    &.entry-hidden {
      height: 2.8rem;
      overflow: hidden;
    }
  }

  .entry-list {
    position: relative;
    width: 25%;
    text-align: center;
    font-size: 0.48rem;
    padding: 0.52rem 0;
    i {
      display: inline-block;
      background: url("~assets/img/sprite/index.png") no-repeat;
      background-size: 15rem 18.2rem;
      width: 1.24rem;
      height: 1rem;
    }
    &::after {
      position: absolute;
      top: 0.32rem;
      right: -0.02rem;
      display: block;
      height: 2rem;
      width: 0.04rem;
      background: #d4d9de;
      content: "";
    }
    &:nth-child(7) {
      color: #999;
    }
    &:nth-child(4n)::after {
      width: 0;
    }
    &:nth-child(10) {
      i {
        background: url("~assets/img/sprite/version-icon.png") no-repeat 0.08rem
          0;
        background-size: 1.08rem 1.04rem;
      }
    }
    &:nth-child(11) {
      i {
        width: 1.52rem;
        background: url("~assets/img/sprite/djhj.png") no-repeat 0 0;
        background-size: 1.52rem 0.92rem;
      }
    }
    &:nth-child(12) {
      color: #999;
      i {
        width: 1.84rem;
        background: url("~assets/img/sprite/wxwzt.png") no-repeat 0 0.16rem;
        background-size: 1.84rem 0.48rem;
      }
    }
    &:nth-child(13) {
      background: url("~assets/img/sprite/cyhdy.png") no-repeat 1.16rem 0.32rem;
      background-size: 1.4rem 1.4rem;
      color: #999;
    }
  }
  //收起展开按钮
  .entry-btn {
    height: 1.2rem;
    background-color: #f9f9f9;
    line-height: 1.2rem;
    i {
      display: inline-block;
      margin-right: 0.12rem;
      background: url("~assets/img/sprite/index.png") no-repeat -5.64rem -9.28rem;
      background-size: 15rem 18.2rem;
      width: 0.4rem;
      height: 0.4rem;
      transition: all 0.3s;
      // transform: rotate(180deg);
      &.is_entry {
        transform: rotate(180deg);
      }
    }
  }
}

//卡片标题图标
i[class^="card-icon"] {
  display: inline-block;
  position: absolute;
  top: 0.76rem;
  background: url("~assets/img/sprite/index.png") no-repeat 0 -8.92rem;
  background-size: 15rem 18.2rem;
  width: 0.54rem;
  height: 0.52rem;
  &.card-icon-r {
    right: 0;
    background-position: -6.8rem -10rem;
    width: 0.8rem;
  }
}
.cate_name {
  color: #464f73;
}
.hero-list {
  .card-icon-l {
    background-position: -6.8rem -10.68rem;
  }
}

//轮播图分页按钮
.swiper-pagination {
  text-align: right;
  padding-right: 0.2rem;
}

.hero {
  float: left;
  width: 17%;
  margin-bottom: 0.32rem;
  margin-right: 3.75%;
  text-align: center;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .avatar-container {
    width: 100%;
    overflow: hidden;
    .hero-avatar {
      width: 100%;
      vertical-align: middle;
    }
  }
}
</style>