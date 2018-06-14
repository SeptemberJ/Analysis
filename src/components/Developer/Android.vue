<template>
    <div class="Android">
        <h2>概述</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow class="marginT_20">
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/Android.png"></Col>
                        <Col span="17" offset="1">
                            <ul class="square">
                                <li>Android SDK封装了手机与智能设备、云服务器通讯的过程，包括设备配置入网、发现、连接控制、心跳、状态上报、报警通知等。开发者可以通过SDK快速地完成APP开发，避免了面对复杂的协议和错误处理，只需要专注于APP用户体验的优化和设计。</li>
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
            {'id':0,'name':'1.申请AppID和AppKey','icon':'static/img/icon/EmbeddedWifi_flow_1.png','bt_txt':'申请'},
            {'id':1,'name':'2.开发准备环境和SDK初始化','icon':'static/img/icon/EmbeddedWifi_flow_2.png','bt_txt':'查看'},
            {'id':2,'name':'3.SDK接口使用和Demo工程','icon':'static/img/icon/EmbeddedWifi_flow_3.png','bt_txt':'查看'}
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
                window.open('https://github.com/dtston-dtcloud/android-sdk/blob/master/docs/SDK%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.md#一-申请appid和appkey')
                break
                case 1:
                window.open('https://github.com/dtston-dtcloud/android-sdk/blob/master/docs/SDK%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.md#二-准备环境')
                break
                case 2:
                window.open('https://github.com/dtston-dtcloud/android-sdk/blob/master/docs/SDK%E4%BD%BF%E7%94%A8%E6%96%87%E6%A1%A3.md#四-用户接口usermanager')
                break
            }
        }
    }
  }
</script>
<style lang="scss" scoped>
.Android{
    margin-top: 50px;
}
</style>
