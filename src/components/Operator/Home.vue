<template>
    <div class="Home">
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
            <ColorfulBlock :Info="OverView"/>
            <!-- 设备趋势-->
            <LineChart :Info="equipmentTrend"/>
            <!-- 用户趋势 -->
            <LineChart :Info="userTrend"/>
            <!--  三大数据图 -->
            <PieChart :Info="activationData"/>
            <PieChart :Info="onlineData"/>
            <PieChart :Info="modelData"/>
            <!-- map分布图 -->
            <!-- <MapChart/> -->
        </div>
        
    </div>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import ColorfulBlock from '../../components/Common/ColorfulBlock.vue'
import LineChart from '../../components/Common/LineChart.vue'
import PieChart from '../../components/Common/PieChart.vue'
import MapChart from '../../components/Common/MapChart.vue'
import SchatPie from '../../components/Common/SchatPie.vue'
  export default{
    data: function () {
      return {
        OverView:'',
        equipmentTrend:{
            'Htit':'设备趋势',
            'Sdata':[
                {'BtName':'设备总数','value':'设备总数'},
                {'BtName':'设备激活数','value':'设备激活数'},
                {'BtName':'设备活跃数','value':'设备活跃数'}
            ]
        },
        userTrend:{
            'Htit':'用户趋势',
            'Sdata':[
                {'BtName':'累计用户','value':'累计用户'},
                {'BtName':'新增用户','value':'新增用户'},
                {'BtName':'活跃用户','value':'活跃用户'},
                {'BtName':'已绑定设备用户','value':'已绑定设备用户'}
            ]
        },
        activationData:{
            'Htit':'激活数据',
            'colorList':['#ff7f50','#87cefa'],
            'kind':'activationData',
            'url':'selectjhuser'
        },
        onlineData:{
            'Htit':'在线数据',
            'colorList':['#ff69b4','#333'],
            'kind':'onlineData',
            'url':'PieChart2.json'
        },
        modelData:{
            'Htit':'机型数据',
            'colorList':['#6495ed','#ff69b4','#ba55d3', '#cd5c5c', '#ffa500'],
            'kind':'modelData',
            'url':'PieChart3.json'
        },

      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetOverViewData()
      
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
        PieChart,
        MapChart,
        SchatPie
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        GetOverViewData(KIND){
            axios.get(R_PRE_URL + 'selectnumber?userid='+this.ID
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        
     

    }
  }
</script>
<style lang="scss" scoped>
.Home{
    margin-top: 50px;
}
</style>
