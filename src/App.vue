<template>
<div class="com-app">
    <transition>
        <router-view class="child-view"></router-view>
    </transition>
    <!--<div v-if="activeRoute!='登录' && activeRoute!='注册' && activeRoute!='修改密码'" class="ChangePlant" @mouseover="OverShow" @mouseout="OutHide"  @click="ChangePlatform">
        {{activeRoute}}
        <span v-if="ChangeShow" class="ChangePlantMask">切换</span>
    </div>-->
</div>
</template>
<script>

  export default{
    data: function () {
      return {
        ChangeShow:false
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
       }
      
    },
    watch: {
      
    },
    components: {
      
      

    },
    methods: {
        // 切换平台
        ChangePlatform(){
            if(this.$store.state.activeRoute == '开发者平台'){
                this.$router.push({name:'运营者平台'});
            }else{
                this.$router.push({name:'开发者平台'});
            }
        },
        OverShow(){
            this.ChangeShow = true
        }, 
        OutHide(){
            this.ChangeShow = false
        }, 
     

    }
  }
</script>
<style scoped>
::-webkit-scrollbar{
  display:none;
}
/*::-moz-scrollbar{
  display:none;
}
::-webkit-scrollbar{
  display:none;
}
::scrollbar{
  display:none;
}*/
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
    padding:15px 10px;
    border-radius:50%;
    width:60px;
    height:60px;
    color:#fff;
    text-align: center;
    background-color: #21D4FD;
    background-image: -webkit-linear-gradient(top left, #21D4FD 0%, #B721FF 100%);
    background-image: -o-linear-gradient(top left, #21D4FD 0%, #B721FF 100%);
    background-image: linear-gradient(to bottom right, #21D4FD 0%, #B721FF 100%);

    cursor: pointer;
}
.ChangePlantMask{
    position:fixed;
    top:50%;
    right:0;
    line-height: 60px;
    border-radius:50%;
    width:60px;
    height:60px;
    color:#fff;
    text-align: center;
    background-color: #FBDA61;
    background-image: -webkit-linear-gradient(bottom left, #FBDA61 0%, #FF5ACD 100%);
    background-image: -o-linear-gradient(bottom left, #FBDA61 0%, #FF5ACD 100%);
    background-image: linear-gradient(to top right, #FBDA61 0%, #FF5ACD 100%);
    cursor: pointer;
    z-index: 999;
}
/*.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
}
.layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.layout-logo{
  width: 100px;
  height: 30px;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav{
    float: right;
}
    */
</style>
