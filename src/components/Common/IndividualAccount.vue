<template>
    <div class="IndividualAccount">
        <div v-if="!IfModify">
        <h2>个人账号</h2>
            <div class="BlockWrap marginTB_20">
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col :xs="12" :sm="12" :md="10" :lg="9">
                        <div class="SmallBgBlock" :style="{background: 'url(static/img/card.png)',backgroundRepeat:'no-repeat',height:'100vh'}"></div>
                    </Col>
                    <Col :xs="12" :sm="12" :md="14" :lg="15">
                        <Form label-position="left" ref="formInfo" :model="formInfo" :rules="ruleValidateInfo" :label-width="120">
                            <FormItem label="头像"  prop="Avatar">
                                <img :style="{width:'150px',height:'150px'}" :src="formInfo.Avatar?formInfo.Avatar:'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
                            </FormItem>
                            <FormItem label="姓名"  prop="Name">
                                {{formInfo.Name}}
                            </FormItem>
                            <FormItem label="账号"  prop="Account">
                                {{formInfo.Account}}
                            </FormItem>
                            <FormItem label="密码"  prop="Psd">
                                ************
                            </FormItem>
                            <FormItem label="上次登录时间"  prop="LastTime">
                                {{formInfo.LastTime}}
                            </FormItem>
                            <FormItem label="ID"  prop="PsdAgain">
                                {{formInfo.ID}}
                            </FormItem>
                            <FormItem label="ACCESS KEY"  prop="Key">
                                <Button @click="SeeKey" type="warning" shape="circle" icon="ios-search">查看</Button>
                            </FormItem>
                            <Button @click="ModifyInfo" type="error">修改信息</Button>
                        </Form>
                    </Col>
                </Row>
                
            </div>

            <!-- 查看key -->
            <Modal v-model="IfSeeKey" width="360">
                <p slot="header" style="">
                    <Icon type="android-settings"></Icon>
                    <span>ACCESS KEY</span>
                </p>
                <div>
                    <h3>您当前的ACCESS KEY为：</h3>
                    <h3 class="colorBlue">{{formInfo.Key}}</h3>
                    <p>(点击下方"重置"按钮可进行重置)</p>
                </div>
                <div slot="footer">
                    <Button type="error" size="large" @click="RestKey">重置</Button>
                </div>
            </Modal>
        </div>
        <div v-else class="ModifyInfo">
        <!-- 修改个人账号信息 -->
        <div>
            <h2>修改个人账号信息</h2>
            <div class="BlockWrap marginTB_20">
                <Row type="flex" justify="center" class="code-row-bg">
                    <Col span="24" :style="{height: '117px'}">
                        <div class="SmallBgBlock" :style="{background: 'url(static/img/cardTop.png)',backgroundRepeat:'repeat'}"></div>
                    </Col>
                    <Col span="24">
                        <Form label-position="left" ref="formModify" :model="formModify" :rules="ruleValidateModify" :label-width="120">
                            <FormItem label="账号">
                                {{formModify.Account}}
                            </FormItem>
                            <FormItem label="头像">
                                <img :style="{width:'150px',height:'150px'}" :src="formModify.Avatar?formModify.Avatar:'https://i.loli.net/2017/08/21/599a521472424.jpg'" />
                            </FormItem>
                            <FormItem label="">
                                <Upload action="//jsonplaceholder.typicode.com/posts/"
                                :before-upload="handleBeforeUpload"
                                >
                                    <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传的头像</Button>
                                </Upload>
                            </FormItem>
                            <FormItem v-if="!M_Name" label="姓名" prop="Psd">
                                {{formModify.Name}}
                                    <iSwitch size="large" v-model="M_Name" @on-change="EditName" class=" marginL_10 cursorPointer">
                                        <span slot="open">取消</span>
                                        <span slot="close">修改</span>
                                    </iSwitch>
                            </FormItem>

                            <FormItem v-if="M_Name" label="姓名" prop="Name">
                            <Row>
                              <Col span="20">
                                <Input v-model="formModify.Name" placeholder="请输入姓名"></Input>
                              </Col>
                              <Col span="4">
                                  <iSwitch size="large" v-model="M_Name" @on-change="EditName" class=" marginL_10 cursorPointer">
                                    <span slot="open">取消</span>
                                    <span slot="close">修改</span>
                                </iSwitch>
                              </Col>
                            </Row>
                            </FormItem>

                            <FormItem v-if="!M_Psd" label="密码" prop="Psd">
                                ************
                                <iSwitch size="large" v-model="M_Psd" @on-change="EditPsd" class=" marginL_10 cursorPointer">
                                    <span slot="open">取消</span>
                                    <span slot="close">修改</span>
                                </iSwitch>
                            </FormItem>
                            <FormItem v-if="M_Psd" label="密码" prop="Psd">
                                <Row>
                                  <Col span="20">
                                    <Input type="password"  v-model="formModify.Psd" placeholder="请输入密码"></Input>
                                  </Col>
                                  <Col span="4">
                                      <iSwitch size="large" v-model="M_Psd" @on-change="EditPsd" class=" marginL_10 cursorPointer">
                                        <span slot="open">取消</span>
                                        <span slot="close">修改</span>
                                      </iSwitch>
                                  </Col>
                                </Row>
                            </FormItem>
                            <FormItem v-if="M_Psd" label="确认密码" prop="PsdAgain">
                                <Input type="password" v-model="formModify.PsdAgain" placeholder="请再次输入密码"></Input>
                            </FormItem>

                            <Button @click="ModifySubmit('formModify')" type="error">保存修改</Button>
                            <Button class="marginL_20" @click="BackInfo" type="primary">返回</Button>
                        </Form>
                    </Col>
                </Row>
                
            </div>
        </div>

    </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import {clearCookie} from '../../util/utils'
  export default{
    data: function () {
      return {
        IfSeeKey:false,
        IfModify:false,
        M_Name:false,
        M_Psd:false,
        formInfo: {
            Avatar:'',
            Name: '',
            Account: '',
            Psd: '',
            LastTime: '',
            ID: '',
            Key: '',
        },
        ruleValidateInfo: {
        },
        formModify:{
            Avatar:'',
            Name: '',
            Account: '',
            Psd: '',
            PsdAgain:'',
        },
        ruleValidateModify: {
            // Name: [
            //     { required: true, message: '', trigger: 'change' }
            // ],
            // Psd: [
            //     { required: true, message: '请输入新密码！', trigger: 'blur' }
            // ],
            // PsdAgain: [
            //     { required: true, message: '请确认新密码！', trigger: 'blur' }
            // ]
        },

      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetIndividualAccountInfo()
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        GetIndividualAccountInfo(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            axios.get(R_PRE_URL+'selectuser?id='+ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  let Info = res.data.userlist[0]
                  console.log(Info.head_pic)
                  this.formInfo.Avatar = Info.head_pic,
                  this.formInfo.Name = Info.fname
                  this.formInfo.Account = Info.fmobile
                  this.formInfo.Psd = Info.fpassword
                  this.formInfo.LastTime = Info.logindate
                  this.formInfo.ID = Info.id
                  this.formInfo.key = '987',

                  this.formModify.Account = Info.fmobile
                  this.formModify.Name = Info.fname
                  this.formModify.Avatar = Info.head_pic
                  this.formModify.Psd = Info.fpassword
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
            console.log(error)
            })
        },
        EditName(Status){
            this.M_Name = Status
            if(!Status){
                this.formModify.Name = this.formInfo.Name
            }
        },
        EditPsd(Status){
            this.M_Psd = Status
            if(!Status){
                this.formModify.Psd = this.formInfo.Psd
            }else{
                this.formModify.Psd = ''
            }
        },
        SeeKey(){
            axios.get(R_PRE_URL+'selectaccesskey?id='+this.formInfo.ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.formInfo.Key= res.data.accesskey
                  this.IfSeeKey = true
                  break
                  case 0:
                  this.$Message.error('ACCESS KEY获取失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
            console.log(error)
            })
        },
        RestKey(){
            axios.get(R_PRE_URL+'updateaccesskey?id='+this.formInfo.ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.formInfo.Key= res.data.accesskey
                  break
                  case 0:
                  this.$Message.error('ACCESS KEY重置失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
            console.log(error)
            })
        },
        ModifyInfo(){
            this.IfModify = true
            //this.$store.state.OperatorMenuCur = '修改个人信息'
        },
        BackInfo(){
            this.IfModify = false
            this.GetIndividualAccountInfo()
        },
        handleBeforeUpload(event){
            var _this = this
            var file = event
            //_this.formApplication.FileName = file.name
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){
              _this.formModify.Avatar = this.result
            } 
        },
        ModifySubmit (name) {
            if(this.formModify.Name == ''){
                this.$Message.error('请填写新的姓名!')
                return false
            }
            if(this.formModify.Psd == ''){
                this.$Message.error('请填写新的密码!')
                return false
            }
            if(this.M_Psd && this.formModify.Psd != this.formModify.PsdAgain){
                this.$Message.error('两次输入的密码不一致!')
                return false
            }
            // this.$refs[name].validate((valid) => {
            //     if (valid) {
                    let ModifyInfo = {
                        id:this.formInfo.ID,
                        fusername:this.formModify.Name,
                        head_pic:this.formModify.Avatar == this.formInfo.Avatar?'':this.formModify.Avatar,
                        fpassword:this.formModify.Psd == this.formInfo.Psd?this.formInfo.Psd:CryptoJS.MD5(this.formModify.Psd).toString(),
                    }
                    let DATA = {'users':ModifyInfo}
                    axios.post(R_PRE_URL+'updateuser',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('修改个人账号信息成功!')
                          let Encryption_name = CryptoJS.AES.encrypt(this.formModify.Name,this.$store.state.PlainText).toString()
                          localStorage.setItem("BT_name",Encryption_name)
                          this.$store.state.userInfo.username = Encryption_name
                          // localStorage.clear()
                          // clearCookie('btznkz')
                          // this.$router.push({name:'登录'})
                          break
                          case 0:
                          this.$Message.error('信息修改失败!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                        }
                    }).catch((error)=> {
                    console.log(error)
                    })
                    
            //     } else {
            //         this.$Message.error('带*号为必填项!');
            //     }
            // })
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.IndividualAccount{
    margin-top: 50px;
    form{
        width: calc(60% - 20px;);
        margin: 0 auto;
        padding: 20px 10px;
        input{
            width: 120px;
        }
    }
}


</style>
