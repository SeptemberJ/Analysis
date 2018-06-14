<template>
    <div class="TMJL">
        <h2>互联设备</h2>
        <Card :bordered="true" class="marginTB_20">
            <div>
                <Row>
                    <Col span="8"><img src="http://manage.dtston.com/static/img/tianmao.png"></Col>
                    <Col span="16">
                        <h1>天猫精灵简介</h1>
                        <p>天猫精灵——AI智能语音产品 </p>
                        <p>可实现智能家居控制、语音购物、手机充值、叫外卖、音频音乐播放等，新一代人机交互贴心助手。</p>
                        <Button type="primary" class="marginT_20" @click="OpenLink(Link_TMJL)">接入流程</Button>
                    </Col>
                </Row>
            </div>
        </Card>
        <Card :bordered="true" class="marginTB_20">
            <div>
                <Row>
                    <Col span="8"><img src="static/img/icon/contact.png"></Col>
                    <Col span="16">
                        <h1 class="marginB_10">联系方式</h1>
                        <p>商务合作： 400-880-4428</p>
                        <p>总机号码： 021-3100-7227</p>
                        <p>邮箱地址： service@btzoon.com</p>
                    </Col>
                </Row>
            </div>
        </Card>
    </div>
        
</template>
<script>

  export default{
    data: function () {
      return {
        Link_TMJL:'https://github.com/dtston-dtcloud/dtcloud-docs/blob/master/src/zh-cn/guidelines/tianmaojingling.md'
      }
    },
    mounted: function () {
      
    },
    created(){
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        OpenLink(LINK){
            window.open(LINK)
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.TMJL{
    margin-top: 50px;
}
</style>
