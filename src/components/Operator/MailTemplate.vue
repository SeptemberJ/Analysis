<template>
    <div class="MailTemplate">
        <!-- 没有任何信息 -->
        <!-- <div v-if="ApplicationList.length == 0">
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
            <!-- 邮箱验证码模板 -->
            <h2>邮箱验证码模板</h2>
            <div  class="BlockWrap marginTB_20 PaddingTB_50">
                <Form class="PaddingLR_20" ref="formMailVerification" :model="formMailVerification" :rules="ruleMailVerification" :label-width="80">
                    <FormItem label="邮件标题" prop="name">
                        <Input v-model="formMailVerification.name" placeholder="请输入邮件标题"></Input>
                    </FormItem>
                    <FormItem label="邮件内容" prop="content">
                        <Input v-model="formMailVerification.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :maxlength="250" placeholder="请输入邮件内容（250字以内）"></Input>
                    </FormItem>
                    <FormItem label="示例模板:">
                       <p>【Smart Hox】你的验证码是{1}，请于{2}分钟内正确输入。</p>
                    </FormItem>
                    <FormItem label="">
                       <Button type="error" size="large" :loading="modal_loading_M" @click="handleCreateMailVerification('formMailVerification')">保存</Button>
                    </FormItem>
                </Form>
            </div>
            <!-- 密码找回模板 -->
            <h2>密码找回模板</h2>
            <div  class="BlockWrap marginTB_20 PaddingTB_50">
                <Form class="PaddingLR_20"  ref="formPSDBack" :model="formPSDBack" :rules="rulePSDBack" :label-width="80">
                    <FormItem label="邮件标题" prop="name">
                        <Input v-model="formPSDBack.name" placeholder="请输入邮件标题"></Input>
                    </FormItem>
                    <FormItem label="邮件内容" prop="content">
                        <Input v-model="formPSDBack.content" type="textarea" :autosize="{minRows: 5,maxRows: 5}" :maxlength="250"placeholder="请输入邮件内容（250字以内）"></Input>
                    </FormItem>
                    <FormItem label="示例模板:">
                       <p>【Smart Hox】你的验证码是{1}，请于{2}分钟内正确输入。</p>
                    </FormItem>
                    <FormItem label="">
                       <Button type="error" size="large" :loading="modal_loading_P" @click="handleCreatePSDBack('formPSDBack')">保存</Button>
                    </FormItem>
                </Form>
            </div>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
  export default{
    data: function () {
    //验证
    const validateMailContent = (rule, value, callback) => {
        let ifContainOne = this.formMailVerification.content.indexOf('{1}')
        let ifContainTwo = this.formMailVerification.content.indexOf('{2}')
        if (ifContainOne == '-1' || ifContainTwo == '-1') {
            callback(new Error('内容必须包含{1}，{2}各一个'));
        }else{
            callback();
        }
    };
    const validatePSDContent = (rule, value, callback) => {
        let ifContainOne = this.formPSDBack.content.indexOf('{1}')
        let ifContainTwo = this.formPSDBack.content.indexOf('{2}')
        if (ifContainOne == '-1' || ifContainTwo == '-1') {
            callback(new Error('内容必须包含{1}，{2}各一个'));
        }else{
            callback();
        }
    };
      return {
        ifHaveSaved_M:false,
        ifHaveSaved_P:false,
        id_M:'',
        id_P:'',
        modal_loading_M:false,
        modal_loading_P:false,
        formMailVerification:{
            name:'',
            content:'',
        },
        ruleMailVerification:{
            name: [
                { required: true, message: '请输入邮件标题', trigger: 'blur' }
            ],
            content: [
                { required: true, validator: validateMailContent, message: '内容必须包含{1}，{2}各一个', trigger: 'blur' }
            ],
        },
        formPSDBack:{
            name:'',
            content:''
        },
        rulePSDBack:{
            name: [
                { required: true, message: '请输入邮件标题', trigger: 'blur' }
            ],
            content: [
                { required: true, validator: validatePSDContent, message: '内容必须包含{1}，{2}各一个', trigger: 'blur' }
            ],
        }
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetTemplateInfo()
      
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
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        //邮箱验证码模板保存
        handleCreateMailVerification(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                      this.modal_loading_M = true
                      if(this.ifHaveSaved_M){  //编辑
                        let EditInfo_M = {
                            userid:this.ID,
                            apply_id:this.$store.state.CurApplication,
                            id:this.id_M,
                            fmailtitle:this.formMailVerification.name,
                            fmailcontent:this.formMailVerification.content,
                            fmailtype:'邮箱验证码模板'
                        }
                        this.EditMail({'users':EditInfo_M})
                      }else{  //新增
                        let AddInfo_M = {
                            userid:this.ID,
                            apply_id:this.$store.state.CurApplication,
                            fmailtitle:this.formMailVerification.name,
                            fmailcontent:this.formMailVerification.content,
                            fmailtype:'邮箱验证码模板'
                        }
                        this.NewAddMail({'users':AddInfo_M})
                      }
                      
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        //新增邮箱验证模板
        NewAddMail(DATA){
            axios.post(R_PRE_URL+'mail',DATA
              ).then((res)=> {
                  switch(res.data.result){
                    case 1:
                    this.$Message.success('邮箱验证码模板保存成功!')
                    this.modal_loading_M = false
                    break
                    case 0:
                    this.$Message.error('邮箱验证码模板保存失败!')
                    this.modal_loading_M = false
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                    this.modal_loading_M = false
                  }
          }).catch((error)=> {
              console.log(error)
              this.$Message.error('系统繁忙,邮箱验证码模板保存失败!')
          })
        },
        //编辑邮箱验证模板
        EditMail(DATA){
            axios.post(R_PRE_URL+'updatemail1',DATA
              ).then((res)=> {
                  switch(res.data.result){
                    case 1:
                    this.$Message.success('邮箱验证码模板保存成功!')
                    this.modal_loading_M = false
                    break
                    case 0:
                    this.$Message.error('邮箱验证码模板保存失败!')
                    this.modal_loading_M = false
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                    this.modal_loading_M = false
                  }
          }).catch((error)=> {
              console.log(error)
              this.$Message.error('系统繁忙,邮箱验证码模板保存失败!')
          })
        },
        //密码找回模板保存
        handleCreatePSDBack(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.modal_loading_P = true
                    if(this.ifHaveSaved_P){  //编辑
                        let EditInfo_P = {
                            userid:this.ID,
                            apply_id:this.$store.state.CurApplication,
                            id:this.id_P,
                            fmailtitle:this.formPSDBack.name,
                            fmailcontent:this.formPSDBack.content,
                            fmailtype:'密码找回模板'
                        }
                        this.EditPSD({'users':EditInfo_P})
                    }else{  //新增
                        let AddInfo_P = {
                            userid:this.ID,
                            apply_id:this.$store.state.CurApplication,
                            fmailtitle:this.formPSDBack.name,
                            fmailcontent:this.formPSDBack.content,
                            fmailtype:'密码找回模板'
                        }
                        this.NewAddPSD({'users':AddInfo_P})
                    }
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        //新增邮箱验证模板
        NewAddPSD(DATA){
            axios.post(R_PRE_URL+'mail',DATA
            ).then((res)=> {
                switch(res.data.result){
                    case 1:
                    this.$Message.success('密码找回模板保存成功!')
                    this.modal_loading_P = false
                    break
                    case 0:
                    this.$Message.error('密码找回模板保存失败!')
                    this.modal_loading_P = false
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                    this.modal_loading_P = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,密码找回模板保存失败!')
            })
        },
        //编辑邮箱验证模板
        EditPSD(DATA){
            axios.post(R_PRE_URL+'updatemail1',DATA
            ).then((res)=> {
                switch(res.data.result){
                    case 1:
                    this.$Message.success('密码找回模板保存成功!')
                    this.modal_loading_P = false
                    break
                    case 0:
                    this.$Message.error('密码找回模板保存失败!')
                    this.modal_loading_P = false
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                    this.modal_loading_P = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,密码找回模板保存失败!')
            })
        },
        //获取两个模板信息
        GetTemplateInfo(){
            let Info = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication
              }
              let DATA = {'users':Info}
              axios.post(R_PRE_URL+'mail1',DATA
              ).then((res)=> {
                  switch(res.data.result){
                    case 1:
                    if(res.data.maillist[0]){
                        this.ifHaveSaved_M = true
                        this.formMailVerification.name = res.data.maillist[0].fmail_title
                        this.formMailVerification.content = res.data.maillist[0].fmail_content
                        this.id_M = res.data.maillist[0].id
                    }else{
                        this.ifHaveSaved_M = false
                        this.formMailVerification.name = ''
                        this.formMailVerification.content = ''
                        this.id_M = ''
                    }
                    if(res.data.maillist[1]){
                        this.ifHaveSaved_P = true
                        this.formPSDBack.name = res.data.maillist[1].fmail_title
                        this.formPSDBack.content = res.data.maillist[1].fmail_content
                        this.id_P = res.data.maillist[1].id
                    }else{
                        this.ifHaveSaved_P = false
                        this.formPSDBack.name = ''
                        this.formPSDBack.content = ''
                        this.id_P = ''
                    }
                    break
                    case 0:
                    this.$Message.error('获取模板信息失败!')
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                  }
          }).catch((error)=> {
              console.log(error)
              this.$Message.error('系统繁忙,获取模板信息失败!')
          })

        }
     

    }
  }
</script>
<style lang="scss" scoped>
.MailTemplate{
    margin-top: 50px;
}
</style>
