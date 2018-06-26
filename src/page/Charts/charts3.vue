<template>
<!-- <div id="main" style="width: 600px;height: 400px;"></div> -->
	<div id="myChart" :style="{width: '100%', minHeight: height}"></div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import echarts from 'echarts'
import Mock from 'mockjs'
//import Stomp from 'stompjs'
import { MQTT_SERVICE, MQTT_USERNAME, MQTT_PASSWORD } from '../../../config/sysconstant.js'
var schema = [
	{name: 'CO', index: 0, text: '一氧化碳（CO）'},
    {name: 'CO2', index: 1, text: '二氧化碳（CO2）'},
    {name: 'PM10', index: 2, text: 'PM10'},
    {name: 'PM25', index: 3, text: 'PM25'},
    {name: 'VOCs', index: 5, text: 'VOCs'},
    {name: 'level', index: 5, text: '空气质量'}
];
  export default{
    data: function () {
      return {
        charts: '',
        height:'',
        option:{
			    backgroundColor: '#404a59',
			    color: [
			        '#dd4444', '#fec42c', '#80F1BE'
			    ],
			    legend: {
			        y: 'top',
			        data: ['普陀区'],
			        textStyle: {
			            color: '#fff',
			            fontSize: 16
			        }
			    },
			    grid: {
			        x: '10%',
			        x2: 150,  //右侧tooltip距离
			        y: '18%',
			        y2: '10%'
			    },
			    tooltip: {
			        padding: 10,
			        backgroundColor: '#222',
			        borderColor: '#777',
			        borderWidth: 1,
			        formatter: function (obj) {
			            var value = obj.value;
			            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
			                //+ obj.seriesName + ' ' + value[5] + '日：'
			                + obj.seriesName + '日'
			                + value[0]
			                + '</div>'
			                + schema[1].text + '：' + value[1] + '<br>'
			                + schema[2].text + '：' + value[2] + '<br>'
			                + schema[3].text + '：' + value[3] + '<br>'
			                + schema[4].text + '：' + value[4] + '<br>'
			        }
			    },
			    xAxis: {
			        type: 'value',
			        name: '日期',
			        nameGap: 16,
			        nameTextStyle: {
			            color: '#fff',
			            fontSize: 14
			        },
			        max: 31,
			        splitLine: {
			            show: false
			        },
			        axisLine: {
			            lineStyle: {
			                color: '#eee'
			            }
			        }
			    },
			    yAxis: {
			        type: 'value',
			        name: 'AQI指数',
			        nameLocation: 'end',
			        nameGap: 20,
			        nameTextStyle: {
			            color: '#fff',
			            fontSize: 16
			        },
			        axisLine: {
			            lineStyle: {
			                color: '#eee'
			            }
			        },
			        splitLine: {
			            show: false
			        }
			    },
			    visualMap: [
			         {
			            left: 'right',
			            top: '10%',
			            dimension: 2,    //圆点面积
			            min: 0,
			            max: 250,
			            itemWidth: 30,	  //右侧tooltip宽度
			            itemHeight: 120,  //右侧tooltip高度
			            calculable: true,
			            precision: 0.1,
			            text: ['圆形大小：PM10'],
			            textGap: 30,
			            textStyle: {
			                color: '#fff'
			            },
			            inRange: {
			                symbolSize: [10, 70]
			            },
			            outOfRange: {
			                symbolSize: [10, 70],
			                color: ['rgba(255,255,255,.2)']
			            },
			            controller: {
			                inRange: {
			                    color: ['#c23531']
			                },
			                outOfRange: {
			                    color: ['#444']
			                }
			            }
			        },
			         {
			            left: 'right',
			            bottom: '5%',
			            dimension: 6,
			            min: 0,
			            max: 50,
			            itemHeight: 120,
			            calculable: true,
			            precision: 0.1,  //精度
			            text: ['明暗：VOCs'],
			            textGap: 30,
			            textStyle: {
			                color: '#fff'
			            },
			            inRange: {
			                colorLightness: [1, 0.5]
			            },
			            outOfRange: {
			                color: ['rgba(255,255,255,.2)']
			            },
			            controller: {
			                inRange: {
			                    color: ['#c23531']
			                },
			                outOfRange: {
			                    color: ['#444']
			                }
			            }
			        }
			    ],
			    series: [
			        {
			            name: '普陀区',
			            type: 'scatter',
			            itemStyle: {
						    normal: {
						        opacity: 0.8,
						        shadowBlur: 10,
						        shadowOffsetX: 0,
						        shadowOffsetY: 0,
						        shadowColor: 'rgba(0, 0, 0, 0.5)'
						    }
						},
			            data: []
			        }
			        
			    ]
			},
		arrayData: [
				[1,155,9,56,0.46,18,46],
			    [8,25,9,56,0.46,18,29],
			    [13,299,47,63,0.3,23,9],
			    [24,113,7,29,38,23,26]
			]
        

      }
    },
    mounted() {
      this.drawLine()
      
    },
    created() {
    	this.height = document.documentElement.clientHeight + 'px'
    	this.option.series[0].data = this.arrayData
    	//this.ConnectFn()

      
      
    },
    computed: {
      
    },
    watch: {
    	option: {
			handler(newVal, oldVal) {
				if (this.chart) {
					if (newVal) {
						alert('new')
						this.chart.setOption(newVal);
					} else {
						this.chart.setOption(oldVal);
					}
				} else {
					this.drawLine();
				}
			},
			deep: true //对象内部属性的监听，关键。
		}
      
    },
    components: {
      

    },
    methods: {
    	drawLine(){
			let myChart = this.$echarts.init(document.getElementById('myChart'))
			myChart.setOption(this.option);
			//0:x轴 1:y轴  3:原点半径
			//高度依据：CO2

			/*
			setTimeout(function(){
			    window.onresize = ()=>{
			    	this.height = document.documentElement.clientHeight + 'px'
				    myChart.resize(); 
				}
			},200)
			*/

    	},
        

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