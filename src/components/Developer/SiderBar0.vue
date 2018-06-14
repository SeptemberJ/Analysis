<template>
    <Sider class="fixedSider" :style="{position: 'fixed',left: 0, overflow: 'auto'}">
         <Menu :active-name="ActiveName" theme="light" width="auto" accordion @on-select="SideMenuChange">
            <MenuItem name="首页">
                <Icon type="home" size="22"></Icon>
                首页
            </MenuItem>
            <Submenu name="产品开发">
                <template slot="title">
                    <Icon type="cube" size="22"></Icon>
                    产品开发
                </template>
                <MenuItem name="应用管理">应用管理</MenuItem>
                <MenuItem name="产品管理">产品管理</MenuItem>
                <MenuItem name="协议管理">协议管理</MenuItem>
                <MenuItem name="警告设置">警告设置</MenuItem>
                <MenuItem name="调试设备">调试设备</MenuItem>
            </Submenu>
            <Submenu name="智能互联">
                <template slot="title">
                    <Icon type="earth" size="22"></Icon>
                    智能互联
                </template>
                <MenuItem name="AmazonEcho">Amazon Echo</MenuItem>
                <MenuItem name="GoogleHome">Google Home</MenuItem>
                <MenuItem name="莹石摄像头">莹石摄像头</MenuItem>
                <MenuItem name="公子小白">公子小白</MenuItem>
                <MenuItem name="天猫精灵">天猫精灵</MenuItem>
            </Submenu>
            <MenuItem name="数据转发">
                <Icon type="stats-bars" size="22"></Icon>
                数据转发
            </MenuItem>
            <Submenu name="开发指南">
                <template slot="title">
                    <Icon type="paper-airplane" size="22"></Icon>
                    开发指南
                </template>
                <MenuItem name="开发简介">开发简介</MenuItem>
                <MenuItem name="嵌入式/Wifi">嵌入式/Wifi</MenuItem>
                <MenuItem name="Android">Android</MenuItem>
                <MenuItem name="iOS">iOS</MenuItem>
                <MenuItem name="OpenAPI">OpenAPI</MenuItem>
            </Submenu>


            <MenuItem name="极客社区">
                <Icon type="ios-paw" size="22"></Icon>
                极客社区
            </MenuItem>
        </Menu>
    </Sider>

        <!-- <Sider class="fixedSider" :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
           <Menu :active-name="ActiveName" theme="light" width="auto" >
                <MenuItem name="-1">
                </MenuItem>
                <MenuItem name="1">
                </MenuItem>
                <Submenu v-for="(Menu,MenuIdx) in SideMenu" :name="Menu.Fmenu">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                         {{Menu.Fmenu}}
                    </template>
                    <MenuItem  v-for="(Smenu,SmenuIdx) in Menu.Smenu" :name="Smenu"><span>{{Smenu}}</span></MenuItem>
                </Submenu>
            </Menu> 
        </Sider> -->
        
</template>
<script>

  export default{
    data: function () {
      return {
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
        }
      
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
