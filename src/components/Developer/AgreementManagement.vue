<template>
    <div class="AgreementManagement">
        <!-- 当前产品 -->
        <Row type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="4">
                <Button type="error" icon="android-add" @click="AddAgreement">创建新协议</Button>
            </Col>
            <Col span="20" class="TextRight">
                当前产品：
                <Select v-model="CurProduction" @on-change="ChangeCurProduction"  style="width:250px;text-align: left">
                    <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                </Select>
            </Col>
        </Row>
        <!-- 协议列表 -->
        <h2>协议列表</h2>
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="AgreementColumns" :data="AgreementData"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
        <!-- 创建新协议 -->
        <CreateAgreement  :CurProduction="CurProduction"  :Productions="ProductionList" v-on:refreshApplication="Refresh"/>
        <!-- 编辑协议 -->
        <EditAgreement  :EditInfo='EditInfo' :CurProduction="CurProduction"  :Productions="ProductionList" v-on:refreshApplication="Refresh"/>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateAgreement from "./Create/CreateAgreement"
import EditAgreement from "./Edit/EditAgreement"
  export default{
    data: function () {
      return {
        table_loading:true,
        ifDeleteModal:false,
        //ProductionList:[],
        EditInfo:'',
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        AgreementColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '协议名称',
                key: 'agreement_name'
            },
            {
                title: '双向/单向',
                key: 'double_or_single'
            },
            {
                title: '功能码(设备上报)',
                key: 'function_code',
                render: (h, params) => {
                    return h('div', params.row.function_code_upper?params.row.function_code_upper:params.row.function_code_lower);
                }
            },
            {
                title: '数据类型',
                key: 'data_kind',
                render: (h, params) => {
                    return h('div', params.row.data_kind_upper?params.row.data_kind_upper:params.row.data_kind_lower);
                }
            },
            {
                title: '字节数',
                key: 'byte',
                render: (h, params) => {
                    return h('div', params.row.byte_upper?params.row.byte_upper:params.row.byte_lower);
                }
            },
            {
                title: '单位名称',
                key: 'unit_symbol',
                render: (h, params) => {
                    return h('div', params.row.unit_symbol_upper?params.row.unit_symbol_upper:params.row.unit_symbol_lower);
                }
            },
            {
                title: '描述',
                key: 'describe',
                render: (h, params) => {
                    return h('div', params.row.describe_upper?params.row.describe_upper:params.row.describe_lower);
                }
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
                                    this.editAgreement(params.row)
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
                                        this.removeAgreement(params.row)
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
        AgreementData: []
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetAgreement()
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
        CreateAgreement,
        EditAgreement
    },
    methods: {
        //切换当前应用
        ChangeCurProduction(){
            this.GetAgreement()
            //this.GetAllProduction()
        },
        //获取对应协议列表
        GetAgreement(){
            let info = {
                productid:this.CurProduction,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'products':info}
            axios.post(R_PRE_URL+'selectagrs',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.AgreementData = res.data.productslist
                  this.Total = res.data.sum
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取产品列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,获取产品列表失败!')
                this.modal_loading = false
            })
        },
        AddAgreement(){
            this.$store.state.M_CreateAgreement = true
        },
        removeAgreement(Info){
            axios.get(R_PRE_URL+'deleteagr?id=' + Info.id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.$Message.success('删除协议成功!')
                  this.Refresh()
                  break
                  case 0:
                  this.$Message.error('删除协议失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，删除协议失败!')
                this.modal_loading = false
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetAgreement()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetAgreement()
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
        //           this.GetAgreement()
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
        //编辑协议
        editAgreement(Info){
            this.EditInfo = Info
            this.$store.state.M_EditAgreement = true
            console.log(Info)
        },
        Refresh(){
            this.GetAgreement()
            //this.GetAllProduction()
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.AgreementManagement{
    margin-top: 50px;
    .BigIcon{
        font-size: 24px;
    }
}
</style>
