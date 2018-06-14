<template>
<div class="com-app">
<div class="layout">
<SiderBar v-on:SideMenu-click="listenFromSideMenu"/>
        <Layout :style="{marginLeft: LeftPosition}">
           <Header class="fixedHeader shadow" :style="{position: 'fixed',top:0}">
                <Menu mode="horizontal" theme="light" active-name="1">
                    <div class="layout-logo">
                        <img style="width: 100%" src="/static/img/logo1.png">
                    </div>
                    <div class="layout-nav">
                    <Dropdown trigger="click" :style="{marginRight: '20px'}" @on-click="ChangeDropdown">
                        <a href="javascript:void(0)">
                            <Icon type="android-person" size="24"></Icon>
                            欢迎您，用户
                            <Icon type="arrow-down-b"></Icon>
                        </a>
                        <DropdownMenu slot="list">
                            <DropdownItem name="individualAccount">个人账号</DropdownItem>
                            <DropdownItem name="enterpriseInfo">企业信息</DropdownItem>
                            <DropdownItem name="logout">退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    </div>
                </Menu>
            </Header>
            <Content :style="{margin: '62px 20px 0',  minWidth: '768px'}">
                <Card :bordered="false" dis-hover>
                    <div :style="{}">
                        <Home v-if="curMneu == '首页'"></Home>
                        <Alert v-if="curMneu == '警告管理'"></Alert>
                        <UserSituation v-if="curMneu == '用户情况'"></UserSituation>
                        <ActiveUser v-if="curMneu == '活跃用户'"></ActiveUser>
                        <EquipmentCondition v-if="curMneu == '设备情况'"></EquipmentCondition>
                        <EquipmentAuthorization v-if="curMneu == '设备授权'"></EquipmentAuthorization>
                        <ApkUpgrade v-if="curMneu == 'APK升级'"></ApkUpgrade>
                        <FirmwareUpdate v-if="curMneu == '固件升级'"></FirmwareUpdate>
                        <MessagePush v-if="curMneu == '消息推送'"></MessagePush>
                        <UserFeedback v-if="curMneu == '用户反馈'"></UserFeedback>
                        <MailTemplate v-if="curMneu == '邮件模板'"></MailTemplate>
                        <CommonProblem v-if="curMneu == '常见问题管理'"></CommonProblem>
                        
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
import SiderBar from '../../components/Operator/SiderBar.vue'
import Home from '../../components/Operator/Home.vue'
import Alert from '../../components/Operator/Alert.vue'
import UserSituation from '../../components/Operator/UserSituation.vue'
import ActiveUser from '../../components/Operator/ActiveUser.vue'
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
        LeftPosition:'200px',
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
          return this.$store.state.OperatorMenuCur
        },
        set: function (newValue) {
          this.$store.state.OperatorMenuCur = newValue
        }
       },
       // LeftPosition(){
       //      let distance
       //      if(this.$store.state.isMobile){
       //          distance = '0px'
       //      }else{
       //          distance = '200px'
       //      }
       //    return distance
       //  },
      
    },
    watch: {
      
    },
    components: {
        SiderBar,
        Home,
        Alert,
        UserSituation,
        ActiveUser,
        EquipmentCondition,
        EquipmentAuthorization,
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
        ChangeDropdown(NAME){
            switch(NAME){
              case 'individualAccount':
              break
              case 'enterpriseInfo':
              break
              case 'logout':
              localStorage.clear();
              this.$router.push({name:'登录'})
              break
            }
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
.ivu-card{
  background-color: transparent;
}
</style>
