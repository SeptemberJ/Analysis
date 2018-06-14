<template>
    <div class="DevelopmentIntroduction">
        <h2>Smart Hox物联网平台概述</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow class="marginT_20">
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/ZNKZLogo.png"></Col>
                        <Col span="17" offset="1">
                            <ul class="square">
                                <li>Smart Hox平台是深度、智能、开放的智能硬件云服务平台，为传统厂商提供一站式产业升级解决方案，让传统的硬件能够顺利的从普通硬件产品升级到智能硬件产品，并且对升级完成的智能硬件产品提供运营服务，为传统厂商从产品、销售、市场等多维度提供运营数据，提高传统厂商对产品的运营能力，提高厂商的年产业额。</li>
                                <li>提供的产品服务包括：自助开发平台，自助运营平台。</li>
                                <li>自助开发平台，提供Smart Hox的IOT SDK，开放丰富的OpenAPI，及配套的说明文档，可帮助厂商快速实现智能化。</li>
                                <li>自助运营平台，对设备产生的内容，及应用用户产生的内容，进行分析和通知，直接得出产品的市场情况，销售情况，设备分布，人员情况等统计数据反馈给厂商，为厂商下一步的规划提供最直接的数据依据</li>
                                <li>Smart Hox物联网平台的开放接口分为设备接入、APP应用、企业应用三个主要部分。</li>
                            </ul>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

        <h2>快速接入</h2>
        <div  class="BlockWrap marginTB_20">
            <Card shadow>
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_sbjr.png"></Col>
                        <Col span="17" offset="1">
                            <h2 class="marginB_10">1.设备接入</h2>
                            <p>使用Smart Hox提供的嵌入式SDK，可以方便地将设备接入到云端平台，实现远程控制、远程管理、数据采集、OTA等相关的功能。</p>
                            <Button type="primary" class="marginT_20" @click="ToModule('嵌入式/Wifi')">查看详细接入流程</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
            <Card shadow class="marginTB_20">
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_app.png"></Col>
                        <Col span="17" offset="1">
                            <h2 class="marginB_10">2.APP应用</h2>
                            <p>通过Smart Hox提供的APP SDK，开发者可以快速实现对物联设备的远程访问控制。</p>
                            <Button type="primary" class="marginT_20" @click="ToModule('Android')">查看Android开发流程</Button>
                            <Button type="primary" class="marginT_20" @click="ToModule('iOS')">查看iOS开发流程</Button>
                        </Col>
                    </Row>
                </div>
            </Card>
            <Card shadow>
                <div>
                    <Row>
                        <Col span="6" class="TextCenter"><img src="static/img/icon/DevelopmentIntroduction_qyyy.png"></Col>
                        <Col span="17" offset="1">
                            <h2 class="marginB_10">3.企业应用</h2>
                            <p>企业应用Smart Hox平台开放丰富的RestFul接口，给企业和开发者提供设备管理、用户管理、设备监控、数据统计等服务。企业和开发者可以基于这些接口做数据的扩展应用开发。</p>
                            <Button type="primary" class="marginT_20" @click="ToModule('OpenAPI')">查看OpenAPI开放接口</Button>
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
        ToModule(Menu){
            this.$store.state.DeveloperMenuCur = Menu
        }
    }
  }
</script>
<style lang="scss" scoped>
.DevelopmentIntroduction{
    margin-top: 50px;
    ul.square {list-style-type:square}
}
</style>
