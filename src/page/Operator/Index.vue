<template>
<div class="com-app">
<div class="layout">
    <SiderBar v-on:SideMenu-click="listenFromSideMenu"  v-on:SideStatus="listenSideStatus"/>
    <Layout>
        <Content :style="{ minWidth: '678px',marginLeft:LeftDistance?'0px':'200px'}">
            <Header class="shadow" :style="{position: 'fixed',top:0,left:LeftDistance?'0px':'200px', width: '100%',background:'#fff',zIndex:999,overflow:'hidden'}">
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
                    <div style="display: inline-block;" v-if="curMneu != '首页' && curMneu != '个人账号' && curMneu != '企业信息' && curMneu != '子账户管理' && curMneu != '设备情况' && curMneu != '设备授权' && curMneu != '用户情况' && curMneu != '活跃用户'">
                        <!-- 当前应用 -->
                        <span v-if="curMneu == '用户情况' || curMneu == '活跃用户' || curMneu == 'APK升级' || curMneu == '消息推送' || curMneu == '用户反馈' || curMneu == '邮件模板' || curMneu == '常见问题管理'">
                            <b>当前应用:</b>
                            <Select v-model="CurApplication" style="width:200px;marginRight:10px;" @on-change="ChangeCurApplication">
                                <Option v-for="item in ApplicationList" :value="item.id" :key="item.id">{{ item.apply_name }}</Option>
                            </Select>
                        </span>
                        <!-- 当前产品 -->
                        <span v-else>
                            <b>当前产品:</b>
                            <Select v-model="CurProduction" style="width:200px;marginRight:10px;" @on-change="ChangeCurProduction">
                                <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                            </Select>
                        </span>
                    </div>
                    
                </div>

                <!-- <Dropdown trigger="click" :style="{marginRight: '20px'}">
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
                </Dropdown> -->
            </Header>
            <Card :bordered="false" dis-hover>
                <div>
                    <Home v-if="curMneu == '首页'"></Home>
                    <IndividualAccount v-if="curMneu == '个人账号'"></IndividualAccount>
                    <!-- <ModifyInfo v-if="curMneu == '修改个人信息'"></ModifyInfo> -->
                    <EnterpriseInfo v-if="curMneu == '企业信息'"></EnterpriseInfo>
                    <UserSituation v-if="curMneu == '用户情况'" ref="UserSituation"></UserSituation>
                    <ActiveUser v-if="curMneu == '活跃用户'" ref="ActiveUser"></ActiveUser>
                    <Subaccount v-if="curMneu == '子账户管理' && Type=='大客户'"></Subaccount>
                    <EquipmentCondition v-if="curMneu == '设备情况'" ref="EquipmentCondition"></EquipmentCondition>
                    <EquipmentAuthorization v-if="curMneu == '设备授权'" ref="EquipmentAuthorization"></EquipmentAuthorization>
                    <Alert v-if="curMneu == '警告管理'" ref="Alert"></Alert>
                    <ApkUpgrade v-if="curMneu == 'APK升级'" ref="ApkUpgrade"></ApkUpgrade>
                    <FirmwareUpdate v-if="curMneu == '固件升级'" ref="FirmwareUpdate"></FirmwareUpdate>
                    <MessagePush v-if="curMneu == '消息推送'"  ref="MessagePush"></MessagePush>
                    <UserFeedback v-if="curMneu == '用户反馈'" ref="UserFeedback"></UserFeedback>
                    <MailTemplate v-if="curMneu == '邮件模板'" ref="MailTemplate"></MailTemplate>
                    <CommonProblem v-if="curMneu == '常见问题管理'" ref="CommonProblem"></CommonProblem>
                    
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
import SiderBar from '../../components/Operator/SiderBar.vue'
import Home from '../../components/Operator/Home.vue'
import IndividualAccount from '../../components/Common/IndividualAccount.vue'
// import ModifyInfo from '../../components/Common/ModifyInfo.vue'
import EnterpriseInfo from '../../components/Common/EnterpriseInfo.vue'
import Alert from '../../components/Operator/Alert.vue'
import UserSituation from '../../components/Operator/UserSituation.vue'
import ActiveUser from '../../components/Operator/ActiveUser.vue'
import Subaccount from '../../components/Operator/Subaccount.vue'
import EquipmentCondition from '../../components/Operator/EquipmentCondition.vue'
import EquipmentAuthorization from '../../components/Operator/EquipmentAuthorization.vue'
import ApkUpgrade from '../../components/Operator/ApkUpgrade.vue'
import FirmwareUpdate from '../../components/Operator/FirmwareUpdate.vue'
import MessagePush from '../../components/Operator/MessagePush.vue'
import UserFeedback from '../../components/Operator/UserFeedback.vue'
import MailTemplate from '../../components/Operator/MailTemplate.vue'
import CommonProblem from '../../components/Operator/CommonProblem.vue'
  export default{
    data: function () {
      return {
        isCollapsed: false,
        LeftDistance:false,
        // CurrentApplication:1,
        // ApplicationList:[], //应用列表
        // ProductionList:[], //产品列表
        cityList: [
            {
                value: 0,
                label: '声控开关'
            },
            {
                value: 1,
                label: '电子门禁'
            },
        ]
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
        Type(){
            let Type = CryptoJS.AES.decrypt(this.$store.state.userInfo.userType,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return Type
        },
        UserName(){
            return CryptoJS.AES.decrypt(this.$store.state.userInfo.username,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
        },
        activeRoute(){
            return this.$store.state.activeRoute
        },
        curMneu: {
            get: function () {
              return this.$store.state.OperatorMenuCur
            },
            set: function (newValue) {
              this.$store.state.OperatorMenuCur = newValue
            }
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
        ApplicationList:{
            get: function () {
              return this.$store.state.ApplicationList
            },
            set: function (newValue) {
              this.$store.state.ApplicationList = newValue
            }
        },
        ProductionList:{
            get: function () {
              return this.$store.state.ProductionList
            },
            set: function (newValue) {
              this.$store.state.ProductionList = newValue
            }
        },
        // rotateIcon () {
        //     return [
        //         'menu-icon',
        //         this.isCollapsed ? 'rotate-icon' : ''
        //     ];
        // },


      
    },
    watch: {
    },
    components: {
        SiderBar,
        Home,
        IndividualAccount,
        //ModifyInfo,
        EnterpriseInfo,
        UserSituation,
        ActiveUser,
        Subaccount,
        EquipmentCondition,
        EquipmentAuthorization,
        Alert,
        ApkUpgrade,
        FirmwareUpdate,
        MessagePush,
        UserFeedback,
        MailTemplate,
        CommonProblem
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
        //切换当前应用
        ChangeCurApplication(){
            switch(this.curMneu){
                case 'APK升级':
                this.$refs.ApkUpgrade.GetApkList()
                break
                case '用户情况':
                this.$refs.UserSituation.GetPageData()
                this.$refs.UserSituation.refreshLineChart()
                break
                case '活跃用户':
                this.$refs.ActiveUser.GetPageData()
                this.$refs.ActiveUser.refreshLineChart()
                break
                case '消息推送':
                this.$refs.MessagePush.GetMessageList()
                break
                case '用户反馈':
                this.$refs.UserFeedback.GetFeedbackList()
                break
                case '邮件模板':
                this.$refs.MailTemplate.GetTemplateInfo()
                break
                case '常见问题管理':
                this.$refs.CommonProblem.GetProblemList()
                break
                
                
            }
        },
        //切换当前产品
        ChangeCurProduction(){
            switch(this.curMneu){
                case '固件升级':
                this.$refs.FirmwareUpdate.GetFirmwareList()
                break
                case '警告管理':
                this.$refs.Alert.GetPageData()
                this.$refs.Alert.refreshLineChart()
                break
                case '设备情况':
                this.$refs.EquipmentCondition.GetPageData()
                this.$refs.EquipmentCondition.refreshLineChart()
                break
                case '设备授权':
                this.$refs.EquipmentAuthorization.GetPageData()
                break

                
            }
            
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
.ivu-layout-header{
    height: 45px;
    line-height: 45px;

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
