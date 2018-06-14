<template>
    <div class="EquipmentAuthorization">
        <!-- 概览 -->
        <ColorfulBlock :Info="OverView"/>

        <Row style="display: block;" type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="8">
                <h2>授权明细</h2>
            </Col>
            <Col span="16" class="TextRight">
                <Button type="primary" @click="addAuthorization">导入</Button>
            </Col>
        </Row>
        <!-- 添加授权 -->
        <Modal v-model="ifShowModal" width="600" :mask-closable="false">
            <p slot="header">
                <span>导入设备</span>
            </p>
            <div style="">
                <p>
                    <Icon type="information-circled" style="color: orange;"></Icon>
                    mac长度必须为12个字节16进制表示,不允许有空格！
                </p>
                
                <Form ref="formCreate" :model="formCreate" :rules="ruleCreate"  label-position="left" :label-width="100">
                    <FormItem label="Mac" prop="mac">
                        <Input v-model="formCreate.mac" placeholder=''></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="handleCreate('formCreate')">提交</Button>
            </div>
        </Modal>
        <!-- 授权列表 -->
        <div  class="BlockWrap marginTB_20">
            <Table border :columns="columnsAuthorization" :data="dataAuthorization"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
            
    </div>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import ColorfulBlock from '../../components/Common/ColorfulBlock.vue'
  export default{
    data: function () {
      return {
        ifShowModal:false,
        modal_loading:false,
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        OverView:'',
        columnsAuthorization: [
            {
                title: '设备Mac地址',
                key: 'fmac'
            },
            {
                title: '注册时间',
                key: 'faddtime'
            },
            {
                title: '激活时间',
                key: 'factivetime'
            },
        ],
        dataAuthorization:[],
        formCreate:{
            mac:''
        },
        ruleCreate: {
            mac: [
                { required: true, message: '请输入mac', trigger: 'blur' }
            ]
        }
      }
    },
    mounted: function () {
      
    },
    created(){
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
        ColorfulBlock
    },
    methods: {
        //获取页面总数据
        GetPageData(){
          this.GetOverViewData()
          this.GetAuthorizationList()
        },
        //概览信息
        GetOverViewData(KIND){
            let Info = {
              userid:this.ID,
              product_id:this.$store.state.CurProduction,
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'selectnumber2',DATA
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        //授权明细列表
        GetAuthorizationList(){
            let Info = {
                page:this.page_num,
                number:this.number,
                userid:this.ID,
                product_id:this.$store.state.CurProduction,
                date:''
            }
            let DATA = {'users':Info}
            axios.post(R_PRE_URL + 'selectsbmx1',DATA
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.dataAuthorization = res.data.mxlist
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
        //添加授权
        addAuthorization(){
            this.ifShowModal = true
        },
        //提交
        handleCreate(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modal_loading = true
                    let Info = {
                        userid:this.ID,
                        macs:this.formCreate.mac,
                        product_id:this.$store.state.CurProduction,
                    }
                    let DATA = {'users':Info}
                    axios.post(R_PRE_URL + 'selectsbmxdr',DATA
                      ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.ifShowModal = false
                          this.$Message.success('导入授权成功!')
                          this.modal_loading = false
                          this.GetAuthorizationList()
                          break
                          case 0:
                          this.$Message.error('导入授权失败!')
                          this.modal_loading = false
                          break
                          case 2:
                          this.$Message.error('该Mac已存在!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                      console.log(error)
                      this.$Message.error('系统繁忙,导入授权失败!')
                      this.modal_loading = false
                    })
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.EquipmentAuthorization{
    margin-top: 50px;
}
</style>
