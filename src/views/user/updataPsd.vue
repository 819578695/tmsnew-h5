<template>
  <div>
    <van-cell-group class="psd">
      <van-field
        v-model="state.psd0.password"
        :type="state.psd0.type"
        label="初始密码"
        placeholder="请输入密码"
        :icon="state.psd0.icon"
        @click-icon="showPsd('psd0')"
        required
      />
      <van-field
        v-model="state.psd1.password"
        :type="state.psd1.type"
        label="新密码"
        placeholder="请输入新密码"
        :icon="state.psd1.icon"
        @click-icon="showPsd('psd1')"
        required
      />
      <van-field
        v-model="state.psd2.password"
        :type="state.psd2.type"
        label="重复新密码"
        placeholder="请重新输入新密码"
        :icon="state.psd2.icon"
        @click-icon="showPsd('psd2')"
        required
      />
      <van-button type="primary" size="large" @click="checkSubmit">确认更改</van-button>
    </van-cell-group>
  </div>
</template>
<script>
import Dialog from 'vant';
export default {
  data(){
    return {
      userName:'正广通H5',
      headImg: '',  //用户头像,
      state:{
        psd0:{
          icon: 'password-not-view',
          type: 'password',
          password: ''
        },
        psd1:{
          icon: 'password-not-view',
          type: 'password',
          password: ''
        },
        psd2:{
          icon: 'password-not-view',
          type: 'password',
          password: ''
        },
      }
    }
  },
  mounted(){
    // this.store.commit("changeHeader(true,'21')")
    // this.$store.getters.changeHeader(true,'21');
    this.$store.commit('changeParame', {headerBack:true,hederContent:'密码修改',bottomShow:false})
    //  this.$store.changeHeader(true,'21');

    // this.utils.request.editUserInfo({'t':'sysUser','newUserName':'111111a'},function(data){
    //   debugger
    // });
  },
  methods:{
    outLogin(){
      localStorage.setItem('isLogin',false)
    },
    showPsd(p){
      this.state[p].icon = (this.state[p].icon == "password-not-view") ? "password-view" : "password-not-view"
      this.state[p].type = (this.state[p].type == "password") ? "test" : "password"
    },
    checkSubmit(){
      var this_=this;
      if(''==this.state.psd0.password || ''==this.state.psd1.password || ''==this.state.psd2.password){
          this.$dialog.alert({
            message:'密码不能为空'
          });
          return false;
      }else if(this.state.psd1.password!=this.state.psd2.password){
         this.$dialog.alert({
            message:'密码不一致'
          });
        return false;
      }else{
        this.utils.request.editUserInfo({'t':'sysUser','oldPwd':this.state.psd0.password,'password':this.state.psd1.password},function(data){
          this.$dialog.alert({
            message:'修改成功'
          });
            this_.$router.push({name:'user'})
        });
      }
    }
  }
}
</script>
<style lang="less" scoped>
.psd{
  margin-top: 50px;
}
button{
  margin-top: 50px;
}
</style>

