<template>
  <div class="hero" v-if="heroData">
    <top-bar class="hero-nav fc-w">
      <div slot="center" class="fs13 flex1">
        王者荣耀
        <span class="pl8">攻略站</span>
      </div>
      <div slot="right" class="more fs12">
        更多英雄
        <span class="arrow-r fs20">&gt;</span>
      </div>
    </top-bar>

    <div class="hero-banner">
      <img :src="heroData.banner" />
      <div class="hero-info fc-w">
        <div>{{heroData.title}}</div>
        <h3 class="fs17 bold">{{heroData.name}}</h3>
        <div>{{heroData.cate.map(cate => cate.name).join('/')}}</div>
        <ul class="d-flex">
          <li v-for="(item,i) in scores" :key="i">
            {{scores_name[i]}}
            <i
              class="hero-attr"
              :style="{'background-position': `${-(3-i)*0.82}rem ${-(item-1)*0.82}rem`}"
            ></i>
          </li>
        </ul>
      </div>
      <div class="skin fc-2">
        皮肤：7
        <i></i>
      </div>
    </div>

    <card class="pt8" :data="['英雄初识','进阶攻略']" :padding="false" around navBorder>
      <template slot-scope="scope">
        <div v-if="scope.item === '英雄初识' ">
          <div class="b-bottom p0-15">
            <div class="hero-video d-flex jc-between">
              <span>
                <i></i> 英雄介绍视频
              </span>
              <span>
                <i></i> 一图识英雄
              </span>
            </div>
            <!-- 技能图标 -->
            <ul class="hero-skills m15-0">
              <li
                :class="{active: currentIndex == i}"
                v-for="(item,i) in heroData.skills"
                :key="item._id"
                @click="currentIndex = i"
              >
                <img :src="item.icon" />
              </li>
            </ul>
            <!-- 技能介绍 -->
            <div class="skill-info">
              <h3 class="p3-0">
                <span class="fs15 bold mr15">{{currentSkill.name}}</span>
                <span
                  class="fs12 fc-2"
                  style="color: #7a7a80"
                >(冷却值：{{currentSkill.delay}}消耗：{{currentSkill.cost}})</span>
              </h3>
              <p class="desc p15-0">{{currentSkill.desc}}</p>
              <p class="detail p15-0">小提示：{{currentSkill.tips}}</p>
            </div>
          </div>

          <div class="suggest fs13">
            <!-- 出装推荐 -->
            <card title="出装推荐" bold>
              <i slot="icon-l"></i>
              <div slot="content">
                <div class="mt-8 down_wind b-bottom">
                  <h5 class="pb8 fs15">顺风出装</h5>
                  <ul class="d-flex jc-between">
                    <li v-for="item in heroData.downWind.equipment" :key="item._id">
                      <img :src="item.icon" alt />
                      <div class="t-center">{{item.name}}</div>
                    </li>
                  </ul>
                  <p class="p15-0" style="color:#7a7a80">小提示：{{heroData.downWind.tips}}</p>
                </div>
                <div class="mt8 up_wind">
                  <h5 class="pb8 fs15">逆风出装</h5>
                  <ul class="d-flex jc-between">
                    <li v-for="item in heroData.upWind.equipment" :key="item._id">
                      <img :src="item.icon" alt />
                      <div class="t-center">{{item.name}}</div>
                    </li>
                  </ul>
                  <p class="p15-0" style="color:#7a7a80">小提示：{{heroData.upWind.tips}}</p>
                </div>
              </div>
            </card>
            <card title="使用技巧" bold>
              <i slot="icon-l"></i>
              <p class="pb8" slot="content">{{heroData.usageTips}}</p>
            </card>
            <card title="对抗技巧" bold>
              <i slot="icon-l"></i>
              <p class="pb8" slot="content">{{heroData.battleTips}}</p>
            </card>
            <card title="团战技巧" bold>
              <i slot="icon-l"></i>
              <p class="pb8" slot="content">{{heroData.teamTips}}</p>
            </card>
            <card title="英雄关系" bold>
              <i slot="icon-l"></i>
              <div slot="content">
                <div class="b-bottom">
                  <h3>最佳搭档</h3>
                  <div
                    class="best-partners d-flex p5-0"
                    v-for="item in heroData.partners"
                    :key="item._id"
                  >
                    <img :src="item.hero.avatar" alt />
                    <p class="flex1 pl10">{{item.desc}}</p>
                  </div>
                </div>
                <div class="b-bottom">
                  <h3>被谁克制</h3>
                  <div
                    class="best-partners d-flex p5-0"
                    v-for="item in heroData.restrained"
                    :key="item._id"
                  >
                    <img :src="item.hero.avatar" alt />
                    <p class="flex1 pl10">{{item.desc}}</p>
                  </div>
                </div>
                <div class="b-bottom">
                  <h3>克制谁</h3>
                  <div
                    class="best-partners d-flex p5-0"
                    v-for="item in heroData.restraint"
                    :key="item._id"
                  >
                    <img :src="item.hero.avatar" alt />
                    <p class="flex1 pl10">{{item.desc}}</p>
                  </div>
                </div>
              </div>
            </card>
          </div>
        </div>
      </template>
    </card>
  </div>
