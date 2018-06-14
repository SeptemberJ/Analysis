<template>
	<div class="SchatPie">
    <h2>{{Info.Htit}}</h2>
    <div class="BlockWrap marginTB_20">
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
                <schart :canvasId="Info.Htit" :type="type" :width="width"
    :height="height" :data="data" :options="options"></schart>
            </Col>
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
        BtCur:0,
        //canvasId: 'myCanvas',
        type: 'pie',
        width: 500,
        height: 400,
        data: [],
        options: {
            padding: 50,                   // canvas 内边距
            bgColor: '#FFFFFF',            // 默认背景颜色
            title: '',// 图表标题
            titleColor: '#000000',         // 图表标题颜色
            titlePosition: 'top',      // 图表标题位置: top / bottom
            legendColor: '#000000',         // 图例文本颜色
            legendTop: 40,               // 图例距离顶部的长度
            colorList: [],   //环形图颜色列表
            radius: 100,                     // 环形图外圆半径
            innerRadius: 70            // 环形图内圆半径
            
        }
      }
    },
    mounted: function () {
      
    },
    created() {
      console.log(this.Info)
      this.options.colorList = this.Info.colorList
      switch(this.Info.kind){
        case 'activationData':
        this.GetSchatData('SchatPie1')
        break
        case 'onlineData':
        this.GetSchatData('SchatPie2')
        break
        case 'modelData':
        this.GetSchatData('SchatPie3')
        break
        default:
        this.GetSchatData('SchatPie1')
      }
    
      
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
.SchatPie{
}
</style>