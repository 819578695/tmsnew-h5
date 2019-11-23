<template>
  <div>
    <img src="../assets/images/logo.jpg" alt="" class="logo">
    <van-cell-group>
      <van-field
        v-model="userName"
        label="手机号"
        placeholder="请输入手机号"
        :error-message="errName"
        left-icon="contact"
        @focus="cleanErr('errName')"
      />
      <van-field
        v-model="userPsd"
        :type="type"
        label="密码"
        placeholder="请输入密码"
        :error-message="errPsd"
        left-icon="pending-orders"
        @focus="cleanErr('errPsd')"
        :icon="icon"
        @click-icon="showPsd()"
      />
    </van-cell-group>
    <br />
    <div class="button--large login"  @click="login">
      登录
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return{
      userName:'',
      errName:'',
      userPsd:'',
      errPsd:'',
      icon: 'password-not-view',
      type:'password'
    }
  },
  mounted(){
    const s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://pv.sohu.com/cityjson?ie=utf-8';
    document.body.appendChild(s);
    this.$store.commit('changeParame', {headerShow:false,hederContent:'登录',bottom:'0',bottomShow: false})
  },
  methods:{
    login(){
      if(this.userName == ''){
        this.errName = '账号不能为空'
      }else if(this.userPsd == ''){
        this.errPsd = '密码不能为空'
      }else{
        // 发送post请求
         this.$axios.post('http://tms-api.zgtgroup.com/' + 'suser/appLoginSite',this.$qs.stringify({mobile:this.userName,pwd:this.userPsd,loginChannel:'adr',ip:returnCitySN["cip"],ip_address:returnCitySN["cname"]}))
        .then(rsp => {
          if(rsp.data.code == '9999'){
            this.errPsd = rsp.data.msg;
          }else{
            if(rsp.data.msg=='用户名密码错误'){
              this.errName = '用户名密码错误'
              return false;
            }
            localStorage.setItem('token',rsp.data.data.token);
            localStorage.setItem('siteId',rsp.data.data.site_id);
            this.$store.commit('login');
            this.$router.push({name:'reporting'});
            localStorage.setItem('isLogin','true')
            localStorage.setItem('type',rsp.data.data.type)
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    login2(){
      if(this.userName == ''){
        this.errName = '账号不能为空'
      }else if(this.userPsd == ''){
        this.errPsd = '密码不能为空'
      }else{
        // 发送post请求
        if(this.userName != 'admin'){
          this.errName = '体验账号为admin'
        }else if(this.userPsd == 123){
          this.errPsd = '体验账号密码错误'
        }else{
          this.$store.commit('login'); 
          this.$router.push({name:'reporting'});
          localStorage.setItem('isLogin','true')
        }
      }
    },
    cleanErr(p){
      this[p] = ''
    },
    showPsd(){
      this.icon = (this.icon == "password-not-view") ? "password-view" : "password-not-view"
      this.type = (this.type == "password") ? "test" : "password"
    }
  }
}
</script>
<style scoped>
.logo{
  width: 70%;
  display: block;
  margin: 5rem auto;
}
</style>
