<template>
    <div>
        <!-- 新增消息 -->
        <Modal v-model="ifShowModal" width="600" :mask-closable="false">
            <p slot="header">
                <Icon type="email-unread"></Icon>
                <span>新增消息</span>
            </p>
            <div style="">
                <p class="marginTB_10">
                  <Icon type="information-circled" style="color:orange;margin-right:10px;"></Icon>第一次在该应用下新增消息请确认已填写极光配置
                </p>
                <Form ref="formCreateMessage" :model="formCreateMessage" :rules="ruleCreateMessage"  label-position="left" :label-width="100">
                    <FormItem label="消息标题" prop="name">
                        <Input v-model="formCreateMessage.name" placeholder='请输入消息标题'></Input>
                    </FormItem>
                    <FormItem label="消息内容" prop="content">
                        <Input type="textarea" :autosize="true" :maxlength='100' v-model="formCreateMessage.content" placeholder='请输入消息内容（100字以内）...'></Input>
                    </FormItem>
                    <FormItem label="推送方式" prop="pushWay">
                      <RadioGroup v-model="formCreateMessage.pushWay">
                          <Radio label="极光推送"></Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="推送人群" prop="crowd">
                      <RadioGroup v-model="formCreateMessage.crowd">
                          <Radio label="群发"></Radio>
                          <Radio label="单发"></Radio>
                      </RadioGroup>
                    </FormItem>
                    <FormItem label="" prop="tel" v-if="formCreateMessage.crowd == '单发'">
                        <Input v-model="formCreateMessage.tel" placeholder='请输入用户手机号'></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="handleCreateMessage('formCreateMessage')">确定创建</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"

  export default{
    props:['OriginType'],
    data: function () {
      return {
        modal_loading:false,
        ApplicationList:[],
        application_id:'',
        formCreateMessage:{
            name:'',
            content:'',
            pushWay:'极光推送',
            crowd:'群发',
            tel:''
        },
        ruleCreateMessage: {
            name: [
                { required: true, message: '请输入消息标题', trigger: 'blur' }
            ],
            content: [
                { required: true, message: '请输入消息内容', trigger: 'blur' }
            ],
            pushWay: [
                { required: true, message: '请选择推送方式', trigger: 'change' }
            ],
            crowd: [
                { required: true, message: '请选择推送人群', trigger: 'change' }
            ],
        }
      }
    },
    mounted() {
      
    },
    created() {
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_CreateMessage
            },
            set: function (newValue) {
              this.$store.state.M_CreateMessage = false
            }
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
      //创建推送消息
        handleCreateMessage (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  //验证手机号码
                  if(this.formCreateMessage.crowd == '单发' && !this.formCreateMessage.tel){
                    this.$Message.error('请输入用户手机号!')
                    return false
                  }
                  if(this.formCreateMessage.crowd == '群发'){
                    this.formCreateMessage.tel = ''
                  }
                  let CreatInfo = {
                    userid:this.ID,
                    apply_id:this.$store.state.CurApplication,
                    ftitle:this.formCreateMessage.name,
                    fpushcontent:this.formCreateMessage.content,
                    fpushmode:this.formCreateMessage.pushWay,
                    fpushmasses:this.formCreateMessage.crowd,
                    fpushmobile:this.formCreateMessage.tel
                  }
                  this.modal_loading = true
                  let DATA = {'users':CreatInfo}
                  axios.post(R_PRE_URL+'addmsg',DATA
                  ).then((res)=> {
                      switch(res.data.result){
                        case 1:
                        this.$Message.success('创建推送消息成功!')
                        this.modal_loading = false
                        this.$store.state.M_CreateMessage = false
                        this.$emit('refreshMessage')
                        break
                        case 2:
                        this.$Message.error('请先对该应用进行极光配置!')
                        this.modal_loading = false
                        break
                        case 3:
                        this.$Message.error('该用户不存在!')
                        this.modal_loading = false
                        break
                        case 0:
                        this.$Message.error('创建推送消息失败!')
                        this.modal_loading = false
                        break
                        default:
                        this.$Message.error('系统繁忙!')
                        this.modal_loading = false
                      }
                  }).catch((error)=> {
                      console.log(error)
                      this.$Message.error('系统繁忙,创建推送消息失败!')
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
<style scoped>
.ivu-tag-dot{
    border: 0px solid #e3e8ee !important;
    padding: 0 !important;
}
.demo-upload-list{
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
}
.demo-upload-list img{
    width: 100%;
    height: 100%;
}
.demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
}
.demo-upload-list:hover .demo-upload-list-cover{
    display: block;
}
.demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
}
</style>
