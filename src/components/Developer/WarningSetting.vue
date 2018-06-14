<template>
    <div class="WarningSeeting">
        <!-- 当前产品 -->
        <Row type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="4">
                <Button type="error" icon="android-add" @click="AddWarning">创建新告警规则</Button>
            </Col>
            <Col span="20" class="TextRight">
                当前产品：
                <Select v-model="CurProduction" @on-change="ChangeCurProduction"  style="width:250px;text-align: left">
                    <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                </Select>
            </Col>
        </Row>
        <!-- 告警列表 -->
        <h2>告警列表</h2>
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="WarningColumns" :data="WarningData"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
        <!-- 创建新告警 -->
        <CreateWarning  :CurProduction="CurProduction" :Productions="ProductionList" :Agreements="AgreementList" v-on:refreshApplication="Refresh"/>
        <!-- 编辑告警 -->
        <EditWarning  :EditInfo='EditInfo' :CurProduction="CurProduction"  :Productions="ProductionList" :Agreements="AgreementList" v-on:refreshApplication="Refresh"/>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateWarning from "./Create/CreateWarning"
import EditWarning from "./Edit/EditWarning"
  export default{
    data: function () {
      return {
        table_loading:true,
        ifDeleteModal:false,
        //ProductionList:[],
        AgreementList:[],
        EditInfo:'',
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        WarningData:[],
        WarningColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '规则名称',
                key: 'fname'
            },
            {
                title: '所属协议',
                key: 'fagreement_name'
            },
            {
                title: '告警条件',
                key: 'warningCondition',
                render: (h, params) => {
                    return h('div', params.row.fwarn_num+params.row.fwarn_condition);
                }
            },
            {
                title: '告警内容',
                key: 'fwarn_content'
            },
            {
                title: '告警类型',
                key: 'fwarn_type'
            },
            {
                title: '通知类型',
                key: 'fnotice_type'
            },
            {
                title: '状态',
                key: 'fstatus'
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size:'small',
                                icon:'compose'
                            },
                            style: {
                                marginRight: '20px',
                            },
                            on: {
                                click: () => {
                                    this.editWarning(params.row)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size:'small',
                                icon:'android-delete'
                            },
                            style: {
                            },
                            on: {
                                click: () => {
                                    this.$Modal.confirm({
                                    title: '提示',
                                    content: '<p>确定删除该协议？</p>',
                                    onOk: () => {
                                        this.removeWarning(params.row)
                                    },
                                    onCancel: () => {
                                    }
                                });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetAgreementList()
        this.GetWarningList()
        //this.GetAllProduction()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        CurProduction: {
            get: function () {
              return this.$store.state.CurProduction
            },
            set: function (newValue) {
              this.$store.state.CurProduction = newValue
            }
        },
        ProductionList:{
            get: function () {
              return this.$store.state.ProductionList
            },
            set: function (newValue) {
              this.$store.state.ProductionList = newValue
            }
        },
      
    },
    watch: {
      
    },
    components: {
        CreateWarning,
        EditWarning
    },
    methods: {
        //切换当前产品
        ChangeCurProduction(){
            this.GetWarningList()
            this.GetAgreementList()
        },
        AddWarning(){
            if(this.AgreementList.length>0){
                this.$store.state.M_CreateWarning = true
            }else{
                this.$Message.error('该产品下暂时还没有上报类型的协议,请先去添加!')
            }
        },
        //获取对应上报类型的协议列表
        GetAgreementList(){
            axios.get(R_PRE_URL+'selectagreements1?product_id='+this.CurProduction
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.AgreementList = res.data.arrlist
                  break
                  case 0:
                  this.$Message.error('获取数据类型失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取数据类型失败!')
            })
        },
        //获取所有产品列表
        // GetAllProduction(){
        //     axios.get(R_PRE_URL+'selectallpro?userid='+this.ID
        //     ).then((res)=> {
        //         switch(res.data.result){
        //           case 1:
        //           if(res.data.prolist[0]){
        //             this.CurProduction = this.$store.state.CurProduction == ''?res.data.prolist[0].id:this.$store.state.CurProduction
        //             this.ProductionList = res.data.prolist
        //           }else{
        //             this.CurProduction = ''
        //           }
        //           this.GetAgreementList()
        //           this.GetWarningList()
        //           break
        //           case 0:
        //           this.$Message.error('获取产品列表失败!')
        //           break
        //           default:
        //           this.$Message.error('系统繁忙!')
        //           this.modal_loading = false
        //         }
        //     }).catch((error)=> {
        //         console.log(error)
        //     })
        // },
        //获取对应告警列表
        GetWarningList(){
            let info = {
                productid:this.CurProduction,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'products':info}
            axios.post(R_PRE_URL+'selectwarnings?',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.WarningData = res.data.warninglist
                  this.Total = res.data.num
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取告警列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取告警列表失败!')
            })
        },
        //编辑告警规则
        editWarning(Info){
          console.log(Info)
          this.EditInfo = Info
          this.$store.state.M_EditWarning = true
        },
        //删除告警规则
        removeWarning(Info){
            axios.get(R_PRE_URL+'deletewarning?warningid=' + Info.id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.$Message.success('删除告警规则成功!')
                  this.Refresh()
                  break
                  case 0:
                  this.$Message.error('删除告警规则失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，删除告警规则失败!')
                this.modal_loading = false
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetWarningList()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetWarningList()
        },
        Refresh(){
            this.GetWarningList()
            //this.GetAllProduction()
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.WarningSeeting{
    margin-top: 50px;
    .BigIcon{
        font-size: 24px;
    }
}
</style>
