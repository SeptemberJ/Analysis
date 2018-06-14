<template>
    <div class="EnterpriseInfo">
        <h2>企业信息</h2>
        <div class="BlockWrap marginTB_20">
        <Row type="flex" justify="center" class="code-row-bg">
            <Col :xs="8" :sm="8" :md="8" :lg="6">
                <div class="SmallBgBlock" :style="{background: 'url(static/img/cardSide.png)',backgroundRepeat:'no-repeat',height:'100vh'}"></div>
            </Col>
            <Col :xs="16" :sm="16" :md="16" :lg="18">
                <Form label-position="left" ref="formInfo" :model="formInfo" :rules="ruleValidateInfo" :label-width="120">
                <FormItem label="企业ID">
                    {{formInfo.EId}}
                </FormItem>
                <FormItem label="企业名称" prop="EName">
                    <Input v-model="formInfo.EName" placeholder="请输入企业名称"></Input>
                </FormItem>
                <FormItem label="企业类别" prop="EKind">
                    <Select v-model="formInfo.EKind" placeholder="请选择企业类别">
                        <Option v-for="(TypeItem,TypeIdx) in TypeList" :value="TypeItem.typename">{{TypeItem.typename}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="联系人" prop="Contact">
                    <Input v-model="formInfo.Contact" placeholder="请输入联系人"></Input>
                </FormItem>
                <FormItem label="联系电话" prop="Phone">
                    <Input v-model="formInfo.Phone" placeholder="请输入联系电话"></Input>
                </FormItem>

                <Button @click="InfoSubmit('formInfo')" type="error">保存修改</Button>
            </Form>
            </Col>
        </Row>
            
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
        ID:'',
        TypeList:'',
        formInfo: {
            EId:'',
            EName: '',
            EKind: '',
            Contact: '',
            Phone: '',
        },
        ruleValidateInfo: {
            EName: [
                { required: true, message: '请输入企业名称！', trigger: 'blur' }
            ],
            EKind: [
                { required: true, message: '请选择企业类别！', trigger: 'change' }
            ],
            Contact: [
                { required: true, message: '请输入联系人！', trigger: 'blur' }
            ],
            Phone: [
                { required: true, message: '请输入联系电话！', trigger: 'blur' }
            ]
        },

      }
    },
    mounted() {
    },
    created() {
      this.GetEnterpriseInfo()
      this.GetEnterpriseKind()
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        GetEnterpriseInfo(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            axios.get(R_PRE_URL+'selectuser?id='+ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  let Info = res.data.userlist[0]
                  this.ID = Info.id
                  this.formInfo.EId = Info.company_id,
                  this.formInfo.EName = Info.company_name
                  this.formInfo.EKind = Info.company_type
                  this.formInfo.Contact = Info.company_contact
                  this.formInfo.Phone = Info.company_mobile
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
            console.log(error)
            })
        },
        GetEnterpriseKind(){
            axios.post(R_PRE_URL+'selectcompanytype'
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.TypeList = res.data.companytypelist
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
            console.log(error)
            })
        },
        handleBeforeUpload(event){
            var _this = this
            var file = event
            //_this.formApplication.FileName = file.name
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){
              _this.formInfo.Avatar = this.result
            } 
        },
        InfoSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let EnterpriseInfo = {
                        id:this.ID,
                        company_name:this.formInfo.EName,
                        comany_type :this.formInfo.EKind,
                        company_contact:this.formInfo.Contact,
                        company_mobile:this.formInfo.Phone
                    }
                    let DATA ={'users':EnterpriseInfo}
                    axios.post(R_PRE_URL+'updatecompany',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('修改企业账号信息成功!')
                          break
                          case 0:
                          this.$Message.error('修改企业信息失败!')
                          break
                          case 2:
                          this.$Message.error('该企业已经注册!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                        }
                    }).catch((error)=> {
                    console.log(error)
                    })
                    
                } else {
                    this.$Message.error('带*号为必填项!');
                }
            })
        },
     

    }
  }
</script>
<style lang="scss" scoped>


.EnterpriseInfo{
    margin-top: 50px;
    form{
        width: calc(80% - 40px;);
        margin: 0 auto;
        padding: 20px;
        
    }
}


</style>
