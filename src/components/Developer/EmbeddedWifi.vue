<template>
    <div class="EmbeddedWifi">
        <h2>概述</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow class="marginT_20">
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_sbjr.png"></Col>
                        <Col span="17" offset="1">
                            <ul class="square">
                                <li>本文介绍硬件MCU接入流程，主要帮助传统硬件厂商快速、简单实现智能化。主要涉及到三端：硬件MCU、WiFi模块、测试APP。硬件MCU端和WiFi模块端之间通过串口通信。WiFi模块和测试APP端之间通过网络将数据打通。</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

        <h2>接入流程</h2>
        <div  class="BlockWrap marginTB_20">
            <Row :gutter="16" class="PaddingLR_10">
                <Col :xs="12" :sm="12" :md="12" :lg="8" class="marginB_20" v-for="(Flow,Idx) in FlowList">
                    <Card shadow>
                        <div style="text-align:center">
                            <img :src="Flow.icon">
                            <h5>{{Flow.name}}</h5>
                            <Button type="ghost" shape="circle" class="marginT_10" @click="GoFlow(Flow.id)">{{Flow.bt_txt}}</Button>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>

    </div>
</template>
<script>

  export default{
    data: function () {
      return {
        FlowList:[
            {'id':0,'name':'1.创建产品','icon':'static/img/icon/EmbeddedWifi_flow_1.png','bt_txt':'去创建'},
            {'id':1,'name':'2.下载WiFi/GPRS固件（深智云WiFi库）','icon':'static/img/icon/EmbeddedWifi_flow_2.png','bt_txt':'去下载'},
            {'id':2,'name':'3.定义协议','icon':'static/img/icon/EmbeddedWifi_flow_3.png','bt_txt':'去创建'},
            {'id':3,'name':'4.Mcu程序编写（WiFi固件二次开发）','icon':'static/img/icon/EmbeddedWifi_flow_4.png','bt_txt':'查看'},
            {'id':4,'name':'5.产品调试','icon':'static/img/icon/EmbeddedWifi_flow_5.png','bt_txt':'去调试'},
        ]
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        // 转去对应流程
        GoFlow(Id){
            switch(Id){
                case 0:
                this.$store.state.DeveloperMenuCur = '产品管理'
                break
                case 1:
                window.open('https://github.com/dtston-dtcloud/device-sdk/tree/master/%E5%9B%BA%E4%BB%B6')
                break
                case 2:
                this.$store.state.DeveloperMenuCur = '协议管理'
                break
                case 3:
                window.open('https://github.com/dtston-dtcloud/device-sdk')
                break
                case 4:
                this.$store.state.DeveloperMenuCur = '调试设备'
                break
            }
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.EmbeddedWifi{
    margin-top: 50px;
    ul.square {list-style-type:square}
}
</style>
