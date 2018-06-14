<template>
    <div class="Alert">
        <!-- 概览 -->
        <ColorfulBlock :Info="OverView"/>
        <!-- 数据趋势 -->
        <LineChart :Info="equipmentTrend" ref="LineChart"/>
        <!-- 告警列表 -->
        <Row style="display: block;" type="flex" justify="space-between" class="code-row-bg">
            <Col span="4">
                 <h2>告警明细</h2>
            </Col>
            <Col span="20" class="TextRight">
                注册时间：<DatePicker v-model="signDate" type="date" placeholder="请选择注册时间" style="width: 200px;display: inline-block;" @on-change="ChangeSignDate"></DatePicker>
            </Col>
        </Row>
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="columnsAlert" :data="dataAlert"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import ColorfulBlock from '../../components/Common/ColorfulBlock.vue'
import LineChart from '../../components/Common/LineChart.vue'
  export default{
    data: function () {
      return {
        table_loading:true,
        signDate:'',
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        OverView:'',
        equipmentTrend:{
            'Htit':'数据趋势',
            'Sdata':[
                {'BtName':'告警总数','value':'告警总数'},
                {'BtName':'设备异常','value':'设备异常'},
                {'BtName':'设备故障','value':'设备故障'}
            ]
        },
        columnsAlert: [
            {
                title: 'MAC',
                key: 'fmac'
            },
            {
                title: '告警内容',
                key: 'fwarnContent'
            },
            {
                title: '发生时间',
                key: 'fhappenTime'
            },
            {
                title: '告警类型',
                key: 'fwarnType'
            },
        ],
        dataAlert:[]
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetPageData()
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
        ColorfulBlock,
        LineChart
    },
    methods: {
        //获取页面总数据
        GetPageData(){
          this.GetOverViewData()
          this.GetWarnList(this.signDate)
        },
        //refreshLineChart
        refreshLineChart(){
          this.$refs.LineChart.ChangeDay()
        },
        //概览信息
        GetOverViewData(){
            let Info = {
              userid:this.ID,
              productid:this.$store.state.CurProduction,
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'yeswarning',DATA
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        //告警列表
        GetWarnList(Date){
            let Info = {
              userid:this.ID,
              productid:this.$store.state.CurProduction,
              faddtime:Date?Date:'',
              page:this.page_num,
              number:this.number
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'warningdetail',DATA
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.dataAlert = res.data.warnlist
                  this.Total = res.data.sunmun
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取告警明细列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
              console.log(error)
              this.$Message.error('系统繁忙,获取告警明细列表失败!')
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetWarnList(this.signDate)
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetWarnList(this.signDate)
        },
        //切换注册时间
        ChangeSignDate(Time){
            this.signDate = Time
            this.GetWarnList(Time)
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.Alert{
    margin-top: 50px;
}
</style>
