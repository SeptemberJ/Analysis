<template>
<!-- <div id="main" style="width: 600px;height: 400px;"></div> -->
	<div class="LineChart">
        <h2>{{Info.Htit}}</h2>
        <div  class="BlockWrap marginTB_20 PaddingTB_50">
          <Row type="flex" justify="space-around" class="code-row-bg">
              <Col class="marginTB_10 TextCenter " :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
                <Row type="flex" justify="space-between" class="code-row-bg">
                  <Col span="16">
                    <ButtonGroup shape="circle">
                      <Button :type="BtCur == BtIdx?'primary':'ghost'" @click.prevent="BtTab(Bt.value,BtIdx)" v-for="(Bt,BtIdx) in Info.Sdata">
                          {{Bt.BtName}}
                      </Button>
                    </ButtonGroup>
                  </Col>
                  <Col span="4">
                    <Select v-model="Day" @on-change="ChangeDay" size="small" style="width:100px;text-align: left;">
                        <Option value="7">前7天</Option>
                        <Option value="15">前15天</Option>
                        <Option value="30">前30天</Option>
                    </Select>
                  </Col>
                </Row>
              </Col>
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
import Schart from 'vue-schart'
import echarts from 'echarts'

  export default{
    props:['Info','LineChartData'],
    data: function () {
      return {
        Day:'7',
        BtCur:0,
        charts: '',
        data:''
        

      }
    },
    mounted() {
      
      
    },
    created() {
      this.ChangeDay()
      
    },
    computed: {
      ID(){
          let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
          return ID
      },
      
    },
    watch: {
      
    },
    components: {
      Schart
      

    },
    methods: {
      //bt切换
      BtTab(VALUE,IDX){
        console.log(IDX+'---'+VALUE)
        this.BtCur = IDX
        switch(VALUE){
          //首页
            case '设备总数':
            this.getChartData('selecteq')
            break
            case '设备激活数':
            this.getChartData('selectjihuo')
            break
            case '设备活跃数':
            this.getChartData('selecthuoyue')
            break
            //用户
            case '累计用户':
            this.getChartData('selectleijiuser')
            break
            case '新增用户':
            this.getChartData('selectnewuser')
            break
            case '活跃用户':
            this.getChartData('selecthuoyueuser')
            break
            case '已绑定设备用户':
            this.getChartData('selectlockuser')
            break
          //用户管理
            case '用户总数':
            this.getChartData_appoint_A('usertotal1')
            break
            case '新增用户2':
            this.getChartData_appoint_A('usertotal2')
            break
            //活跃用户
            case '活跃用户2':
            this.getChartData_appoint_A('activeuser1')
            break
          //设备情况
          case '设备总数2':
          this.getChartData_appoint_P('selectinsertsb1')
          break
          case '新增设备':
          this.getChartData_appoint_P('selectinsertsb')
          break
          //告警
          // case '告警总数':
          // this.getChartData_appoint_P('')
          // break
          // case '设备异常':
          // this.getChartData_appoint_P('')
          // break
          // case '设备故障':
          // this.getChartData_appoint_P('')
          // break
          default:
          this.getChartData('selecteq')
        }
      },
      //切换天数
      ChangeDay(){
        let Value = this.Info.Sdata.filter((item,idx) => idx == this.BtCur)[0].value
        this.BtTab(Value,this.BtCur)
      },
      //获取设备数据
      getChartData(KIND){
        var base = new Date().getTime()//+new Date(2016, 9, 8);
        var oneDay = 24 * 3600 * 1000
        var data = []
        axios.get(R_PRE_URL + KIND +'?day='+this.Day +'&userid=' + this.ID
          ).then((res)=> {
            let onlyData = res.data.info.reverse()
            for (var i = 0; i <this.Day; i++) {
                var now = new Date(base -= oneDay)
                var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
                data.push([dayStr, onlyData[i]])
            }
            this.data = data
            this.drawPie(this.Info.Htit)
        }).catch((error)=> {
          console.log(error)
        })
      },
      //获取指定产品下的设备数据
      getChartData_appoint_P(KIND){
        let Info = {
          day:this.Day,
          userid:this.ID,
          product_id:this.$store.state.CurProduction,
        }
        let DATA = {'users':Info}
        var base = new Date().getTime()//+new Date(2016, 9, 8);
        var oneDay = 24 * 3600 * 1000
        var data = []
        axios.post(R_PRE_URL + KIND ,DATA
          ).then((res)=> {
            let onlyData = res.data.info.reverse()
            for (var i = 0; i <this.Day; i++) {
                var now = new Date(base -= oneDay)
                var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
                data.push([dayStr, onlyData[i]])
            }
            this.data = data
            this.drawPie(this.Info.Htit)

        }).catch((error)=> {
          console.log(error)
        })
      },
       //获取指定应用下的用户数据
      getChartData_appoint_A(KIND){
        let Info = {
          day:this.Day,
          userid:this.ID,
          apply_id:this.$store.state.CurApplication,
        }
        let DATA = {'users':Info}
        var base = new Date().getTime()//+new Date(2016, 9, 8);
        var oneDay = 24 * 3600 * 1000
        var data = []
        axios.post(R_PRE_URL + KIND ,DATA
          ).then((res)=> {
            let onlyData = res.data.info.reverse()
            for (var i = 0; i <this.Day; i++) {
                var now = new Date(base -= oneDay)
                var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')
                data.push([dayStr, onlyData[i]])
            }
            this.data = data
            this.drawPie(this.Info.Htit)
        }).catch((error)=> {
          console.log(error)
        })
      },
      drawPie(id){
               this.charts = echarts.init(document.getElementById(id))
               this.charts.setOption({
                animation: false,
                title: {
                    left: 'center',
                    text: '',
                    subtext: '',
                },
                legend: {
                    top: 'bottom',
                    data:['意向']
                },
                tooltip: {
                    triggerOn: 'click',
                    position: function (pt) {
                        return [pt[0], 130];
                    }
                },
                toolbox: {
                    left: 'center',
                    itemSize: 25,
                    top: 15,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {}
                    }
                },
                xAxis: {
                    type: 'time',
                    //boundaryGap: [0, 100],
                    axisPointer: {
                        //value: '',
                        snap: true,
                        lineStyle: {
                            color: '#004E52',
                            opacity: 0.5,
                            width: 2
                        },
                        label: {
                            show: false,
                            formatter: function (params) {
                                return echarts.format.formatTime('yyyy-MM-dd', params.value);
                            },
                            backgroundColor: '#004E52'
                        },
                        handle: {
                            show: true,
                            color: '#004E52',
                            top:30
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    type: 'value',
                    axisTick: {
                        inside: true
                    },
                    splitLine: {
                        show: true
                    },
                    axisLabel: {
                        inside: true,
                        formatter: '{value}\n'
                    },
                    z: 10
                },
                grid: {
                    top: 110,
                    left: 20,
                    right: 20,
                    height: 300
                },
                dataZoom: [{
                    type: 'inside',
                    throttle: 50
                }],
                series: [
                    {
                        name:'用户人数',
                        type:'line',
                        smooth: true,
                        symbol: 'circle',
                        symbolSize: 5,
                        sampling: 'average',
                        itemStyle: {
                            normal: {
                                color: '#8ec6ad'
                            }
                        },
                        stack: 'a',
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#8ec6ad'
                                }, {
                                    offset: 1,
                                    color: '#ffe'
                                }])
                            }
                        },
                        data: this.data
                    }

                ]
               })
            }
    }
  }
</script>
<style lang="scss">
.LineChart{
  width: 100%;
  display: block;
  float: left;
  clear: both;
}
</style>