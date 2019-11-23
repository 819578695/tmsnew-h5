<template>
  <div class="tips">
    <div id="wallet-del" class="enter-password">
        <div class="con">
          <p class="padding-left head2">{{title}}</p>
          <div class="psd" style="padding-left: 32px;padding-top: 6px;">
            {{content}}
          </div>
           <div class="foot">
               <span class="cancel"  @click="cancel" v-if="close">
                关闭
              </span>
              <span class="affirm" @click="closeTips">
                确认
              </span>
            </div>
        </div>
    </div> 
  </div>
  
</template>
<script>
export default {
  props:["title","content","close"],
  methods:{
    closeTips () {
      this.$emit("close", "");
      if(this.close){
        this.$emit("confirm",'')
      }
    },
    cancel () {
      this.$emit("close", "");
    }
  }
}
</script>
<style lang="less" scoped>
@import url("../assets/css/variables.less");
.enter-password {
  position: fixed;
  left: 0;
  background-color: @color-dialog-background;
  width: 100%;
  height: 100%;
  z-index: 9999;
  .con {
    padding: 0 4%;
    position: absolute;
    left: 10%;
    bottom: 50%;
    width: 80%;
    border-radius: 1.5rem;
    background-color: @color-page-background;
    .head2{
      margin: 2rem 8 1rem;
      font-size: 18px;
      color: #999;
    }
    .foot {
      border-radius: 0 0 1.5rem 1.5rem;
      height: 6rem;
      line-height: 8rem;
      text-align: right;
      span {
        display: inline-block;
        font-size: 17px;
        padding-right:3%;
        color: #3d81f8;
      }
      .cancel {
        color: @color-text-light-black;
        margin-right: 2rem;
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
