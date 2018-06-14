<template>
<Sider class="fixedSider" :style="{}" ref="side1" hide-trigger collapsible :collapsed-width="0" v-model="isCollapsed" :on-collapse="onCollapse">
    <Menu :active-name="ActiveName" theme="light" width="auto" accordion @on-select="SideMenuChange" :class="menuitemClasses">
        <img :style="{width: '200px',height: '40px'}" src="static/img/logo1.png">
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
            <MenuItem name="设备管理">设备管理</MenuItem>
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
        <!-- <MenuItem name="极客社区">
            <Icon type="ios-paw" size="22"></Icon>
            极客社区
        </MenuItem> -->
    </Menu>
</Sider>
</template>
<script>

  export default{
    data: function () {
      return {
        isCollapsed: false,
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
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        ActiveName(){
            return this.$store.state.DeveloperMenuCur
        }
      
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
    background-color: #fff;
}
.ivu-layout-sider{
    height: 100%;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
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
