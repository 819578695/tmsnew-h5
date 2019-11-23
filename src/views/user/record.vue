<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item :title="val.title" :name="val.name" v-for="(val,index) in data" :key="index">
        IP：{{val.ip}}     地址：{{val.ipAddress}}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data(){
    return{
      activeNames: ['1'],
      data:[]
    }
  },
  mounted(){
    var this_=this;
    this.$store.commit('changeParame', {headerBack:true,hederContent:'登录记录',bottom:'1',bottomShow:false}),
    this.utils.request.getUserLoginRecord('',function(data){
      if(null!=data && data.length>0){
        for(var i=0;i<data.length;i++){
          var obj={};
          obj.title='登录时间      '+data[i].create_time;
          obj.name=i+1;
          obj.ip=""!=data[i].ip?data[i].ip:"---";
          obj.ipAddress=""!=data[i].ip_address?data[i].ip_address:"---";
          this_.data.push(obj);
        }
      }
    });
  }
}
</script>
<style>

</style>
