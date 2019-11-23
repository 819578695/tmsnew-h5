<template>
    <div>
      <div style="color:red;position: relative;float: right;bottom: 35px;right: 20px;" @click="outLogin()">注销</div>
      <div align="center" style="padding-top:80px;" @click="beginScan(1)">
       <span>点击扫码<b style="color:red">入</b>库</span>
       <img src="../../assets/images/tm.jpg" alt="">
      </div>
      <div align="center" style="padding-top:80px;" @click="beginScan(2)">
        <span>点击扫码<b style="color:red">出</b>库</span>
       <img src="../../assets/images/tm.jpg" alt="">
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return {
      type:'',
      orderNo:''
    }
  },
  created(){
    var this_=this;
  },
  mounted(){
    this.$store.commit('changeParame', {headerBack:false,hederContent:'扫描条形码',bottom:'1',bottomShow:false})
  },
  methods:{
    beginScan(type){
      if(type==1){
        this.$router.push({ name: "orderDetailsPut", query: { type:1}});
      }else{
        this.$router.push({ name: "orderDetailsOut", query: { type:2}});
      }
    },
    outLogin(){
      localStorage.removeItem("isLogin");
      localStorage.removeItem("siteId");
      localStorage.removeItem("token");
      this.$router.push({ name: "login"});
    }
  }
}
</script>
<style lang="less" scoped>
  .ewm{
  position: fixed;
  right: 4%;
  top: 12px;
  width: 1.5rem;
}
</style>