<template>
    <div class="GZXB">
        <h2>公子小白</h2>
        <Card :bordered="true" class="marginTB_20">
            <div>
                <Row>
                    <Col span="8"><img src="http://manage.dtston.com/static/img/bg_yingshi_r.png"></Col>
                    <Col span="16">
                        <h1 class="marginB_10">公子小白简介</h1>
                        <p>公子小白——智能机器人</p>
                        <p>随心所欲控制电器、空调、电视、音响、灯光等设备，瞬间让家电聪明起来，打造您的个性场景。</p>
                        <Button type="primary" class="marginT_20" @click="OpenLink(Link_GZXB)">接入流程</Button>
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
        Link_GZXB:'https://github.com/dtston-dtcloud/dtcloud-docs/blob/master/src/zh-cn/guidelines/gongzixiaobai.md'
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
.GZXB{
    margin-top: 50px;
}
</style>
