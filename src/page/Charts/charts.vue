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
    {name: 'date', index: 0, text: '日'},
    {name: 'AQIindex', index: 1, text: 'AQI指数'},
    {name: 'PM25', index: 2, text: 'PM2.5'},
    {name: 'VOCs', index: 3, text: 'VOCs'},
    {name: 'CO', index: 4, text: '一氧化碳（CO）'},
    {name: 'CO2', index: 5, text: '二氧化碳（CO2）'},
    {name: 'Formaldehyde', index: 6, text: '甲醛'},
    {name: 'Temperature', index: 7, text: '温度'}
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
			        data: ['普陀区', '徐汇区', '闵行区'],
			        textStyle: {
			            color: '#fff',
			            fontSize: 16
			        }
			    },
			    grid: {
			        x: '10%',
			        x2: 150,
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
			                + obj.seriesName + ' ' + value[0] + '日：'
			                + value[8]
			                + '</div>'
			                + schema[1].text + '：' + value[1] + '<br>'
			                + schema[2].text + '：' + value[2] + '<br>'
			                + schema[3].text + '：' + value[3] + '<br>'
			                + schema[4].text + '：' + value[4] + '<br>'
			                + schema[5].text + '：' + value[5] + '<br>'
			                + schema[6].text + '：' + value[6] + '<br>'
			                + schema[7].text + '：' + value[7] + '<br>';
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
			            dimension: 2,
			            min: 0,
			            max: 250,
			            itemWidth: 30,
			            itemHeight: 120,
			            calculable: true,
			            precision: 0.1,
			            text: ['圆形大小：PM2.5'],
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
			            precision: 0.1,
			            text: ['明暗：二氧化硫'],
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
			        },
			        {
			            name: '徐汇区',
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
			        },
			        {
			            name: '闵行区',
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
		client: Stomp.client(MQTT_SERVICE)
        

      }
    },
    mounted() {
      this.drawLine()
      
    },
    created() {
    	this.height = document.documentElement.clientHeight + 'px'
    	//this.GetData()
    	//this.websocket()
    	//this.ConnectFn()
    	this.connect()

		//var ws = new SockJS('http://205.168.1.112:8082/login');
	    //var client = Stomp.over(ws);
	    //var connect_callback = function(res) {
	    //	console.log('成功--')
	    //	console.log(res)
		//};
		//var error_callback = function(res) {
		//	console.log('失败--')
	    //	console.log(res)
		//};
	    //client.connect('admin', 'admin', connect_callback,error_callback);

      
      
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
			/*
			setTimeout(function(){
			    window.onresize = ()=>{
			    	this.height = document.documentElement.clientHeight + 'px'
				    myChart.resize(); 
				}
			},200)
			*/

    	},
    	MockData(){
    		axios.get('static/json/charts.json',
			).then((res)=> {
				var Index = Mock.mock({
					'i|0-3': 1
				})
				//debugger
				this.option.series[0].data = res.data.Info[Index.i].PT
				//debugger
				this.option.series[1].data = res.data.Info[Index.i].XH
				//debugger
				this.option.series[2].data = res.data.Info[Index.i].MH
				//debugger
				this.SetTimeoutOne()
			}).catch((error)=> {
				console.log(error)
			})
		},
		SetTimeoutOne(){
			setTimeout(()=> {
				this.MockData()
			}, 2000);
		},
    	GetData(){
			axios.get('static/json/charts.json',
			).then((res)=> {
				//debugger
				this.option.series[0].data = res.data.Info[0].PT
				this.option.series[1].data = res.data.Info[0].XH
				this.option.series[2].data = res.data.Info[0].MH

				this.SetTimeoutOne()

			}).catch((error)=> {
				console.log(error)
			})
    	},
    	websocket() {
            let ws = new WebSocket('ws://205.168.1.112:8082/websocket');
            ws.onopen = () => {
                // Web Socket 已连接上，使用 send() 方法发送数据
                console.log('数据发送中...')
                ws.send('123')
                console.log('数据发送完成')
            }
            ws.onmessage = evt => {
                 console.log('数据已接收...')
                 console.log(evt.data)
            }
            ws.onclose = function () {
                // 关闭 websocket
                console.log('连接已关闭...')
            }
            // 路由跳转时结束websocket链接
            this.$router.afterEach(function () {
                ws.close()
            })
        },

        onConnected: function (frame) {
	      console.log('Connected: ' + frame)
	      var topic = '/topic/AllCustomer' 
	      this.client.subscribe(topic, this.responseCallback, this.onFailed) 
	    },
	    onFailed: function (frame) {
	      console.log('Failed: ' + frame)
	    },
	    responseCallback: function (frame) {
	      console.log('responseCallback msg=>' + frame.body)
	    },

	    connect: function () {
	      var headers = {
	        'username': MQTT_USERNAME,
	        'password': MQTT_PASSWORD,
	      }
	      this.client.connect(headers, this.onConnected, this.onFailed)
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