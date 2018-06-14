<template>
    <div class="GoogleHome">
       <h2>互联设备</h2>
       <Card :bordered="true" class="marginTB_20">
            <div>
                <Row>
                    <Col span="8"><img src="http://manage.dtston.com/static/img/bg_google_home_r.png"></Col>
                    <Col span="16">
                        <h1 class="marginB_10">Google Home简介</h1>
                        <p>Google Home——人工智能音箱 </p>
                        <p>Home语音控制您的音响、灯光、恒温器，助您搭建家庭的控制中心。</p>
                        <Button type="primary" class="marginT_20" @click="OpenLink(Link_GoogleHome)">接入流程</Button>
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
        Link_GoogleHome:'https://github.com/dtston-dtcloud/dtcloud-docs/blob/master/src/zh-cn/guidelines/googlehome.md'
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
.GoogleHome{
    margin-top: 50px;
}
</style>
