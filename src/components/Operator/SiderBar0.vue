<template>
    <Sider class="fixedSider" :style="{position: 'fixed', left: LeftPosition, overflow: 'auto'}" >
        <Menu :active-name="ActiveName" theme="light" width="auto" accordion @on-select="SideMenuChange">
            <MenuItem name="首页">
                <Icon type="home" size="22"></Icon>
                首页
            </MenuItem>
            <Submenu name="用户管理">
                <template slot="title">
                    <Icon type="person-stalker" size="22"></Icon>
                    用户管理
                </template>
                <MenuItem name="用户情况">用户情况</MenuItem>
                <MenuItem name="活跃用户">活跃用户</MenuItem>
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
        <div slot="trigger"></div>
    </Sider>
        
</template>
<script>

  export default{
    data: function () {
      return {
        LeftPosition:'0px',
        SideMenu:[
            {'Fmenu':'首页','Smenu':[]},
            {'Fmenu':'用户管理','Smenu':['用户情况','活跃用户']},
            {'Fmenu':'设备管理','Smenu':['设备情况','设备授权']},
            {'Fmenu':'警告管理','Smenu':[]},
            {'Fmenu':'APK升级','Smenu':[]},
            {'Fmenu':'固件升级','Smenu':[]},
            {'Fmenu':'消息推送','Smenu':[]},
            {'Fmenu':'用户反馈','Smenu':[]},
            {'Fmenu':'邮件模板','Smenu':[]},
            {'Fmenu':'常见问题管理','Smenu':[]},
        ],
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
        ActiveName(){
          return this.$store.state.OperatorMenuCur
        },
        enuitemClasses: function () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        // LeftPosition(){
        //     let distance
        //     if(this.$store.state.isMobile){
        //         distance = '-200px'
        //     }else{
        //         distance = '0px'
        //     }
        //   return distance
        // },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        SideMenuChange(Smenu){
          this.$emit('SideMenu-click',Smenu)
        },
     

    }
  }
</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
}
.fixedSider{
    height: calc(100% - 60px);
    z-index: 999999;
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,.25);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,.25);
    box-shadow: 0 0 9px rgba(0,0,0,.25);
}
.shadow{
    -webkit-box-shadow: 0 0 9px rgba(0,0,0,.25);
    -moz-box-shadow: 0 0 9px rgba(0,0,0,.25);
    box-shadow: 0 0 9px rgba(0,0,0,.25);
}

    
</style>
