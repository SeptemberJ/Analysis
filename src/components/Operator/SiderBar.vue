<template>
<Sider class="fixedSider" :style="{}" ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :on-collapse="onCollapse">
    <img :style="{width: '200px',height: '40px'}" src="static/img/logo1.png">
    <Menu :active-name="ActiveName" theme="light" width="auto" accordion @on-select="SideMenuChange" :class="menuitemClasses">
        <MenuItem name="首页">
            <Icon type="home" size="22"></Icon>
            首页
        </MenuItem>
        <Submenu name="账户管理">
            <template slot="title">
                <Icon type="social-buffer" size="22"></Icon>
                账户管理
            </template>
            <MenuItem name="个人账号">个人账号</MenuItem>
            <MenuItem name="企业信息">企业信息</MenuItem>
        </Submenu>
        <Submenu name="用户管理">
            <template slot="title">
                <Icon type="ios-people" size="22"></Icon>
                用户管理
            </template>
            <MenuItem name="活跃用户">活跃用户</MenuItem>
            <MenuItem name="用户情况">用户情况</MenuItem>
            <MenuItem name="子账户管理" v-if="Type=='大客户'">子账户管理</MenuItem>
        </Submenu>
        <Submenu name="设备管理">
            <template slot="title">
                <Icon type="monitor" size="22"></Icon>
                设备管理
            </template>
            <MenuItem name="设备情况">设备情况</MenuItem>
            <MenuItem name="设备授权">设备授权</MenuItem>
        </Submenu>
        <MenuItem name="警告管理">
            <Icon type="alert" size="22"></Icon>
            警告管理
        </MenuItem>
        <MenuItem name="APK升级">
            <Icon type="social-android-outline" size="22"></Icon>
            APK升级
        </MenuItem>
        <MenuItem name="固件升级">
            <Icon type="android-archive" size="22"></Icon>
            固件升级
        </MenuItem>
        <MenuItem name="消息推送">
            <Icon type="chatboxes" size="22"></Icon>
            消息推送
        </MenuItem>
        <MenuItem name="用户反馈">
            <Icon type="ios-paper-outline" size="22"></Icon>
            用户反馈
        </MenuItem>
        <MenuItem name="邮件模板">
            <Icon type="email" size="22"></Icon>
            邮件模板
        </MenuItem>
        <MenuItem name="常见问题管理">
            <Icon type="help" size="22"></Icon>
            常见问题管理
        </MenuItem>
    </Menu>
</Sider>
</template>
<script>
import CryptoJS from "crypto-js"
  export default{
    data: function () {
      return {
        isCollapsed: false,
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        ActiveName(){
          return this.$store.state.OperatorMenuCur
        },
        rotateIcon(){
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : '123'
            ];
        },
        Type(){
            let Type = CryptoJS.AES.decrypt(this.$store.state.userInfo.userType,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return Type
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        SideMenuChange(Smenu){
          this.$emit('SideMenu-click',Smenu)
          // this.$refs.side1.toggleCollapse();
          // this.onCollapse(true)
        },
        onCollapse(Status){
        	//this.$emit('SideStatus',Status)  //true 关闭sider
        }
        

    }
  }
</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
}
.fixedSider{
    position: fixed; 
    height: 100%;
    left:0;
    top:0;
    float:left;
    overflow:auto;
    z-index: 999;
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,.25);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,.25);
    box-shadow: 0 0 9px rgba(0,0,0,.25);
}
.ivu-layout-sider{
    height: 100%;
    background-color: #fff;
}
.menu-icon{
    transition: all .3s;
}
.rotate-icon{
    transform: rotate(-90deg);
}
.menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
}
.menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
}
.collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
}
.collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
}
    
</style>
