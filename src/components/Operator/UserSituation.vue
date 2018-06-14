<template>
    <div class="UserSituation">
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
            <!--  数据趋势-->
            <LineChart :Info="dataTrend" ref="LineChart"/>
            <!-- 用户数据 -->
            <div class="userData">
                <div>
                    <Row>
                        <Col span="4"><h2>用户明细</h2></Col>
                        <!-- <Col span="20" class="TextRight">
                            注册时间：
                            <DatePicker v-model="signDate" type="date" placeholder="请选择注册时间" style="width: 200px;display: inline-block;" @on-change="ChangeSignDate"></DatePicker>
                            <Button class="marginL_10" type="primary" @click="Export">导出</Button>
                        </Col> -->
                    </Row>
                </div>
                
                <div  class="BlockWrap marginTB_20">
                    <Table border :columns="columnsUsers" :data="dataUsers"></Table>
                    <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import ColorfulBlock from '../../components/Common/ColorfulBlock.vue'
import LineChart from '../../components/Common/LineChart.vue'
import echarts from 'echarts'
  export default{
    data: function () {
      return {
        OverView:'',
        signDate:'',
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        dataTrend:{
            'Htit':'数据趋势',
            'Sdata':[
                {'BtName':'用户总数','value':'用户总数'},
                {'BtName':'新增用户','value':'新增用户2'}
            ]
        },
        columnsUsers: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '用户',
                key: 'fname'
            },
            {
                title: '手机号',
                key: 'fmobile'
            },
            {
                title: '来源',
                key: 'fsource'
            },
            {
                title: '注册时间',
                key: 'faddtime'
            },
            {
                title: '最近在线时间',
                key: 'fonlinetime'
            }
        ],
        dataUsers: [],
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
        LineChart
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        //获取页面总数据
        GetPageData(){
            this.GetUserSituationData()
            this.GetUserList(this.signDate)
        },
        //refreshLineChart
        refreshLineChart(){
            this.$refs.LineChart.ChangeDay()
        },
        //获取概览
        GetUserSituationData(KIND){
            let Info = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'usertotal',DATA
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        
        //用户明细列表
        GetUserList(Date){
            let Info = {
                page:this.page_num,
                number:this.number,
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
                date:Date?Date:''
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'userdetail',DATA
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.dataUsers = res.data.userdetail
                  this.Total = res.data.count
                  break
                  case 0:
                  this.$Message.error('导入授权失败!')
                  this.modal_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
              console.log(error)
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          //this.GetUserList(this.signDate)
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          //this.GetUserList(this.signDate)
        },
        //切换注册时间
        ChangeSignDate(Time){
            this.signDate = Time
            this.GetUserList(Time)
        },
        Export(){
            this.$refs.table.exportCsv({
                filename: 'The original data'
            });
        },
        formatDate (dae) {
            const y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? '0' + m : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            return y + '-' + m + '-' + d;
        },
        changePage () {
            this.tableData1 = this.mockTableData1();
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.UserSituation{
    margin-top: 50px;
    .userData{
        width: 100%;
          display: block;
          float: left;
          clear: both;
    }
}
</style>
