<template>
    <div>
      <div align="center" style="background-color: #fff;width: 100%;height: 110px;margin-top: 15px;" @click="beginScan(1)">
        <div style="color:rgba(84, 86, 87, 0.71);padding-right: 90px;font-size: 16px;position: relative;top: 30px;"><span>*先生</span> &nbsp;&nbsp;&nbsp;&nbsp;<span>13564611247</span></div>
        <div><input placeholder="取件地址" type="text" style="position: relative;top: 40px;right: 20px;color: rgb(110, 110, 110);" value="上海市松江区正广通集团" disabled/></div>
       <img src="../../assets/images/tm.jpg" alt="" style="width: 40px;height: 30px;float: left;margin-left: 20px;">
      </div>
      <div align="center" style="background-color: #fff;width: 100%;height: 110px;margin-top: 15px;" @click="beginScan(2)">
        <div><input placeholder="寄到哪里" type="text" style="position: relative;top: 45px;right: 20px;color: rgb(110, 110, 110);"/></div>
       <img src="../../assets/images/tm.jpg" alt="" style="width: 40px;height: 30px;float: left; margin-left: 20px;margin-top: 20px;">
      </div>
      <div align="center" style="padding-top: 30px;"><button style="width:95%" type="button" class="el-button el-button--primary"><!----><!----><span>下一步</span></button></div>
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
    window.getToAddress = (address='') => {
      this.updateOrderStatus(address);
    }
  },
  mounted(){
    this.$store.commit('changeParame', {headerBack:false,hederContent:'寄收件地址',bottom:'1',bottomShow:false})
  },
  methods:{
    beginScan(type){
      this.type=type;
      this.utils.request.getCamera();
    },
    updateOrderStatus(orderNo){
      this.utils.request.pdaOrderStatusSet({'orderNos':orderNo,'type':this.type},function(data){
          alert('操作成功');
      });
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
<style>
#app{
  background-color:#F5F5F5
}
.el-button--primary {
    color: #fff!important;
    background-color: #409eff !important;
    border-color: #409eff !important;
}
.el-button {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #dcdfe6;
    border-color: #dcdfe6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    transition: .1s;
    font-weight: 500;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
}
.header{
  background-color: #fff;
  color: #333;
  font-weight: 600;
}
</style>
