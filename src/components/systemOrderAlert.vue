<template>
  <div class="tips">
    <tips v-if="tips.show" :title="tips.title" :content="tips.content" @close="closeTips"></tips>
    <tips v-if="tips2.show" :title="tips2.title" :content="tips2.content" @close="closeTips2"></tips>
    <div id="wallet-del" class="enter-password">
      <div class="con" style="height: 75%;">
        <p class="padding-left head2" style="padding-top: 12px;">异常信息</p>
        <div class="btn-1 psd" style="overflow-y: auto;max-height: 80%;min-height:60%">
          <div style="margin-top: 15px;">
            <span>异常类型：</span>
            <select class="select" v-model="type">
              <option value='' selected>--请选择--</option>
              <option :value='item.id' v-for="(item, index) in arrayType" :key="index">{{item.val}}</option>
            </select>
          </div>
          <div style="margin-top: 15px;">
            <span>异常备注：</span>
            <div style="padding-left: 80px;margin-top: -20px;">
              <textarea cols="20" rows="5" v-model="remark" placeholder="请输入备注信息"></textarea>
            </div>
          </div> 
          <div class="image-view">
            <div class="addbox">
              <input type="file" @change="getImgBase()">
              <div class="addbtn">+</div>
            </div>
            <div class="view">
              <div class="item" v-for="(item, index) in imgBase64" :key="index">
                <span class="cancel-btn" @click="delImg(index)">x</span>
                <img :src="item">
              </div>
            </div>
          </div>
           <p class="tips" v-show="tip.show" style="left:4%;"></p>
        <div class="foot">
          <span class="cancel" @click="cancel">关闭</span>
          <span class="affirm" @click="submit">确认</span>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import tips from "./tips";
export default {
  components: {
    tips
  },
  props: {
    noOrderRequest: {
      type: Object
    }
  },
  data() {
    return {
      tip: { content: "内容", show: false },
      tips: { title: "提示", content: "提示内容", show: false },
      tips2: { title: "提示", content: "提示内容", show: false },
      arrayType: [],
      imgBase64: [], //存储img base64的值将值传给后端处理
      imgUrl: [],
      orderid:this.noOrderRequest.id,
      code:this.noOrderRequest.code,
      remark:'',
      type:''
    };
  },
  mounted(){
    this.getConfig();
  },
  methods: {
    cancel() {
      this.$emit("close", "");
    },
    closeTips(data) {
      this.tips.show = false;
    },
    closeTips2(data) {
      this.tips2.show = false;
      this.$emit("noOrder");
    },
    getConfig(){
      var this_=this;
      this.utils.request.getQueryList({pid:this.code,t:'sysConfig'}, function(data) {
        this_.arrayType = data;
      });
    },
    //获取图片base64实现预览
    getImgBase() {
      if(this.imgBase64.length>=4){
        this.tips={content: "最多只能选择4张", show:true};
        return false;
      }
      var this_=this;
      var formData = new window.FormData();
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function(e) {
        _this.imgBase64.push(e.target.result);
      };
      formData.append('file',file);
      var options = {  // 设置axios的参数
        //  url: this.utils+'/orderBack/imgUpload',
         url:'http://139.224.114.150:8888/orderBack/imgUpload',
         data: formData,
         method: 'post',
         headers: { 
          'Content-Type': 'multipart/form-data'
         }
      }
      axios(options).then((res) => {
         this_.imgUrl.push(res.data.data.imgUrl);
         reader.readAsDataURL(file);
      }) // 发送请求
    },
    //删除图片
    delImg(index) {
      this.imgBase64.splice(index, 1);
      this.imgUrl.splice(index,1);
    },
    submit(){
      if(this.type<=0){
          this.tips={title: '提示',content: "请选择异常类型！", show:true};
          return false;
      }
      var this_=this;
       this.utils.request.systemOutOrderExce({t:'execOrder',order_id:this.orderid,images:this.imgUrl.join(","),reason:this.type,remark:this.remark},function(data) {
         this_.tips2={title: '提示',content: "操作成功", show:true};
      });
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
    left: 3%;
    width: 95%;
    border-radius: 1.5rem;
    background-color: @color-page-background;
    .head2 {
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
.select {
  width: 60%;
  height: 35px;
  line-height: 40px;
  filter: alpha(opacity=0);
  cursor: pointer;
  font-size: 16px;
  border: hidden;
}
.image-view {
  margin: 30px auto;
}
.image-view .addbox {
  float: left;
  position: relative;
  height: 100px;
  width: 100px;
  margin-bottom: 20px;
  text-align: center;
}
.image-view .addbox input {
  position: absolute;
  left: 0;
  height: 100px;
  width: 100px;
  opacity: 0;
}
.image-view .addbox .addbtn {
  float: left;
  height: 100px;
  width: 100px;
  line-height: 100px;
  color: #fff;
  font-size: 40px;
  background: #ccc;
  border-radius: 10px;
}
.image-view .item {
  position: relative;
  float: left;
  height: 100px;
  width: 100px;
  margin: 10px 10px 0 0;
  left: 20px;
}
.image-view .item .cancel-btn {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 20px;
  height: 20px;
  color: #fff;
  line-height: 20px;
  text-align: center;
  background: red;
  border-radius: 10px;
  cursor: pointer;
}
.image-view .item img {
  width: 100%;
  height: 100%;
}
.image-view .view {
  clear: both;
}
</style>
