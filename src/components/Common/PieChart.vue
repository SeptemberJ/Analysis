<template>
  <div class="PieChart">
    <h2>{{Info.Htit}}</h2>
    <div  class="BlockWrap marginTB_20 PaddingTB_50">
      <Row type="flex" justify="space-around" class="code-row-bg">
          <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
              <div :id="Info.Htit" style="width: 100%;height: 500px;padding: 0 20px;"></div>
          </Col>
          
      </Row>
        
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import echarts from 'echarts'

  export default{
    props:['Info'],
    data: function () {
      return {
        charts: '',

      }
    },
    mounted() {
      this.getChartData()
      
    },
    created() {
      
    },
    computed: {
      ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      getChartData(){
        let Url
        switch(this.Info.Htit){
          case '激活数据':
          Url = R_PRE_URL + this.Info.url +'?userid=' + this.ID
          break
          default:
          Url = 'static/json/'+ this.Info.url
        }
        axios.get(Url
          ).then((res)=> {
            let PieData = res.data.info
            this.drawPie(this.Info.Htit,PieData.column_name,PieData.column_data)
        }).catch((error)=> {
          console.log(error)
        })
      },
      drawPie(id,Name,Data){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                color:this.Info.colorList,
                title : {
                    text: '',
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:Name
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        magicType : {
                            show: true,
                            type: ['pie', 'funnel']
                        },
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                      name:id,
                      type:'pie',
                      radius : [20, 110],
                      roseType : 'radius',
                      label: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      lableLine: {
                          normal: {
                              show: false
                          },
                          emphasis: {
                              show: true
                          }
                      },
                      data:Data
                  }
                ]
               })
      }

    }
  }
  </script>
<style lang="scss">

</style>