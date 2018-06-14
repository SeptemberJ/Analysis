<template>
    <div class="ProductManagement">
        <!-- 当前产品 -->
        <Row type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="4">
                <Button type="error" icon="android-add" @click="AddProduction">创建新产品</Button>
            </Col>
            <Col span="20" class="TextRight">
                当前应用：
                <Select v-model="CurApplication" @on-change="ChangeCurApplication" style="width:250px;text-align: left">
                    <Option v-for="item in ApplicationList" :value="item.id" :key="item.id">{{ item.apply_name }}</Option>
                </Select>
            </Col>
        </Row>
        <!-- 产品列表 -->
        <h2>产品列表</h2>
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="ProductionColumns" :data="ProductionData"></Table>
            <Page  v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
        <!-- 创建新产品 -->
        <CreateProduction :CurApplication="CurApplication"  :Applications="ApplicationList" v-on:refreshApplication="Refresh"/>
        <!-- 编辑产品信息 -->
        <EditProduction :EditInfo="EditInfo" :CurApplication="CurApplication" :Applications="ApplicationList" v-on:refreshApplication="Refresh"/>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateProduction from "./Create/CreateProduction"
import EditProduction from "./Edit/EditProduction"
  export default{
    data: function () {
      return {
        table_loading:true,
        EditInfo:'',
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        //ApplicationList:[],
        ProductionColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '产品图片',
                width: 90,
                key: 'product_pic',
                render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: params.row.product_pic?params.row.product_pic:'/static/img/icon/application.png',//'/static/img/icon/application.png',//params.row.headimg,
                                style: 'width: 40px;height: 40px;border-radius: 2px;margin: 10px auto'
                            },
                        }),
                    ]);
                }
            },
            {
                title: '产品名称',
                key: 'product_name'
            },
            {
                title: '产品ID',
                key: 'id'
            },
            {
                title: '所属应用',
                key: 'apply_type'
            },
            {
                title: '设备类别',
                key: 'product_kind'
            },
            {
                title: 'WIFI模块',
                key: 'wifi_module'
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
                                    this.EditProduction(params.index)
                                }
                            }
                        }, '查看'),
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
                                    this.removeProduction(params.row.id)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        ProductionData: []
      }
    },
    mounted() {
      
    },
    created() {
        this.GetProduction()
        //this.GetApplication()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        CurApplication: {
            get: function () {
              return this.$store.state.CurApplication
            },
            set: function (newValue) {
              this.$store.state.CurApplication = newValue
            }
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
        CreateProduction,
        EditProduction
    },
    methods: {
        //切换当前应用获取产品
        ChangeCurApplication(){
            this.GetProduction()
        },
        //获取所有应用
        // GetApplication(){
        //     axios.get(R_PRE_URL+'selectallapply?userid='+this.ID
        //     ).then((res)=> {
        //         switch(res.data.result){
        //           case 1:
        //           if(res.data.applylist[0]){
        //             this.CurApplication = this.$store.state.CurApplication == ''?res.data.applylist[0].id:this.$store.state.CurApplication
        //             this.ApplicationList = res.data.applylist
        //           }else{
        //             this.CurApplication = ''
        //           }
        //           this.GetProduction()
        //           break
        //           case 0:
        //           this.$Message.error('获取应用列表失败!')
        //           break
        //           default:
        //           this.$Message.error('系统繁忙!')
        //           this.modal_loading = false
        //         }
        //     }).catch((error)=> {
        //         console.log(error)
        //     })
        // },
        //获取对应产品列表
        GetProduction(){
            let info = {
                applyid:this.CurApplication,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':info}
            axios.post(R_PRE_URL+'selectproducts',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.ProductionData = res.data.productlist
                  this.Total = res.data.sunmun
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
            })
        },
        AddProduction(){
            this.$store.state.M_CreateProduction = true
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetProduction()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetProduction()
        },
        //编辑产品信息
        EditProduction(IDX){
            this.EditInfo = this.ProductionData[IDX]
            this.$store.state.M_EditProduction = true
        },
        //删除产品
        removeProduction(ID){
            this.$Modal.confirm({
                title: '删除提醒',
                content: '<p>确定删除该产品？</p>',
                onOk: () => {
                    axios.get(R_PRE_URL+'deleteproducts?id=' + ID
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('产品删除成功!')
                          this.Refresh()
                          break
                          case 0:
                          this.$Message.error('产品删除失败!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙!')
                        this.modal_loading = false
                    })
                },
                onCancel: () => {
                    //this.$Message.info('Clicked cancel');
                }
            })
        },
        Refresh(){
            this.GetProduction()
            this.$emit('refreshProductionList')
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.ProductManagement{
    margin-top: 50px;
    .BigIcon{
        font-size: 24px;
    }
}

</style>
