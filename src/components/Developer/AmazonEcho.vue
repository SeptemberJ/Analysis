<template>
    <div class="AmazonEcho">
        <h2>互联设备</h2>
        <Card :bordered="true" class="marginTB_20">
            <div>
                <Row>
                    <Col span="8"><img src="http://manage.dtston.com/static/img/bg_amazon_echo_r.png"></Col>
                    <Col span="16">
                        <h1 class="marginB_10">Amazon Echo简介</h1>
                        <p>Amazon Echo——人工智能音箱</p>
                        <p>Echo语音与设备智能交互，实现您专属的应用化场景。</p>
                        <Button type="primary" class="marginT_20" @click="OpenLink(Link_AmazonEcho)">接入流程</Button>
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
        Link_AmazonEcho:'https://github.com/dtston-dtcloud/dtcloud-docs/blob/master/src/zh-cn/guidelines/echo.md'
      }
    },
    mounted: function () {
      
    },
    created() {
      
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
.AmazonEcho{
    margin-top: 50px;
}
</style>
