<template>
<div class="layout">
    <SideBar v-on:SideMenu-click=""  v-on:SideStatus=""/>
    <Layout>
        <Content :style="{ minWidth: '1100px',marginLeft:LeftDistance?'0px':'200px'}">
            <Header class="shadow" :style="{position: 'fixed',top:0,left:LeftDistance?'0px':'200px', width: '100%',background:'#fff',zIndex:999,overflow:'hidden'}">
                <Icon v-if="LeftDistance" @click.native="collapsedSider" class="menu-icon" :style="{margin: '2px 20px 0'}" type="navicon-round" size="24"></Icon>
                <Icon v-if="!LeftDistance" @click.native="collapsedSider" class="rotate-icon" :style="{margin: '2px 2px 0'}" type="chevron-left" size="24"></Icon>
                <div :style="{float: 'right',marginRight:LeftDistance?'0px':'200px'}">
                    <Button @click="" type="text">
                        XX
                        <Icon type="power" size="14"></Icon>
                        退出
                    </Button>
                    
                </div>
            </Header>
            <Card :bordered="false" dis-hover>
                <div :style="{height:'1000px',marginTop:'50px',background:'purple'}">
                   
                    
                </div>
            </Card>
        </Content>
    </Layout>
</div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import SideBar from '../../components/sideBar.vue'
 export default{
    data: function () {
      return {
        isCollapsed: false,
        LeftDistance:false,
      }
    },
    computed: {
        
      
    },
    watch: {
    },
    components: {
    	SideBar
       
    },
    methods: {
    	collapsedSider () {
            this.LeftDistance = !this.LeftDistance
            this.$children[0].$refs.side1.toggleCollapse();
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
    padding: 0 20px !important;

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
