<template>
	<div class="ColorfulBlock">
            <h2>概览</h2>
            <div class="BlockWrap marginTB_20 PaddingTB_50">
            <Row :gutter="16">
                <!-- <Row type="flex" justify="space-around" class="code-row-bg"> -->
                    <Col v-for="(overview,overviewIdx) in Info" class="marginTB_10" :xs="{ span: 10,offset: 1}" :lg="{ span: 4}">
                        <Card :bordered="true" shadow :class="{ 'BgLightGreen': overviewIdx==0, 'BgLightBlue': overviewIdx==1,'BgLightDarkGreen': overviewIdx==2,'BgLightOrange': overviewIdx==3 }">
                            <p slot="title" class="colorWhite">{{overview.name}}</p>
                            <h2 class="colorWhite">{{overview.mount}}</h2>
                        </Card>
                    </Col>
                    <!-- <Col class="marginTB_10" :xs="{ span: 10,offset: 1}" :lg="{ span: 4}">
                        <Card :bordered="true" shadow style="background-color: #32B9FC">
                            <p slot="title" class="colorWhite">设备总数</p>
                            <h2 class="colorWhite">- -</h2>
                        </Card>
                    </Col>
                   <Col class="marginTB_10" :xs="{ span: 10,offset: 1}" :lg="{ span: 4}">
                        <Card :bordered="true" shadow style="background-color: #81D125">
                            <p slot="title" class="colorWhite">设备激活数</p>
                            <h2 class="colorWhite">- -</h2>
                        </Card>
                    </Col>
                    <Col class="marginTB_10" :xs="{ span: 10,offset: 1}" :lg="{ span: 4}">
                        <Card :bordered="true" shadow style="background-color: #F18F48">
                            <p slot="title" class="colorWhite">设备在线数</p>
                            <h2 class="colorWhite">- -</h2>
                        </Card>
                    </Col> -->
                </Row>
            </div>
        </div>
</template>
<script>


import Schart from 'vue-schart';
import axios from 'axios'
  export default{
    props:['Info'],
    data: function () {
      return {
        overviewData:[]

      }
    },
    mounted: function () {
      
    },
    created() {
      console.log('Info------')
       console.log(this.Info)
       this.overviewData = this.Info
      // this.GetSchatData('Schat')
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      Schart
      

    },
    methods: {
      GetSchatData(KIND){
        axios.get('static/json/'+ KIND +'.json'
          ).then((res)=> {
            console.log(KIND+ '--- backinfo------')
            console.log(res.data)
            this.data = res.data.info.data
        }).catch((error)=> {
          console.log(error)
        })

      },
    }
  }
</script>
<style lang="scss">
.ColorfulBlock{
  width: 100%;
  display: block;
  float: left;
  clear: both;
}
</style>