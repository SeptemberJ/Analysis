<template>
    <div id="particlesLogin">
    	<div class="LoginBlock">
    		<h1 class="marginTB_20">SmartHox Data analysis platform</h1>
    		<Form ref="formLogin" :model="formLogin" :rules="ruleLogin">
            <Row>
              <Col span="24">
                <FormItem prop="phone">
                  <Input class="transparentBg" type="text" v-model="formLogin.phone" placeholder="用户名">
                      
                  </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input class="transparentBg" type="password" v-model="formLogin.password" placeholder="密码">
                        
                    </Input>
                </FormItem>
                <FormItem>
                    <Button :style="{width:'100%'}" type="default" @click="handleSubmit('formLogin')">登录</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>
    	</div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import particles from 'particles.js'
import CryptoJS from "crypto-js"
import {setCookie,getCookie,getCryptoJsCookie,Encrypt,Decrypt} from '../../util/utils'

  export default{
    data: function () {
      return {
        ifSpin:false,
        formLogin: {
            phone: '',
            password: ''
        },
        ruleLogin: {
            phone: [
                { required: true, message: '请输入手机号', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ]
        }
      }
    },
    mounted(){
     
    },
   created() {
   },
   computed: {
    
   },
    components: {
      
    },
    
    methods: {
      //注册
      ToSign(){
        this.$router.push({name:'注册'})
      },
      //修改密码
      ToModify(){
        this.$router.push({name:'修改密码'})
      },
      handleSubmit(){
      	this.$router.push({name:'主页'})
      },
      handleSubmit2(name) {
          this.$refs[name].validate((valid) => {
              if (valid) {
                let cookieStr = this.formLogin.phone.toString() + this.formLogin.password.toString()
                let LoginInfo = {
                  fmobile:this.formLogin.phone,
                  fpassword:CryptoJS.MD5(this.formLogin.password).toString(),
                }
                this.$store.state.IfLoading = true
                let DATA = {'users':LoginInfo}
                let DATA2 = {
                	'username':this.formLogin.phone,
                	'password':this.formLogin.password
                }
                axios.post('http://205.168.1.112:8082/login',DATA2
				).then((res)=> {
				}).catch((error)=> {
				console.log(error)
				})

              } else {
                  this.$Message.error('请输入用户名或密码!');
              }
          })
      }
      
    }
  }

</script>
<style lang="scss" scoped>
#particlesLogin{
  position: absolute;
  width: 100%;
  height: 100%;
  background: #74cdb9;
  .LoginBlock{
  	min-width:200px;
  	color: #fff;
  	text-align: center;
  	position: fixed;
  	top: 50%;
  	left: 50%;
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

  
  .Login{
    .LoginBox{
      width: 100%;
      color: #fff;
      max-width: 500px;
      padding:20px 0;
      border-radius: 5px;
      background: #fff;
      position: fixed;
      top: 50%;
      left: 50%;
      webkit-box-shadow: 0 0 9px #fff;
      -moz-box-shadow: 0 0 9px #fff;
      box-shadow: 0 0 9px #fff;
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
