<template>
  <div id="nav-bar" class="d-flex jc-around fc-w" :style="style">
    <div class="nav-item flex1" v-for="(item,i) in titles" :key="i" @click="navBarClick(i)">
      <slot :i="i" :title="item">
        <span :class="{ active: $route.path === '/home' && currentIndex === i }">{{item}}</span>
      </slot>
    </div>
  </div>
</template>
 
<script>
export default {
  name: "NavBar",
  props: {
    titles: {
      type: Array,
      default() {
        return ['首页', '攻略中心', '赛事中心']
      }
    },
    backgroundColor: {
      type: String,
      default: '#db9e3f'
    },
    height: {
      type: String,
      default: ''
    }
  },
  computed: {
    style() {
      return {
        'height': this.height,
        'background-color': this.backgroundColor,
        'line-height': this.height
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    navBarClick(i) {
      this.currentIndex = i
      this.$emit('navBarClick', i)
      if (i === 0) {
        this.$route.path !== '/home' && this.$router.push('/home')
      }
    }
  }
}
</script>
 
<style lang="scss" scoped>
#nav-bar {
  width: 100%;
  font-size: 0.52rem;
  text-align: center;
  .nav-item {
    height: 100%;
    span {
      padding-bottom: 0.08rem;
    }
  }
}
.active {
  border-bottom: 0.12rem solid;
}
.primary {
  color: #db9e3f;
  border-bottom: 0.12rem solid;
}
</style>