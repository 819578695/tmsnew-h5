<template>
  <div class="page1">
    <van-row class="bg" type="flex" justify="center" style="border-bottom:1px solid #ccc;">
      <div>
        <van-col span="24" align="center">
          <input
            type="text"
            v-model="searchValue"
            placeholder="点击输入装车单号"
            @change="getLoadOrder(searchValue)"
          >
        </van-col>
      </div>
      <!-- <div style="position: relative;left: 75px;bottom: 38px;">
          <img class="scan" src="../assets/images/ewm.png" alt="scan" style="height:30px;width:31px;">
      </div> -->
    </van-row>
    <van-row class="tHead">
      <van-col span="5" align="center">车牌</van-col>
      <van-col span="5" align="center">司机</van-col>
      <van-col span="6" align="center">类型</van-col>
      <van-col span="4" align="center">状态</van-col>
      <van-col span="4" align="center">运单数量</van-col>
      <!-- <p>序列公司名称月份新增合同数作废合同数合同总数</p> -->
    </van-row>
    <van-row>
      <ul v-waterfall-lower="loadMore" waterfall-disabled="disabled" waterfall-offset="200" class="tBody">
        <li @click="toggleDetails(val.id,val.type)"  v-for="(val,index) in orderData" :key="index">
          <van-col span="5" align="center">{{val.license}}</van-col>
          <van-col span="5" align="center">{{val.name}}</van-col>
          <van-col span="6" align="center">{{''!=val.type?val.type:''}}</van-col>
          <van-col span="4" align="center">{{''!=val.status?val.status:''}}</van-col>
          <van-col span="4" align="center">{{''!=val.count?val.count:''}}</van-col>
        </li>
      </ul>
    </van-row>
  </div>
</template>
<script>
import { Waterfall } from "vant";
export default {
  data() {
    return {
      actionShow: false,
      orderData: [],
      dataList: [],
      data: {},
      delNum: 0,
      count:0,
      totalNum: 0,
      searchValue: "",
      disabled: true,
      details: {
        show: false,
        paremes: {
          id: "",
          products: []
        }
      }
    };
  },
  directives: {
    WaterfallLower: Waterfall("lower")
  },
  mounted() {
    var this_ = this;
    this.getLoadOrder({'shipping_no':this.searchValue,'site_id':localStorage.getItem('siteId'),start:this.count,limit:20});
    this.$store.commit("changeParame", {
      headerBack: true,
      hederContent: "配载列表",
      bottom: "0",
      bottomShow: false
    });
  },
  methods: {
    getLoadOrder(req) {
      var this_ = this; 
      this.disabled = true;
      this.utils.request.queryVehiclePlanByNo(req,function(data) {
          if(null!=data){
            for(var i=0;i<data.length;i++){
              this_.count=this_.count+1;
              this_.orderData.push(data[i]);
            }
            if(data.length==20){
              this_.disabled = false;
            }else{
              this_.disabled = true;
            }
          }else{
            this_.disabled = true;
          }
      });
    },
    toggleDetails(p,types) {
      if(types=='提货配载'){
        this.$router.push({ name: "orderDetails", query: { order_id:p,type:'type2'}});
      }
      if(types=='干线配载'){
        this.$router.push({ name: "orderDetails", query: { order_id:p,type:'type'}});
      }
      if(types=='送货配载'){
        this.$router.push({ name: "orderDetails", query: { order_id:p,type:'type3'}});
      }
    },
    loadMore() {
      this.getLoadOrder({'shipping_no':this.searchValue,'site_id':localStorage.getItem('siteId'),start:this.count,limit:20});
    }
  }
};
</script>
<style lang="less" scoped>
.bg input::placeholder {
  color: #fff;
}
.tHead {
  height: 2rem;
  line-height: 2rem;
  font-size: 12px;
  font-weight: bold;
}
.tBody {
  position: fixed;
  left: 0;
  width: 100%;
  height: calc(100% - 10rem);
  overflow: auto;
  li {
    font-size: 12px;
    overflow: hidden;
    height: 30px;
    line-height: 30px;
    &:nth-child(odd) {
      margin-bottom: 2px;
      background-color: #efefef;
    }
    div {
      white-space: nowrap;
      overflow: auto;
    }
  }
}
.page1 {
  position: fixed;
  top: 3rem;
  width: 100%;
  height: calc(100% - 6rem);
}
.dateSelect {
  position: fixed;
  left: 0;
  top: 8rem;
  width: 100%;
}
ul li {
  list-style: none;
}
.track-list {
  margin: 20px;
  padding-left: 5px;
  position: relative;
}
.track-list li {
  position: relative;
  line-height: 18px;
  border-left: 1px solid #d9d9d9;
  color: #999;
  padding:9px 0 0 25px;
}
.track-list li.first {
  color: red;
  padding-top: 0;
  border-left-color: #fff;
}
.track-list li .node-icon {
  position: absolute;
  left: -6px;
  top: 50%;
  width: 11px;
  height: 11px;
}
.track-list li.first .node-icon {
  background-position: 0-72px;
}
.track-list li .time {
  margin-right: 20px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
}
.track-list li .txt {
  max-width: 600px;
  position: relative;
  top: 4px;
  display: inline-block;
  vertical-align: middle;
}
.track-list li.first .time {
  margin-right: 20px;
}
.track-list li:before{
    position: absolute;
    left: -6px;
    top: 50%;
    content: '';
    border: 3px solid #f3f3f3;
    background-color: #d9d9d9;
    display: inline-block;
    width: 5px;
    height: 5px;
    border-radius: 5px;
}
.track-list .first:before {
    background-color: #fe4300;
    border-color: #f8e9e4;
}
</style>
