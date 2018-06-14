<template>
<div class="com-app">
<div class="layout">
<SiderBar v-on:SideMenu-click="listenFromSideMenu"/>
        <Layout :style="{marginLeft: '200px'}">
           <Header class="fixedHeader shadow" :style="{position: 'fixed',top:0}">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <div class="layout-logo">
                        <img style="width: 100%" src="/static/img/logo1.png">
                    </div>
                    <div class="layout-nav">
                    <Dropdown trigger="click" :style="{marginRight: '20px'}">
                        <a href="javascript:void(0)">
                            <Icon type="android-person" size="24"></Icon>
                            欢迎您，用户
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem>个人账号</DropdownItem>
                            <DropdownItem>企业信息</DropdownItem>
                            <DropdownItem>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '62px 20px 0',  minWidth: '768px'}">
                <Card>
                    <div :style="{height: '600px',background: '#fff'}">
                        <Home v-if="curMneu == '首页'"></Home>
                        <ApplicationManagement v-if="curMneu == '应用管理'"></ApplicationManagement>
                        <ProductManagement v-if="curMneu == '产品管理'"></ProductManagement>
                        <AgreementManagement v-if="curMneu == '协议管理'"></AgreementManagement>
                        <WarningSetting v-if="curMneu == '警告设置'"></WarningSetting>
                        <DebugEquipment v-if="curMneu == '调试设备'"></DebugEquipment>
                        <AmazonEcho v-if="curMneu == 'AmazonEcho'"></AmazonEcho>
                        <GoogleHome v-if="curMneu == 'GoogleHome'"></GoogleHome>
                        <YSSXT v-if="curMneu == '莹石摄像头'"></YSSXT>
                        <GZXB v-if="curMneu == '公子小白'"></GZXB>
                        <TMJL v-if="curMneu == '天猫精灵'"></TMJL>
                        <DataForwarding v-if="curMneu == '数据转发'"></DataForwarding>
                        <DevelopmentIntroduction v-if="curMneu == '开发简介'"></DevelopmentIntroduction>
                        <EmbeddedWifi v-if="curMneu == '嵌入式/Wifi'"></EmbeddedWifi>
                        <Android v-if="curMneu == 'Android'"></Android>
                        <Ios v-if="curMneu == 'iOS'"></Ios>
                        <OpenApi v-if="curMneu == 'OpenAPI'"></OpenApi>
                        <Community v-if="curMneu == '极客社区'"></Community>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
    <div class="ChangePlant" :style="{display: 'none'}">运营者平台</div>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import SiderBar from '../../components/Developer/SiderBar.vue'
import Home from '../../components/Developer/Home.vue'
import ApplicationManagement from '../../components/Developer/ApplicationManagement.vue'
import ProductManagement from '../../components/Developer/ProductManagement.vue'
import AgreementManagement from '../../components/Developer/AgreementManagement.vue'
import WarningSetting from '../../components/Developer/WarningSetting.vue'
import DebugEquipment from '../../components/Developer/DebugEquipment.vue'
import AmazonEcho from '../../components/Developer/AmazonEcho.vue'
import GoogleHome from '../../components/Developer/GoogleHome.vue'
import YSSXT from '../../components/Developer/YSSXT.vue'
import GZXB from '../../components/Developer/GZXB.vue'
import TMJL from '../../components/Developer/TMJL.vue'
import DataForwarding from '../../components/Developer/DataForwarding.vue'
import DevelopmentIntroduction from '../../components/Developer/DevelopmentIntroduction.vue'
import EmbeddedWifi from '../../components/Developer/EmbeddedWifi.vue'
import Android from '../../components/Developer/Android.vue'
import Ios from '../../components/Developer/Ios.vue'
import OpenApi from '../../components/Developer/OpenApi.vue'
import Community from '../../components/Developer/Community.vue'

  export default{
    data: function () {
      return {
        // transitionName: 'slide-left',
      }
    },
    mounted: function () {
      
    },
    created: function () {
      this.$Message.config({
          top: 82,
          duration: 1.5
      });
      
    },
    computed: {
      activeRoute(){
        return this.$store.state.activeRoute
       },
       curMneu: {
        get: function () {
          return this.$store.state.DeveloperMenuCur
        },
        set: function (newValue) {
          this.$store.state.DeveloperMenuCur = newValue
        }
       },
      
    },
    watch: {
      
    },
    components: {
        SiderBar,
        Home,
        ApplicationManagement,
        ProductManagement,
        AgreementManagement,
        WarningSetting,
        DebugEquipment,
        AmazonEcho,
        GoogleHome,
        YSSXT,
        GZXB,
        TMJL,
        DataForwarding,
        DevelopmentIntroduction,
        EmbeddedWifi,
        Android,
        Ios,
        OpenApi,
        Community



    },
    methods: {
        listenFromSideMenu(MENU){
            this.curMneu = MENU
        }
     

    }
  }
</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
}
.fixedSider{
    /*border-right: 1px solid #eee;*/
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,.25);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,.25);
    box-shadow: 0 0 9px rgba(0,0,0,.25);
}
.fixedHeader{
    width: 100%;
     /*width: calc(100% + 200px);*/
     left: 0;
     z-index:999;
}
.shadow{
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,.25);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,.25);
    box-shadow: 0 0 9px rgba(0,0,0,.25);
}
.ChangePlant{
    position:fixed;
    top:50%;
    right:0;
    padding:20px;
    border-radius:50%;
    width:80px;
    height:80px;
    color:#fff;
    text-align: center;
    background-color: #FBDA61;
    background-image: -webkit-linear-gradient(bottom left, #FBDA61 0%, #FF5ACD 100%);
    background-image: -o-linear-gradient(bottom left, #FBDA61 0%, #FF5ACD 100%);
    background-image: linear-gradient(to top right, #FBDA61 0%, #FF5ACD 100%);


}
.layout{
    /*border: 1px solid #d7dde4;
    background: #f5f7f9;*/
    position: relative;
    border-radius: 4px;
    /*overflow: hidden;*/
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo{
  width: 100px;
  height: 30px;
  /*background: #5b6270;*/
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
    float: right;
}
    
</style>
