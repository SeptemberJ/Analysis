<template>
    <div class="MessagePush">
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
       <!--  <div v-else> -->
        <div>
            <Row type="flex" justify="space-between" class="code-row-bg">
              <Col span="4"><h2>消息列表</h2></Col>
              <Col span="8" class="TextRight">
                  <Button type="primary" icon="settings" @click="JGconfigure">极光配置</Button>
                  <Button type="error" icon="android-add" @click="AddMessage">新增消息</Button>
              </Col>
          </Row>
          <!-- 消息列表 -->
          <div  class="BlockWrap marginTB_20">
              <Table border :loading="table_loading" :columns="MesssageColumns" :data="MesssageData"></Table>
              <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
          </div>
          <!-- 极光配置 -->
          <Modal v-model="ifShowModal_configure" width="600" :mask-closable="false">
              <p slot="header">
                  <Icon type="gear-b"></Icon>
                  <span>极光配置</span>
              </p>
              <div style="">
                  <Form ref="formCreateConfigure" :model="formCreateConfigure" :rules="ruleCreateConfigure"  :label-width="120">
                      <FormItem prop="AppKey" label="APP Key">
                          <Input type="text" v-model="formCreateConfigure.AppKey" placeholder="请输入APP Key">
                        </Input>
                      </FormItem>
                      <FormItem prop="AppSecret" label="APP Secret">
                          <Input type="text" v-model="formCreateConfigure.AppSecret" placeholder="请输入APP Secret">
                        </Input>
                      </FormItem>
                      <FormItem prop="Plat" label="目标平台（只对iOS有效）">
                          <RadioGroup v-model="formCreateConfigure.Plat">
                              <Radio label="iOS开发环境"></Radio>
                              <Radio label="iOS生产环境"></Radio>
                          </RadioGroup>
                      </FormItem>
                  </Form>
              </div>
              <div slot="footer" style="text-align:center">
                  <Button type="error" size="large" :loading="modal_loading" @click="handleCreateConfigure('formCreateConfigure')">提交</Button>
              </div>
          </Modal>

          <!-- 新增消息 -->
          <CreateMessage v-on:refreshMessage="Refresh"></CreateMessage>
        </div>
        
    </div>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateMessage from "./Create/CreateMessage"
  export default{
    data: function () {
      return {
        table_loading:true,
        ifShowModal_configure:false,
        modal_loading:false,
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        fileName:'',
        formCreateConfigure:{
            AppKey:'',
            AppSecret:'',
            Plat:'iOS生产环境'
        },
        ruleCreateConfigure: {
            AppKey: [
                { required: true, message: '请输入APP Key', trigger: 'blur' }
            ],
            AppSecret: [
                { required: true, message: '请输入APP Secret', trigger: 'blur' }
            ],
            Plat: [
                { required: true, message: '请选择目标平台', trigger: 'change' }
            ],
        },
        MesssageColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '消息标题',
                key: 'ftitle'
            },
            {
                title: '推送内容',
                key: 'fpushcontent'
            },
            {
                title: '推送方式',
                key: 'fpushmode'
            },
            {
                title: '推送时间',
                key: 'fpushtime'
            },
            {
                title: '推送人群',
                key: 'fpushmasses'
            }
        ],
        MesssageData:[]
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetMessageList()
      
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
        CreateMessage
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        //极光配置modal
        JGconfigure(){
            this.ifShowModal_configure = true
            this.GetConfigureInfo()

        },
        //获取极光配置信息
        GetConfigureInfo(){
            let ConfigureInfo = {
              userid:this.ID,
              apply_id:this.$store.state.CurApplication,
            }
            let DATA = {'users':ConfigureInfo}
            axios.post(R_PRE_URL+'selectfeed1',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  if(res.data.feedlist[0]){
                    this.formCreateConfigure.AppKey = res.data.feedlist[0].feedappkey
                    this.formCreateConfigure.AppSecret = res.data.feedlist[0].feedappkey
                    this.formCreateConfigure.Plat = res.data.feedlist[0].feedmbpt
                  }else{
                    this.formCreateConfigure.AppKey = ''
                    this.formCreateConfigure.AppSecret = ''
                    this.formCreateConfigure.Plat = 'iOS生产环境'
                  }
                  break
                  case 0:
                  this.$Message.error('获取极光配置信息失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取极光配置信息失败!')
            })
        },
        //创建消息modal
        AddMessage(){
            this.$store.state.M_CreateMessage = true
        },
        //极光配置
        handleCreateConfigure(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                      userid:this.ID,
                      apply_id:this.$store.state.CurApplication,
                      feedappkey:this.formCreateConfigure.AppKey,
                      feedappsecret:this.formCreateConfigure.AppSecret,
                      feedmbpt:this.formCreateConfigure.Plat,
                    }
                    this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'updatefeed',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('极光配置成功!')
                          this.ifShowModal_configure = false
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('极光配置失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙，极光配置失败!')
                        this.modal_loading = false
                    })
                    
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetMessageList()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetMessageList()
        },
        //获取推送消息列表
        GetMessageList(){
            let MessageInfo = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':MessageInfo}
            axios.post(R_PRE_URL+'msg',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.MesssageData = res.data.msg
                  this.Total = res.data.sunmun
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取推送消息列表失败!')
                  this.table_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.table_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取推送消息列表失败!')
                this.table_loading = false
            })
        },
        Refresh(){
            this.GetMessageList()
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.MessagePush{
    margin-top: 50px;
}
</style>
