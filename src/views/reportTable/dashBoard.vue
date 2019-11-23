<template>
  <div>
    <!-- <van-row class="header-back">
      <van-icon name="arrow-left" class="back" @click="$router.back(-1)"/>
      <van-col span="24" align="center">运营仪表盘</van-col>
    </van-row> -->
    <van-row class="bg" type="flex" justify="center">
    <div @click="toggleAction">
        <van-col span="24" align="center">
          {{actionVal}} &nbsp;<i class="dwon"></i>
        </van-col>
      </div>
    </van-row>
     <!-- <van-row type="flex" justify="center" style="height:44px;line-height:44px">
      <van-col span="6">当日运营</van-col>
      <van-col span="6">当月运营</van-col>
      <van-col span="6">当年运营</van-col>
     </van-row> -->
     <van-tabs v-model="active" sticky>
      <van-tab title="当日运营" @click="getOperatingList('day')"></van-tab>
      <van-tab title="当月运营" @click="getOperatingList('month')"></van-tab>
      <van-tab title="当年运营" @click="getOperatingList('year')"></van-tab>
    </van-tabs>
    
    <div class="box">
      <div class="title">
        <span class="icon-1"></span> 三方
      </div>
      <div class="content">
          <van-cell-group>
            <van-cell title="新增运单" :value="null!=viewDatas.newtransport?viewDatas.newtransport:'0'" />
            <van-cell title="新增加盟商" :value="null!=viewDatas.newtrader?viewDatas.newtrader:'0'"/>
            <van-cell title="重量" :value="null!=viewDatas.newcargoweight?viewDatas.newcargoweight:'0'"/>
            <van-cell title="体积" :value="null!=viewDatas.newcargovolume?viewDatas.newcargovolume:'0'"/>
            <van-cell title="件数" :value="null!=viewDatas.newcargoamount?viewDatas.newcargoamount:'0'"/>
            <van-cell title="运输收入" :value="null!=viewDatas.newtransportmoney?viewDatas.newtransportmoney:'0'"/>
            <van-cell title="开票金额运费" :value="null!=viewDatas.newInvoiceFeeMoney?viewDatas.newInvoiceFeeMoney:'0'"/>
            <van-cell title="保险金额" :value="null!=viewDatas.newInsuranceFeeMoney?viewDatas.newInsuranceFeeMoney:'0'"/>
          </van-cell-group>
      </div>
      <div class="title">
        <span class="icon-1"></span> 运力
      </div>
      <div class="content">
          <van-cell-group>
            <van-cell title="新增运力" :value="null!=viewDatas.newvehicle?viewDatas.newvehicle:'0'" />
            <van-cell title="新增订单" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="交易金额" :value="null!=viewDatas.newOrderMoney?viewDatas.newOrderMoney:'0'"/>
          </van-cell-group>
      </div>
      <div class="title">
        <span class="icon-1"></span> 金融
      </div>
      <div class="content">
          <van-cell-group>
            <van-cell title="新增第三方借款" :value="null!=viewDatas.newdaikuanmoney?viewDatas.newdaikuanmoney:'0'" />
            <van-cell title="回收三方借款" :value="null!=viewDatas.returndaikuanrmoney?viewDatas.returndaikuanrmoney:'0'" />
            <van-cell title="三方借款赊额" :value="null!=viewDatas.newDaikuanrMoneyCredit?viewDatas.newDaikuanrMoneyCredit:'0'" />
          </van-cell-group>
      </div>
      <div class="title">
        <span class="icon-1"></span> 通通配
      </div>
      <div class="content">
          <van-cell-group>
            <van-cell title="客户数量" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="订单数量" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="重量" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="体积" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="件数" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="配送车辆数量" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="订单运费金额" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="配送成本金额" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
            <van-cell title="配送异常订单数" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'"/>
          </van-cell-group>
      </div>
      <div class="title">
        <span class="icon-1"></span> 园区
      </div>
      <div class="content">
          <van-cell-group>
            <van-cell title="入园车辆" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="出园车辆" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="停车时长" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="停车收费" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="租户数量" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
            <van-cell title="出租率" :value="null!=viewDatas.neworder?viewDatas.neworder:'0'" />
          </van-cell-group>
      </div>
    </div>

    <van-actionsheet
          v-model="actionShow"
          :actions="actions"
          cancel-text="取消"
          @select="onSelect"
          @cancel="closeAction"
        />
  </div>
</template>
<script>
export default {
  data(){
    return {
      viewDatas:{},
      activeNames: ['1'],
      actionShow: false,
      actionVal: '全部组织',
      actions: [
        {
          name: '全部组织'
        }
      ],
      active: 0 //获取不同数据用
    }
  },
  mounted(){
    this.$store.commit('changeParame', {headerBack:true,hederContent:'运营仪表盘',bottom:'2',bottomShow: false})
    this.getOperatingList('day');
  },
  methods:{
    onSelect(item) {
      this.toggleAction()
      this.actionVal = item.name
    },
    toggleAction(){
      this.actionShow = (this.actionShow) ? false : true
    },
    closeAction(){
      this.actionShow = false
    },
    getOperatingList(type){
         // 渲染数据
      this.$axios.post('http://nuser.zgtgroup.com/' + 'operating/queryAll',this.$qs.stringify({account:this.userName,password:this.userPsd,loginChannel:'adr',DataTime:type}))
      .then(rsp => {
        if(rsp.data.code == '9999'){
          this.errPsd = rsp.data.msg;
        }else{
          this.viewDatas = rsp.data.data;
        }
      })
      .catch(error => {
        console.log(error);
      });
    },
    loadMore(){
    }
  },
  watch:{
      active(){
        this.viewDatas={};
        if(this.active==0){
          this.getOperatingList('day');
        }else if(this.active==1){
          this.getOperatingList('month');
        }else if(this.active==2){
          this.getOperatingList('year');
        }
      }
  }
}
</script>
<style lang="less" scoped>
.title{
  height: 40px;
  line-height: 40px;
  background-color: rgb(248, 249, 250, alpha);
  padding: 0 4%;
}
.icon-1{
  display: inline-block;
  width: 8px;
  height: 1rem;
  border-radius: 1rem;
  position: relative;
  left: 0;
  top: .1rem;
  background-color: #F5A623;
}
.box{
  position: fixed;
  width: 100%;
  height: calc(100% - 132px);
  overflow: auto;
  top: 134px;
  left: 0;
}
</style>

