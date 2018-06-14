<template>
    <div class="Subaccount">
        <Row style="display: block;" type="flex" justify="space-between" class="code-row-bg">
            <Col span="4">
                 <h2>子账户管理</h2>
            </Col>
            <Col span="20" class="TextRight">
                <Button type="error" icon="android-add" @click="AddUser">添加子账户</Button>
            </Col>

        </Row>
        <!-- 添加账户 -->
        <Modal v-model="ifShowModal" width="600" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加子账户</span>
            </p>
            <div style="">
                <Form ref="formCreateU" :model="formCreateU" :rules="ruleCreateU"  :label-width="100">
                    <FormItem prop="phone" label="手机号">
                        <Input type="text" v-model="formCreateU.phone" placeholder="手机号">
                      </Input>
                    </FormItem>
                    <FormItem prop="psd" label="初始密码">
                        <Input type="text" disabled v-model="formCreateU.psd" placeholder="请输入密码">
                        </Input>
                    </FormItem>
                    <!-- <FormItem prop="psdAgain" label="确认密码">
                        <Input type="password" v-model="formCreateU.psdAgain" placeholder="请再次输入密码">
                        </Input>
                    </FormItem> -->
                    <FormItem prop="name" label="姓名">
                        <Input type="text" v-model="formCreateU.name" placeholder="请输入姓名">
                        </Input>
                    </FormItem>
                    <FormItem prop="company" label="公司名称">
                        <Input type="text" v-model="formCreateU.company" placeholder="请输入公司名称">
                        </Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="handleCreateU('formCreateU')">确定创建</Button>
            </div>
        </Modal>
        
        <!-- 子账户列表 -->
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="UsersColumns" :data="UsersData"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
  export default{
    data: function () {
      return {
        table_loading:true,
        ifShowModal:false,
        modal_loading:false,
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        disabled:false,
        timerCount:"获取验证码",
        RealCode:'',
        formCreateU:{
            phone: '',
            code: '',
            psd:'000000',
            psdAgain:'',
            name:'',
            company:''
        },
        formImport: {
            xlsFile: '',
            xlsMoban:''
        },
        ruleCreateU:{
            phone: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
            ],
            // code: [
            //     { required: true, message: '请输入手机验证码', trigger: 'blur' }
            // ],
            psd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            // psdAgain: [
            //     { required: true, message: '请再次输入密码', trigger: 'blur' }
            // ],
            name: [
                { required: true, message: '请输入姓名', trigger: 'blur' }
            ],
            company: [
                { required: true, message: '请输入公司名称', trigger: 'blur' }
            ]
        },
        ruleImport: {
            xlsFile: [
                { required: true, message: '请选择导入的xls文件', trigger: 'blur' }
            ]
        },
        UsersColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title:'手机号',
                key:'fmobile'
            },
            {
                title:'姓名',
                key:'fname'
            },
            {
                title:'公司名称',
                key:'company_name'
            },
        ],
        UsersData: []
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetSubaccount()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        //获取验证码
        // toGetCode(){
        //     if (!(/^1[34578]\d{9}$/.test(this.formCreateU.phone))){
        //       this.$Message.error('手机号格式不正确!');
        //       return false
        //     }
        //     if (this.disabled){
        //     return false
        //     }
            
        //     //倒计时
        //     var countdown = 10;
        //     var _this = this
        //     this.GetRealCode()
        //     settime()
        //     function settime() {
        //       if (countdown == 0) {
        //           _this.disabled = false
        //           _this.timerCount = '获取验证码'
        //           countdown = 10
        //       } else {
        //           _this.disabled = true,
        //           _this.timerCount = "重新发送(" + countdown + ")"
        //           countdown--;
        //       }
        //       setTimeout(function () {
        //         if (_this.disabled == true){
        //           settime()
        //         }
                
        //       }, 1000)
        //     }
        //   },
        // GetRealCode(){
        //     axios.get(R_PRE_URL+'smsSend?fmobile='+this.formCreateU.phone
        //       ).then((res)=> {
        //         if(res.data.result == 1){
        //           this.RealCode = res.data.code
        //         }else{
        //           this.$Message.error('信息发送失败请稍后重试!');
        //         }
        //     }).catch((error)=> {
        //       console.log(error)
        //     })
        // },
        //添加子账户
        handleCreateU(name) {
            this.$refs[name].validate((valid) => {
              if (valid) {
                if (!(/^1[34578]\d{9}$/.test(this.formCreateU.phone))){
                  this.$Message.error('手机号格式不正确!');
                  return false
                }
                let SignInfo = {
                    big_customer_id:this.ID,
                    fmobile:this.formCreateU.phone,
                    fusername:this.formCreateU.name,
                    fcompanyname:this.formCreateU.company,
                    fpassword:CryptoJS.MD5(this.formCreateU.psd).toString(),
                }
                let DATA = {'users':SignInfo}
                 // if(this.formCreateU.psd!=this.formCreateU.psdAgain){
                 //    this.$Message.error('两次输入的密码不一致!')
                 //    return false
                 // }
                axios.post(R_PRE_URL+'register1?',DATA
                  ).then((res)=> {
                    switch(res.data.result){
                      case 1:
                      this.$Message.success('添加子账户成功!')
                      this.ifShowModal = false
                      this.GetSubaccount()
                      break
                      case 0:
                      this.$Message.error('添加子账户失败!')
                      break
                      case 2:
                      this.$Message.error('该手机号已注册!')
                      break
                      case 3:
                      this.$Message.error('该公司已注册!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                  }).catch((error)=> {
                    console.log(error)
                  })
                
              } else {
                  this.$Message.error('请确保信息已全部填写!');
              }
            })
        },
        //获取子账户列表
        GetSubaccount(){
            let SignInfo = {
              page:this.page_num,
              number:this.number,
              userid:this.ID
            }
            let DATA = {'users':SignInfo}
            axios.post(R_PRE_URL+'selectusers?',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.UsersData = res.data.companytypelist
                  this.Total = res.data.count
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取子账户列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙!')
            })
        },
        //显示添加modal
        AddUser(){
            this.ifShowModal = true
        },
        //分页
        changePage(event){
          this.page_num = event
          //this.GetAllProduction()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          //this.GetAllProduction()
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.Subaccount{
    margin-top: 50px;
}
</style>
