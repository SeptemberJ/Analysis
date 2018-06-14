<template>
    <div class="ActiveUser">
        <!-- 没有任何信息 -->
       <!--  <div v-if="ApplicationList.length == 0">
            <Card :bordered="false" dis-hover>
                <div style="text-align:center">
                    <img src="static/img/NoInformation.png">
                    <h3>您还没有创建任何应用</h3>
                    <Button class="marginT_10" type="primary" icon="android-add" @click="ToCreateApplication">创建新应用</Button>
                </div>
            </Card>
        </div> -->
        <!-- 有信息 -->
        <!-- <div v-else> -->
        <div>
            <!-- 概览 -->
            <ColorfulBlock :Info="ActiveUser"/>
            <!--  数据趋势-->
            <LineChart :Info="dataTrend" ref="LineChart"/>
            <!-- 数据透视 -->
            <CircleChart :Info="CircleChartData"/>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import ColorfulBlock from '../../components/Common/ColorfulBlock.vue'
import LineChart from '../../components/Common/LineChart.vue'
import CircleChart from '../../components/Common/CircleChart.vue'
  export default{
    data: function () {
      return {
        ActiveUser:'',
        dataTrend:{
            'Htit':'数据趋势',
            'Sdata':[
                {'BtName':'活跃用户','value':'活跃用户2'}
            ]
        },
        CircleChartUrl:[
          {'url':'activelv','kind':'active_yesterday'},
          {'url':'activelv1','kind':'active_7day'},
          {'url':'activelv2','kind':'active_30day'},
        ],
        CircleChartData:{
          active_yesterday:0,
          active_7day:0,
          active_30day:0,
        }
      }
    },
    mounted() {
      
    },
    created() {
      this.GetPageData()
        
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ApplicationList:{
            get: function () {
              return this.$store.state.ApplicationList
            },
            set: function (newValue) {
              this.$store.state.ApplicationList = newValue
            }
        },
      
    },
    watch: {
      
    },
    components: {
        ColorfulBlock,
        LineChart,
        CircleChart
    },
    methods: {
      ToCreateApplication(){
          this.$router.push({name:'开发者平台'})
          this.$store.state.DeveloperMenuCur = '应用管理'
      },
      //获取页面总数据
      GetPageData(){
        this.GetActiveUserData()
        this.CircleChartUrl.map((item,idx)=>{
          this.getCircleData(item.url,item.kind)
        })
      },
      //refreshLineChart
      refreshLineChart(){
        this.$refs.LineChart.ChangeDay()
      },
      //获取概览数据
        GetActiveUserData(){
            let Info = {
              userid:this.ID,
              apply_id:this.$store.state.CurApplication,
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'activeuser',DATA
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.ActiveUser = res.data.info.overview
                  break
                  case 0:
                  this.$Message.error('获取活跃用户概览失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
              console.log(error)
              this.$Message.error('系统繁忙，获取活跃用户概览失败!')
            })
        },
      //获取透视数据
        getCircleData(Url,Kind){
          let Info = {
            userid:this.ID,
            apply_id:this.$store.state.CurApplication,
          }
          let DATA = {'users':Info}
          axios.post(R_PRE_URL + Url ,DATA
          ).then((res)=> {
              switch(res.data.result){
                    case 1:
                    this.CircleChartData[Kind]= res.data.activelv.toFixed(2)
                    break
                    case 0:
                    this.$Message.error('获取数据透视失败!')
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                  }
          }).catch((error)=> {
            console.log(error)
            this.$Message.error('系统繁忙，获取数据透视失败!')
          })
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.ActiveUser{
    margin-top: 50px;
    .userData{
        width: 100%;
          display: block;
          float: left;
          clear: both;
    }
}
</style>
