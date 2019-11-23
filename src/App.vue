~<template>
  <div id="app">
      <!-- <p>刷新次数: {{ count }}</p> -->
    <div v-if="$store.state.default.headerShow">
      <van-row class="header" v-if="!$store.state.default.headerBack">
        <van-col span="24" align="center">{{$store.state.default.hederContent}}</van-col>
      </van-row>
      <van-row class="header-back" v-else>
        <van-icon name="arrow-left" class="back" @click="backUp"/>
        <van-col span="20" align="center">{{$store.state.default.hederContent}}</van-col>
      </van-row>
      <div class="support"></div>
    </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    </van-pull-refresh> -->
    <router-view />
    <div v-show="$store.state.isLogin && $store.state.default.bottomShow">
      <div class="support"></div>
      <van-row id="bottom">
        <van-col span="8" :class="{active:$store.state.default.bottom == 0}"><div @click="jump('order')">订单列表</div></van-col>
        <van-col span="8" :class="{active:$store.state.default.bottom == 1}"><div @click="jump('reporting')" class="bor">扫描条形码</div></van-col>
        <van-col span="8" :class="{active:$store.state.default.bottom == 2}"><div @click="jump('user')">个人中心</div></van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  props: ['value'],
  data() {
    return {
      orderShow: true,
      reportingShow: false,
      userShow: false,
      count: 0,
      isLoading: false,
      isLogin:''
    };
  },
  mounted(){

    this.$store.commit('login')

    // this.$store.changeHeader(true,'21');
    // this.$store.commit('defaultParame')
  },
  methods: {
    jump(url) {
      this.$router.push({ name: url });
      let data = url + "Show"
      this.orderShow = this.reportingShow = this.userShow = false
      switch(this.$store.state.default.bottom){
        case 0: this.orderShow = true
          break
        case 1: this.reportingShow = true
          break
        case 2: this.userShow = true
          break
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 500);
    },
    backUp (){
      if(this.$store.state.default.hederContent=='运单查询'){
          this.$router.push({ name: 'reporting'});
      }else{
        this.$router.back(-1)
      }
    }
  }
};
</script>

<style <style lang="less">
html,body{
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
}
*{
  box-sizing: border-box;
}
img{
  display: block;
}
input{
  background: inherit;
  display: inline-block;
  border: 0;
  padding: 0;
}
.icon-1{
  display: inline-block;
  width: 5px;
  height: 1rem;
  border-radius: 1rem;
  position: relative;
  left: 0;
  top: .1rem;
  background-color: #F5A623;
}
#app{
  height: 100%;
  width: 100%;
}

i{
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  width: 18px;
  height: 18px;
}
i.rili{
  width: 18px;
  height: 18px;
  margin-bottom: -2px;
  background-image: url('/static/images/icon/rili.png');
}
i.dwon{
  width: 12px;
  height: 12px;
  background-image: url('/static/images/icon/dwon.png');
}
// @import url('./assets/css/');
.support{
  width: 100%;
  height: 3rem;
}
#bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1rem;
  border-top: 1px solid #ccc;
  background-color: #fff;
  z-index: 2;
}
#view{
  height: calc(100% - 3rem);
  // overflow: hidden;
  overflow-y: auto;
}
.active {
  color: #605CA8;
}
.header{
  height: 3rem;
  line-height: 3rem;
  background-color: #555758;
  color: #fff;
  position: fixed;
  top:0;
  left: 0;
  width: 100%;
  z-index: 0;
}
.header-back{
  .header();
  // position: relative;
  .back{
    position: absolute;
    left: 4%;
    top: calc(50% - .5rem);
  }
}
.bg{
  width: 100%;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  background-color: #605CA8;
  color: #fff;
  input{
    border: none;
    text-align: center;
  }
}
html .button--large{
  width: 90%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  margin: 2rem auto 0;
  border: 1px solid #726eed;
  color: #726eed;
  border-radius: 5px;
}
html .button--large:active{
  background-color: #726eed;
  color: #fff;
}
</style>