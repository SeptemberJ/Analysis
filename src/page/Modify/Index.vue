<template>
    <div id="particlesModify">
      <div class="Modify">
        <div class="ModifyBox">
          <Row class="marginTB_20 TextCenter">
              <Col span="24"><h2 class="colorWhite">修改密码</h2></Col>
          </Row>
          <Form ref="formModify" :model="formModify" :rules="ruleModify">
            <Row>
              <Col span="24">
                <FormItem prop="phone">
                  <Input class="transparentBg" type="text" v-model="formModify.phone" placeholder="手机号">
                      <Icon type="iphone" slot="prepend" size="22"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="code">
                    <Row>
                      <Col span="14">
                          <Input class="transparentBg" type="text" v-model="formModify.code" placeholder="验证码">
                              <Icon type="ios-email-outline" slot="prepend" size="22"></Icon>
                          </Input>
                      </Col>
                      <Col span="4" offset="1">
                          <Button type="error" :disabled="disabled" @click="toGetCode">{{timerCount}}</Button>
                      </Col>
                    </Row>
                    
                </FormItem>
                <FormItem prop="psd">
                    <Input class="transparentBg" type="password" v-model="formModify.psd" placeholder="请输入密码">
                        <Icon type="ios-locked-outline" slot="prepend" size="22"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="psdAgain">
                    <Input class="transparentBg" type="password" v-model="formModify.psdAgain" placeholder="请再次输入密码">
                        <Icon type="ios-unlocked-outline" slot="prepend" size="22"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formModify')">保存</Button>
                    <Button type="text" class="colorWhite" @click="ToLogin">去登录</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import particles from 'particles.js'
import CryptoJS from "crypto-js"

  export default{
    data: function () {
      return {
        ifSpin:false,
        disabled:false,
        RealCode:'',
        timerCount:"获取验证码",
        formModify: {
            phone: '',
            code: '',
            psd:'',
            psdAgain:'',
        },
        ruleModify: {
            phone: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            code: [
                { required: true, message: '请输入手机验证码', trigger: 'blur' }
            ],
            psd: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            psdAgain: [
                { required: true, message: '请再次输入密码', trigger: 'blur' }
            ]
        }
      }
    },
    mounted(){
     particlesJS.load('particlesModify','/static/particlesData.js');
    },
   created() {
     
   },
   computed: {
    
   },
    components: {
      
    },
    
    methods: {
      //登录
      ToLogin(){
        this.$router.push({name:'登录'})
      },
      //获取验证码
      toGetCode(){
        if (!(/^1[34578]\d{9}$/.test(this.formModify.phone))){
          this.$Message.error('手机号格式不正确!');
          return false
        }
        if (this.disabled){
        return false
        }
        //倒计时
        var countdown = 60;
        var _this = this
        this.GetRealCode()
        settime()
        function settime() {
          if (countdown == 0) {
              _this.disabled = false
              _this.timerCount = '获取验证码'
              countdown = 10;
          } else {
              _this.disabled = true,
              _this.timerCount = "重新发送(" + countdown + ")"
              countdown--;
          }
          setTimeout(function () {
            if (_this.disabled == true){
              settime()
            }
            
          }, 1000)
        }
      },
      GetRealCode(){
        axios.get(R_PRE_URL+'smsSend?fmobile='+this.formModify.phone
          ).then((res)=> {
            if(res.data.result == 1){
              this.RealCode = res.data.code
            }else{
              this.$Message.error('信息发送失败请稍后重试!');
            }
        }).catch((error)=> {
          console.log(error)
        })
      },
      handleSubmit(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                if(this.formModify.code!=this.RealCode){
                  this.$Message.error('手机验证码不正确!')
                  return false
                 }
                 if(this.formModify.psd!=this.formModify.psdAgain){
                  this.$Message.error('两次输入的密码不一致!')
                  return false
                 }
                 let ModifyInfo = {
                  fmobile:this.formModify.phone,
                  fpassword:CryptoJS.MD5(this.formModify.psd).toString(),
                 }
                 let DATA = {'users':ModifyInfo}
                  axios.post(R_PRE_URL+'lostpassword?',DATA
                  ).then((res)=> {
                    switch(res.data.result){
                      case 1:
                      this.$Message.success('修改密码成功!')
                      this.ToLogin()
                      break
                      case 0:
                      this.$Message.error('修改密码失败,请确认输入信息是否正确!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                  }).catch((error)=> {
                    console.log(error)
                    console.log('系统繁忙,修改密码失败!')
                  })
              } else {
                  this.$Message.error('请确保信息已全部填写!');
              }
          })
      }
      
    }
  }

</script>
<style lang="scss" scoped>
#particlesModify{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #245787;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  .Modify{
    .ModifyBox{
      width: 80%;
      max-width: 500px;
      padding:20px 0;
      border-radius: 5px;
      background: transparent;
      position: fixed;
      top: 50%;
      left: 50%;
      webkit-box-shadow: 0 0 9px #39f;
      -moz-box-shadow: 0 0 9px #39f;
      box-shadow: 0 0 9px #39f;
      transform:translate(-50%,-50%);
      -ms-transform:translate(-50%,-50%);   /* IE 9 */
      -moz-transform:translate(-50%,-50%);  /* Firefox */
      -webkit-transform:translate(-50%,-50%); /* Safari 和 Chrome */
      -o-transform:translate(-50%,-50%); 
      form{
        width: 90%;
        margin: 0 auto;

      }

    }
  }
}

</style>
