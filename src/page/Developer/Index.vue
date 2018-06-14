<template>
<div class="com-app">
<div class="layout">
    <SiderBar v-on:SideMenu-click="listenFromSideMenu"  v-on:SideStatus="listenSideStatus"/>
        <Layout>
            <Content :style="{ minWidth: '1080px',marginLeft:LeftDistance?'0px':'200px'}">
                <Header class="shadow" :style="{position: 'fixed',top:0,left:LeftDistance?'0px':'200px', width: '100%',background:'#fff',zIndex:999}">
                    <Icon v-if="LeftDistance" @click.native="collapsedSider" class="menu-icon" :style="{margin: '2px 20px 0'}" type="navicon-round" size="24"></Icon>
                    <Icon v-if="!LeftDistance" @click.native="collapsedSider" class="rotate-icon" :style="{margin: '2px 2px 0'}" type="chevron-left" size="24"></Icon>
                    <Button @click="GoDeveloper" type="text" :class="{active:activeRoute=='开发者平台'}">开发平台</Button>
                    |
                    <Button @click="GoOperator" type="text" :class="{active:activeRoute=='运营者平台'}">运营平台</Button>

                    

                    <div :style="{float: 'right',marginRight:LeftDistance?'0px':'200px'}">
                        <Button @click="Logout" type="text">
                            {{UserName}}
                            <Icon type="power" size="14"></Icon>
                            退出
                        </Button>
                    </div>
                </Header>
                <Card :bordered="false" shadow>
                    <div :style="{height: '600px',background: '#fff'}">
                        <Home v-if="curMneu == '首页'"></Home>
                        <IndividualAccount v-if="curMneu == '个人账号'"></IndividualAccount>
                        <EnterpriseInfo v-if="curMneu == '企业信息'"></EnterpriseInfo>
                        <ApplicationManagement v-if="curMneu == '应用管理'" v-on:refreshApplicationList="RefreshApplication" v-on:refreshProductionList="RefreshProduction"></ApplicationManagement>
                        <ProductManagement v-if="curMneu == '产品管理'" v-on:refreshProductionList="RefreshProduction"></ProductManagement>
                        <AgreementManagement v-if="curMneu == '协议管理'"></AgreementManagement>
                        <WarningSetting v-if="curMneu == '警告设置'"></WarningSetting>
                        <DebugEquipment v-if="curMneu == '调试设备'"></DebugEquipment>
                        <Equipments v-if="curMneu == '设备管理'" ></Equipments>
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
import CryptoJS from "crypto-js"
import {clearCookie} from '../../util/utils'
import SiderBar from '../../components/Developer/SiderBar.vue'
import Home from '../../components/Developer/Home.vue'
import IndividualAccount from '../../components/Common/IndividualAccount.vue'
import EnterpriseInfo from '../../components/Common/EnterpriseInfo.vue'
import ApplicationManagement from '../../components/Developer/ApplicationManagement.vue'
import ProductManagement from '../../components/Developer/ProductManagement.vue'
import AgreementManagement from '../../components/Developer/AgreementManagement.vue'
import WarningSetting from '../../components/Developer/WarningSetting.vue'
import DebugEquipment from '../../components/Developer/DebugEquipment.vue'
import Equipments from '../../components/Developer/Equipments.vue'
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
        isCollapsed: false,
        LeftDistance:false
      }
    },
    mounted: function () {
      
    },
    created: function () {
      this.$Message.config({
          top: 82,
          duration: 1.5
      });
      this.GetAllApplication()
      this.GetAllProduction()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        UserName(){
            return CryptoJS.AES.decrypt(this.$store.state.userInfo.username,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
        },
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
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        CurApplication: {
            get: function () {
              return this.$store.state.CurApplication
            },
            set: function (newValue) {
              this.$store.state.CurApplication = newValue
            }
        },
        CurProduction: {
            get: function () {
              return this.$store.state.CurProduction
            },
            set: function (newValue) {
              this.$store.state.CurProduction = newValue
            }
        },

      
    },
    watch: {
      
    },
    components: {
        SiderBar,
        Home,
        IndividualAccount,
        EnterpriseInfo,
        ApplicationManagement,
        ProductManagement,
        AgreementManagement,
        WarningSetting,
        DebugEquipment,
        Equipments,
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
        },
        listenSideStatus(Status){
            this.LeftDistance = Status
        },
        collapsedSider () {
            this.LeftDistance = !this.LeftDistance
            this.$children[0].$refs.side1.toggleCollapse();
        },
        GoDeveloper(){
            this.$router.push({name:'开发者平台'})
        },
        GoOperator(){
            this.$router.push({name:'运营者平台'})
        },
        Logout(){
            localStorage.clear()
            clearCookie('btznkz')
            this.$router.push({name:'登录'})
        },
        RefreshApplication(){
            // alert('刷新 应用')
            this.GetAllApplication()
        },
        RefreshProduction(){
            // alert('刷新 产品')
            this.GetAllProduction()
        },
        //获取所有应用
        GetAllApplication(){
            axios.get(R_PRE_URL+'selectallapply?userid='+this.ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  if(res.data.applylist[0]){
                    this.CurApplication = this.$store.state.CurApplication == ''?res.data.applylist[0].id:this.$store.state.CurApplication
                    this.$store.state.ApplicationList = res.data.applylist
                  }else{
                    this.CurApplication = ''
                  }
                  break
                  case 0:
                  this.$Message.error('获取应用列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取应用列表失败!')
                this.modal_loading = false
            })
        },
        //获取所有产品列表
        GetAllProduction(){
            axios.get(R_PRE_URL+'selectallpro?userid='+this.ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  if(res.data.prolist[0]){
                    this.CurProduction = this.$store.state.CurProduction == ''?res.data.prolist[0].id:this.$store.state.CurProduction
                    this.$store.state.ProductionList = res.data.prolist
                  }else{
                    this.CurProduction = ''
                  }
                  break
                  case 0:
                  this.$Message.error('获取产品列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,获取产品列表失败!')
                this.modal_loading = false
            })
        },
     

    }
  }
</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
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
