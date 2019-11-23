<template>
  <div class="tips">
   <div id="wallet-del" class="enter-password">
      <tips
      v-if="tips.show"
      :title="tips.title"
      :content="tips.content"
      @close="closeTips"
    ></tips>
         <div class="con">
            <p class="padding-left head2" style="padding-top: 12px;">拆单信息</p>
            <div class="btn-1 psd" style="overflow-y: auto;max-height: 280px;">
              <div style="margin-top: 15px;">
                <span>拆单数：</span><input type="number" :placeholder="`总件数 ${splitRequest.goods_num}`" @change="changesOrder" @keyup="changesOrder" v-model="num" style="height: 28px;width: 193px;"/>
              </div>
              <div style="margin-top: 15px;border: 1.5px solid #00000024;" name="orders" v-for="(val,index) in array" :key="index">
                <div style="padding-bottom: 10px;font-size:17px;color:red;padding-left: 10px;padding-top: 5px;"><span>拆分订单{{index+1}}：</span></div>
                <div style="padding-left: 10px;">
                  <span>件数：</span><input type="number" name="number" :placeholder="`默认件数 ${orderDatas.number}`" style="height: 28px;width: 193px;"/>
                </div>
              </div> 
            </div>
            <p class="tips" v-show="tip.show" style="left:4%;"></p>
             <div class="foot">
               <span class="cancel"  @click="cancel">
                关闭
              </span>
              <span class="affirm" @click="confirm">
                确认
              </span>
            </div>
         </div>
      </div>
  </div>
</template>
<script>
import tips from "./tips";
export default {
  components: {
    tips
  },
  props: {
    splitRequest:{
      type:Object
    }
  },
  data() {
    return {
      eye: false,
      clean_btn: false,
      tip:{content:'内容',show:false},
      tips: { title: '提示', content: "提示内容", show: false},
      num:'',
      orderDatas:{number:0,weight:0},
      array:[],
      numTotal:0,
      number:0,
      weight:0
    };
  },
  methods: {
    cancel () {
      this.$emit("togglecheckAlert2", "");
    },
    confirm () {
      var numTotal=0;
      var numbers=document.getElementsByName('number');
      var datasArray=[];
      if(numbers.length>0){
          for(var i=0;i<numbers.length;i++){
            var obj={};
            numTotal+=parseFloat(numbers[i].value);
            obj.num=numbers[i].value;
            datasArray.push(obj);
          }
          if(''==numTotal?0:numTotal>this.splitRequest.goods_num){
              this.tips={title: '提示', content: "输入件数，不能超过总件数", show:true};
              return false;
          }
          if(''==numTotal?0:numTotal!=this.splitRequest.goods_num){
              this.tips={title: '提示', content: "拆单数量必须等于总数量！", show:true};
              return false;
          }
          this.$emit("checkChaiOrder",datasArray,this.splitRequest.order_no);
      }else{
        this.tips={title: '提示', content: "拆单数量不能为空!", show:true};
        return false;
      }
    },
     closeTips(data) {
      this.tips.show = false;
    },
    changesOrder(){
      this.array=[];
      for(var i = 0;i < parseInt(this.num);i++){
        this.array[i] = [];
      }
      this.array.reverse()
      this.orderDatas.number=(parseInt((this.splitRequest.goods_num/this.num) * 100 ) / 100 ).toFixed(2);
    },
    getnumTotal(){

    }
  }
};
</script>
<style lang="less" scoped>
@import url("../assets/css/variables.less");
.enter-password {
  position: fixed;
  left: 0;
  background-color: @color-dialog-background;
  width: 100%;
  height: 100%;
  z-index: 999;
  .con {
    padding: 0 4%;
    position: relative;
    left: 10%;
    width: 80%;
    border-radius: 1.5rem;
    background-color: @color-page-background;
    .head2{
      margin: 1.5rem 0 1rem;
      font-size: 18px;
      color: #999;
    }
    .foot {
      border-radius: 0 0 1.5rem 1.5rem;
      height: 5rem;
      line-height: 5rem;
      text-align: right;
      span {
        display: inline-block;
        font-size: 18px;
      }
      .cancel {
        color: @color-text-light-black;
        margin-right: 3rem;
      }
      .affirm {
        color: @color-text-blue;
        padding-right: 4%;
      }
    }
    .btn-1 {
      margin: 0 4%;
    }
    .btn-affirm {
      margin-top: 2.5rem;
      height: 4.4rem;
      line-height: 4.4rem;
    }
  }
}
#walletName {
  border-color: transparent;
  margin-left: 5%;
  width: 45%;
}
.btn-del-position {
  position: fixed;
  bottom: 10%;
  left: 10%;
  color: #f18f35;
}
.eye {
  width: 2.2rem;
  top: calc(50% - 1.1rem);
}
</style>
