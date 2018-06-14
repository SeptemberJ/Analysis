<template>
    <div class="OpenApi">
        <h2>概述</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow class="marginT_20">
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/ZNKZLogo.png"></Col>
                        <Col span="17" offset="1">
                            <ul class="square">
                                <li>Smart Hox平台开放丰富的RestFul接口，给企业和开发者提供设备管理、用户管理、设备监控、数据统计等服务。企业和开发者可以基于这些接口做数据的扩展应用开发。</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>
        
        <h2>App应用接口</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow>
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_app.png"></Col>
                        <Col span="17" offset="1">
                            <p class="marginT_20">App应用接口提供用户登录注册、用户信息编辑、设备绑定、应用升级等服务。</p>
                            <Button type="primary" class="marginT_20" @click="SeeFile('app')">点击查看详细文档</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

        <h2>企业应用接口</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow>
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_qyyy.png"></Col>
                        <Col span="17" offset="1">
                            <p class="marginT_20">企业应用接口提供用户管理、设备管理、数据统计等服务</p>
                            <Button type="primary" class="marginT_20" @click="SeeFile('qyyy')">点击查看详细文档</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

        <h2>设备端接口</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow>
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_sbjr.png"></Col>
                        <Col span="17" offset="1">
                            <p class="marginT_20">设备端接口提供设备激活、设备认证等服务。</p>
                            <Button type="primary" class="marginT_20" @click="SeeFile('sbjr')">点击查看详细文档</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

    </div>
</template>
<script>

  export default{
    data: function () {
      return {
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
        SeeFile(Kind){
            switch(Kind){
                case 'app':
                window.open('https://github.com/dtston-dtcloud/dtcloud-api/tree/master/%E5%BA%94%E7%94%A8%E7%AB%AFAPI%E6%96%87%E6%A1%A3')
                break
                case 'qyyy':
                window.open('https://github.com/dtston-dtcloud/dtcloud-api/tree/master/%E4%BC%81%E4%B8%9A%E5%BA%94%E7%94%A8API%E6%96%87%E6%A1%A3')
                break
                case 'sbjr':
                window.open('https://github.com/dtston-dtcloud/dtcloud-api/tree/master/%E8%AE%BE%E5%A4%87%E7%AB%AFAPI%E6%96%87%E6%A1%A3')
                break
            }
        }
    }
  }
</script>
<style lang="scss" scoped>
.OpenApi{
    margin-top: 50px;
}
</style>
