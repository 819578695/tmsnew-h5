<template>
  <div class="page1">
    <van-row class="header-back">
      <van-icon name="arrow-left" class="back" @click="close"/>
      <van-col span="24" align="center">{{$store.state.default.hederContent}}详情</van-col>
    </van-row>
    <tips
      v-if="tips.show"
      :title="tips.title"
      :content="tips.content"
      :close="tips.close"
      @close="closeTips"
      v-on:confirm="confirm"
    ></tips>
    <checkPsd
      v-if="checkPsdShow"
      @close="toggleCheckPsd"
      v-bind:dataRequest="dataRequest"
      v-on:check="check"
    ></checkPsd>
    <checkAlert
      v-if="checkAlertShow"
      @close="togglecheckAlert"
      v-bind:splitRequest="splitRequest"
      v-on:checkChaiOrder="checkChaiOrder"
      v-on:togglecheckAlert2="togglecheckAlert2"
    ></checkAlert>
    <noOrderAlert
      v-if="noOrderAlertShow"
      @close="toggleNoOrderAlert"
      v-bind:noOrderRequest="noOrderRequest"
      v-on:noOrder="noOrder"
    ></noOrderAlert>
    <van-row class="tHead">
      <van-col span="10" align="center">运单号</van-col>
      <van-col span="3" align="center">总件数</van-col>
      <van-col span="3" align="center">已扫描</van-col>
      <van-col span="3" align="center">拆单</van-col>
      <van-col span="2" align="center">删除</van-col>
      <van-col span="3" align="center">异常</van-col>
    </van-row>
    <van-row>
      <ul waterfall-disabled="disabled" waterfall-offset="200" class="tBody">
        <li v-for="(val,index) in orderData" :key="index">
          <van-col span="10" align="center">{{val.order_no.substring(val.order_no.length-15,val.order_no.length)}}</van-col>
          <van-col span="3" align="center">{{val.goods_pro_num}}</van-col>
          <van-col span="3" align="center">{{val.barcode_num}}</van-col>
          <van-col span="3" align="center"><img src="../assets/images/chai.png" style="width:25px;height: 20px;" @click="splitOrder(val.order_no,val.goods_pro_num,val.weight,val.barcode_num)"/></van-col>
          <van-col span="2" align="center"><img src="../assets/images/del.png" style="width:25px;" @click="delCode(val.order_no)"/></van-col>
          <van-col span="3" align="center"><img src="../assets/images/error.png" style="width:25px;" @click="rejection(val.orderid)"/></van-col>
        </li>
      </ul>
    </van-row>
    <van-row id="bottom">
        <van-col style="width:100%" ><div align="center" @click="getBeCode(1)">入库扫码</div></van-col>
      </van-row>
  </div>
</template>
<script>
import tips from "./tips";
import checkPsd from "./productAlert";
import checkAlert from "./chaiAlert";
import noOrderAlert from "./systemOrderAlert";
import { Waterfall } from "vant";
export default {
  components: {
    checkPsd,tips,checkAlert,noOrderAlert
  },
  data() {
    return {
      orderData: {},
      dataList: [],
      dialogShow: true,
      checkPsdShow: false,
      checkAlertShow:false,
      noOrderAlertShow:false,
      dataRequest: {},
      splitRequest: {},
      noOrderRequest: {},
      tips: { title: '提示', content: "提示内容", show: false,close:false},
      type:this.$route.query.type,
      order_id:this.utils.getRequestParam('order_id'),
      types:this.utils.getRequestParam('type'),
      delId:''
    };
  },
  created(){
    var this_=this;
    window.getToAddress = (address='') => {
      if(null!=address){
        var addres=address.substr(19,address.length);
          var barcode=addres.substr(0,addres.indexOf('b'));
          this.utils.request.queryProductByCode({'product_no':barcode},function(data){
            this_.dataRequest=data;
            this_.dataRequest.order_no=this_.dataRequest.order_no.substring(this_.dataRequest.order_no.length-5,this_.dataRequest.order_no.length);
            this_.checkPsdShow=true;
         });
      }
    };
  },
  mounted() {
    var this_ = this;
    this.getLoadOrder(this.order_id,this.types);
    this.$store.commit("changeParame", {
      headerBack: true,
      hederContent: "运单列表",
      bottom: "0",
      bottomShow: false
    });
  },
  methods: {
    getLoadOrder(val,type) {
      var this_ = this; 
        this.utils.request.queryOrderNumAndCodeNumById({ id: val,type:type,siteId:localStorage.getItem('siteId'),flg:'1'},function(data) {
          this_.orderData=data;
      });
    },
    close(){
       this.$router.back(-1);
    },
    //删除扫码
    delCode(val){
        this.delId=val;
        this.tips={ title: '提示', content: '是否删除扫码操作!', show: true,close:true};
    },
    //扫码
    getBeCode (type){
      var this_=this;
      this.type=type;
      this.utils.request.getCamera(type);
    },
    //入库出库操作
    operationBegin(orderNo,type,num){
      var this_=this;
      this.utils.request.getBeginCode({type:type,orderNo:orderNo,num:num,siteId:localStorage.getItem('siteId')},function(data){
          this_.getLoadOrder(this_.order_id,this_.types);
          if(data!='扫码完成'){
            this_.tips={ title: '提示', content: data, show: true};
          }
      });
    },
    toggleCheckPsd(){
      this.checkPsdShow = (this.checkPsdShow) ? false : true
    },
    togglecheckAlert(){
      this.checkAlertShow = (this.checkAlertShow) ? false : true
    },
    togglecheckAlert2(){
      this.checkAlertShow = (this.checkAlertShow) ? false : true
    },
    toggleNoOrderAlert(){
      this.noOrderAlertShow = (this.noOrderAlertShow) ? false : true
    },
     closeTips(data) {
      this.tips.show = false;
    },
    check(num,product_no){
      this.operationBegin(product_no,this.type,num);
      this.checkPsdShow=false;
    },
    confirm(){
      var this_=this;
      this.utils.request.delScanOperate({order_no:this.delId},function(data){
        this_.getLoadOrder(this_.order_id,this_.types);
        this_.tips={ title: '提示', content: data, show: true};
      });
    },
    splitOrder(order_no,goods_num,weight,barcode_num){
      //如果已经扫码完成，将不能拆分订单
      if(goods_num==barcode_num){
          this.tips={ title: '提示', content: '扫码已完成，不能拆分订单', show: true};
          return false;
      }
      this.splitRequest={order_no:order_no,goods_num:goods_num,weight:weight};
      this.checkAlertShow=true;
    },
    //拆单
    checkChaiOrder(data,order_no){
      var this_=this;
       this.checkAlertShow=false;
      this.utils.request.orderSplit({orders:JSON.stringify(data),order_no:order_no,vehicle_id:this.order_id},function(data){
        this_.getLoadOrder(this_.order_id,this_.types);
        this_.tips={ title: '提示', content: data, show: true};
      });
    },
    rejection(id){
      this.noOrderRequest={id:id,code:602};
      this.noOrderAlertShow=true;
    },
    noOrder(){
      this.noOrderAlertShow=false;
      this.getLoadOrder(this.order_id,this.types);
    },
    togglecheckAlert(){
      this.noOrderAlertShow = (this.noOrderAlertShow) ? false : true
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/variables.less");
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
  height: calc(100% - 9rem);
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
