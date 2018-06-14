<template>
  <div class="MapChart">
    <h2>分布图</h2>
    <div  class="BlockWrap marginTB_20 PaddingTB_50">
      <Row type="flex" justify="space-around" class="code-row-bg">
          <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
              <div id="main" style="width: 100%;height: 500px;padding: 0 20px;"></div>
          </Col>
          
      </Row>
        
    </div>
  </div>
  
</template>
<script>
import axios from 'axios'
import echarts from 'echarts'
import 'echarts/map/js/china.js';
// function randomData() {
//     return Math.round(Math.random()*1000);
// }
  export default{
    props:['Info'],
    data: function () {
      return {
        BtCur:0,
        charts: '',
        data:''

      }
    },
    mounted() {
      this.drawPie('main')
      
      
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
      drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                color:[ 
                    '#ff7f50', '#87cefa', '#da70d6', '#32cd32', '#6495ed', 
                    '#ff69b4', '#ba55d3', '#cd5c5c', '#ffa500', '#40e0d0', 
                    '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700', 
                    '#6b8e23', '#ff00ff', '#3cb371', '#b8860b', '#30e0e0' 
                ],
                title : {
                    text: '产品分布图',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['iphone3','iphone4','iphone5']
                },
                dataRange: {
                    min: 0,
                    max: 2500,
                    x: 'left',
                    y: 'bottom',
                    text:['高','低'],           // 文本，默认为数值文本
                    calculable : true,
                    color:['#20a0ff','#D2EDFF'],
                },
                toolbox: {
                    show: true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                roamController: {
                    show: true,
                    x: 'right',
                    mapTypeControl: {
                        'china': true
                    }
                },
                series : [
                    {
                        name: 'iphone3',
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        itemStyle:{
                            normal:{
                              label:{
                                show:true
                              },
                              //areaColor: '#32A8FF',
                            },
                            emphasis:{label:{show:true}}
                        },
                        data:[
                            {name: '北京',value: Math.round(Math.random()*1000)},
                            {name: '天津',value: Math.round(Math.random()*1000)},
                            {name: '上海',value: Math.round(Math.random()*1000)},
                            {name: '重庆',value: Math.round(Math.random()*1000)},
                            {name: '河北',value: Math.round(Math.random()*1000)},
                            {name: '河南',value: Math.round(Math.random()*1000)},
                            {name: '云南',value: Math.round(Math.random()*1000)},
                            {name: '辽宁',value: Math.round(Math.random()*1000)},
                            {name: '黑龙江',value: Math.round(Math.random()*1000)},
                            {name: '湖南',value: Math.round(Math.random()*1000)},
                            {name: '安徽',value: Math.round(Math.random()*1000)},
                            {name: '山东',value: Math.round(Math.random()*1000)},
                            {name: '江苏',value: Math.round(Math.random()*1000)},
                            {name: '浙江',value: Math.round(Math.random()*1000)},
                            {name: '江西',value: Math.round(Math.random()*1000)},
                            {name: '湖北',value: Math.round(Math.random()*1000)},
                            {name: '广西',value: Math.round(Math.random()*1000)},
                            {name: '甘肃',value: Math.round(Math.random()*1000)},
                            {name: '山西',value: Math.round(Math.random()*1000)},
                            {name: '内蒙古',value: Math.round(Math.random()*1000)},
                            {name: '陕西',value: Math.round(Math.random()*1000)},
                            {name: '吉林',value: Math.round(Math.random()*1000)},
                            {name: '福建',value: Math.round(Math.random()*1000)},
                            {name: '贵州',value: Math.round(Math.random()*1000)},
                            {name: '广东',value: Math.round(Math.random()*1000)},
                            {name: '青海',value: Math.round(Math.random()*1000)},
                            {name: '西藏',value: Math.round(Math.random()*1000)},
                            {name: '四川',value: Math.round(Math.random()*1000)},
                            {name: '宁夏',value: Math.round(Math.random()*1000)},
                            {name: '海南',value: Math.round(Math.random()*1000)},
                            {name: '台湾',value: Math.round(Math.random()*1000)},
                            {name: '香港',value: Math.round(Math.random()*1000)},
                            {name: '澳门',value: Math.round(Math.random()*1000)}
                        ]
                    },
                ]
               })
            }
    }
  }
</script>
<style lang="scss">
.MapChart{
}
</style>