</template>
 
<script>
import { getHeroById } from 'network/home'

import TopBar from 'components/content/TopBar'
import Card from 'components/content/Card'

export default {
  name: "Hero",
  props: {
    id: { type: String }
  },
  computed: {
    currentSkill() {
      return this.heroData ? this.heroData.skills[this.currentIndex] : {}
    }
  },
  components: {
    TopBar,
    Card
  },
  data() {
    return {
      heroData: null,
      scores_name: ['难度', '技能', '攻击', '生存'],
      scores: [],
      currentIndex: 0
    }
  },
  methods: {
    async getHeroById() {
      const res = await getHeroById(this.id)
      if (!res) return
      for (let k in res.data.scores) {
        this.scores.push(res.data.scores[k])
      }
      this.heroData = res.data
      // console.log(this.heroData);
    }
  },
  created() {
    this.$store.commit('hideTopBar')
    this.$store.commit('hideNavBbar')
    this.getHeroById()
    this.isTranslate = true
  },
}
</script>
 
<style lang="scss" scoped>
.hero {
  font-family: "Mcrosoft YaHei";
  .more {
    vertical-align: middle;
    .arrow-r {
      position: relative;
      top: 0.08rem;
      right: 0;
    }
  }

  .hero-banner {
    position: relative;
    width: 100%;
    height: 7.64rem;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    }
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
    .hero-info {
      position: absolute;
      z-index: 1;
      left: 0.6rem;
      bottom: 0.48rem;
      li {
        margin-top: -0.2rem;
        .hero-attr {
          position: relative;
          top: 0.21rem;
          margin-right: 0.24rem;
          display: inline-block;
          width: 0.76rem;
          height: 0.76rem;
          background: url("~assets/img/hero/hero-attrsp.png");
          background-size: 8rem 9rem;
          transform: scale(0.66);
        }
      }
    }
    .skin {
      position: absolute;
      right: 0.4rem;
      bottom: 0.48rem;
      color: #b6afa8;
      i {
        display: inline-block;
        width: 0.24rem;
        height: 0.4rem;
        margin-left: 0.12rem;
        background: url("~assets/img/hero/skin-link.png") 0 0;
        background-size: 0.24rem 0.4rem;
      }
    }
  }

  .hero-video {
    span {
      height: 1.56rem;
      vertical-align: middle;
      line-height: 1.56rem;
      margin: 0.32rem 0;
      padding: 0 1.48rem;
      border: 0.04rem solid #eff1f2;
      border-radius: 0.2rem;
      background-color: #fcfcfc;
      i {
        position: relative;
        display: inline-block;
        top: 0.2rem;
        width: 0.8rem;
        height: 0.8rem;
        margin-right: 0.12rem;
        background: url("~assets/img/hero/icon_06.png");
        background-size: 0.8rem;
      }
    }
  }

  .hero-skills {
    display: flex;
    justify-content: space-around;
    li {
      width: 2.6rem;
      height: 2.6rem;
      border: 0.12rem solid transparent;
      &.active {
        border: 0.12rem solid #d59b40;
        border-radius: 1.16rem;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .skill-info {
    p {
      font-size: 0.52rem;
      line-height: 0.8rem;
      &.desc {
        color: #343440;
        border-bottom: 0.04rem solid #d4d9de;
      }
      &.detail {
        color: #7a7a80;
      }
    }
  }

  .down_wind,
  .up_wind {
    ul {
      li {
        border-radius: 50%;
        img {
          width: 1.86rem;
          height: 1.86rem;
          border-radius: 50%;
        }
      }
    }
  }

  .suggest {
    .card {
      border-top: 0.36rem solid #ededed;
      border-bottom: 0.04rem solid #d4d9de;
      p {
        line-height: 0.8rem;
        color: #343440;
      }
      i {
        position: absolute;
        display: inline-block;
        top: 0.76rem;
        left: 0;
        width: 0.52rem;
        height: 0.52rem;
      }
      &:nth-child(1) i {
        background: url("~assets/img/hero/icon_11.png") no-repeat;
        background-size: 0.52rem 0.52rem;
      }
      &:nth-child(2) i {
        background: url("~assets/img/hero/icon_13.png") no-repeat;
        background-size: 0.52rem 0.52rem;
      }
      &:nth-child(3) i {
        background: url("~assets/img/hero/icon_14.png") no-repeat;
        background-size: 0.52rem 0.52rem;
      }
      &:nth-child(4) i {
        background: url("~assets/img/hero/icon_15.png") no-repeat;
        background-size: 0.52rem 0.52rem;
      }
      &:nth-child(5) i {
        background: url("~assets/img/hero/icon_08.png") no-repeat;
        background-size: 0.52rem 0.52rem;
      }
    }
    .best-partners {
      img {
        width: 1.92rem;
        height: 1.92rem;
      }
    }
  }
}
</style>