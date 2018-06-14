<template>
    <div class="EquipmentCondition">
        <!-- 概览 -->
        <ColorfulBlock :Info="OverView"/>
        <!-- 数据趋势 -->
        <LineChart :Info="equipmentTrend" ref="LineChart"/>
        <!-- 设备明细 -->
        <Row style="display: block;" type="flex" justify="space-between" class="code-row-bg">
            <Col span="4">
                 <h2>设备明细</h2>
            </Col>
            <Col span="20" class="TextRight">
                注册时间：<DatePicker v-model="signDate" type="date" placeholder="请选择注册时间" style="width: 200px;display: inline-block;" @on-change="ChangeSignDate"></DatePicker>
            </Col>
        </Row>
        <div  class="BlockWrap marginTB_20">
            <Table border :columns="columnsDetail" :data="dataDetail"></Table>
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
        OverView:'',
        signDate:'',
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        equipmentTrend:{
            'Htit':'数据趋势',
            'Sdata':[
                {'BtName':'设备总数','value':'设备总数2'},
                {'BtName':'新增设备','value':'新增设备'}
            ]
        },
        columnsDetail: [
            {
                title: '设备Mac地址',
                key: 'fmac'
            },
            {
                title: '设备状态',
                key: 'status',
                render: (h, params) => {
                    return h('div', params.row.fonline == '1'?'在线':'不在线');
                }
                // filters: [
                //     {
                //         label: 'Greater than 25',
                //         value: 1
                //     },
                //     {
                //         label: 'Less than 25',
                //         value: 2
                //     }
                // ],
                // filterMultiple: false,
                // filterMethod (value, row) {
                //     if (value === 1) {
                //         return row.age > 25;
                //     } else if (value === 2) {
                //         return row.age < 25;
                //     }
                // }
            },
            {
                title: '注册时间',
                key: 'faddtime'
            },
            {
                title: '绑定用户',
                key: 'user',
                render: (h, params) => {
                    return h('div', params.row.fbinduser == '1'?'已绑定':'未绑定');
                }
                // filters: [
                //     {
                //         label: 'Greater than 25',
                //         value: 1
                //     },
                //     {
                //         label: 'Less than 25',
                //         value: 2
                //     }
                // ],
                // filterMultiple: false,
                // filterMethod (value, row) {
                //     if (value === 1) {
                //         return row.age > 25;
                //     } else if (value === 2) {
                //         return row.age < 25;
                //     }
                // }
            },
        ],
        dataDetail:[]
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
            //this.GetAuthorizationList(this.signDate)
        },
        //refreshLineChart
        refreshLineChart(){
            this.$refs.LineChart.ChangeDay()
        },
        //概览信息
        GetOverViewData(){
            let Info = {
              userid:this.ID,
              //product_id:this.$store.state.CurProduction,
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'selectnumber1',DATA
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        //授权明细列表
        GetAuthorizationList(Date){
            let Info = {
                page:this.page_num,
                number:this.number,
                userid:this.ID,
                //product_id:this.$store.state.CurProduction,
                date:Date?Date:''
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'selectsbmx1',DATA
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.dataDetail = res.data.mxlist
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
          //this.GetAuthorizationList(this.signDate)
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          //this.GetAuthorizationList(this.signDate)
        },
        //切换注册时间
        ChangeSignDate(Time){
            this.signDate = Time
            //this.GetAuthorizationList(Time)
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.EquipmentCondition{
    margin-top: 50px;
}
</style>
