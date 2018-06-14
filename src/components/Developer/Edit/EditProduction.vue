<template>
    <!-- 创建新应用 -->
    <Modal v-model="ifShowModal" width="600" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>修改产品信息</span>
        </p>
        <div style="">
            <Form ref="formEdit" :model="formEdit" :rules="ruleEdit"  label-position="left" :label-width="100">
                <FormItem label="所属应用">
                    <Select v-model="P_belongKind" disabled placeholder="请选择所属应用">
                        <Option v-for="item in ApplicationList" :value="item.id" :key="item.id">{{ item.apply_name }}</Option>
                    </Select>
                </Select>
                </FormItem>
                <FormItem label="产品名称" prop="P_name"  placeholder="请输入产品名称">
                    <Input v-model="formEdit.P_name"></Input>
                </FormItem>
                <FormItem label="设备类别" prop="P_kind">
                    <Select v-model="formEdit.P_kind" placeholder="请选择设备类别">
                        <Option v-for="item in EquipmentKinds" :value="item.typename" >{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="WiFi模块" prop="P_wifi">
                    <Select v-model="formEdit.P_wifi" placeholder="请选择WiFi模块">
                        <Option v-for="item in WifiModules" :value="item.typename" >{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="技术方案" prop="P_programme">
                    <RadioGroup v-model="formEdit.P_programme" @on-change="RadioChange">
                        <Radio v-for="item in technologyProgrammes" :label="item.typename"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="应用图标" prop="A_img">
                    <div class="demo-upload-list">
                        <template>
                            <img :src="formEdit.P_img?formEdit.P_img:'/static/img/icon/application.png'">
                        </template>
                    </div>
                    <Upload
                        :max-size="2048"
                        :on-format-error="handleFormatError"
                        :on-exceeded-size="handleMaxSize"
                        :before-upload="handleBeforeUpload"
                        multiple
                        type="drag"
                        action=""
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large" :loading="modal_loading" @click="handleSave('formEdit')">保存修改</Button>
        </div>
    </Modal>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    props:['EditInfo','CurApplication','Applications'],
    data: function () {
      return {
        modal_loading:false,
        EquipmentKinds:[],
        WifiModules:[],
        technologyProgrammes:[],
        ruleEdit: {
            P_name: [
                { required: true, message: '产品名称不能为空', trigger: 'blur' }
            ],
            P_kind: [
                { required: true, message: '请选择设备类别', trigger: 'blur' }
            ],
            P_wifi: [
                { required: true, message: '请选择WiFi模块', trigger: 'blur' }
            ],
            P_programme: [
                { required: true, message: '请选择技术模块', trigger: 'blur' }
            ],
        }
      }
    },
    mounted() {
      
    },
    created() {
        this.GetEquipmentKinds()  
        this.GetWifiModules()  
        this.GettechnologyProgrammes()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_EditProduction
            },
            set: function (newValue) {
              this.$store.state.M_EditProduction = false
            }
        },
        ApplicationList(){
            return this.Applications
        },
        P_belongKind: {
            get: function () {
              return this.CurApplication
            },
            set: function (newValue) {
              this.CurApplication = newValue
            }
        },
        formEdit(){
            let Info = {
                P_name:this.EditInfo.product_name,
                P_kind:this.EditInfo.product_kind,
                P_wifi:this.EditInfo.wifi_module,
                P_programme:this.EditInfo.technical_scheme,
                P_img:this.EditInfo.product_pic
            }
            return Info
        }
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        //获取设备类别
        GetEquipmentKinds(){
            axios.post(R_PRE_URL+'selectsblb'
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.EquipmentKinds = res.data.sblblist
                  break
                  case 0:
                  this.$Message.error('获取设备类别失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        //获取wifi模块
        GetWifiModules(){
            axios.post(R_PRE_URL+'selectWiFimk'
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.WifiModules = res.data.WiFimklist
                  break
                  case 0:
                  this.$Message.error('获取Wifi模块失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        RadioChange(Item){
            console.log(Item)
            this.EditInfo.technical_scheme = Item
        },
        //获取技术方案
        GettechnologyProgrammes(){
            axios.post(R_PRE_URL+'selectjsfa'
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.technologyProgrammes = res.data.jsfalist
                  break
                  case 0:
                  this.$Message.error('获取技术方案失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '提示',
                desc: '上传的图片格式不正确！'
            });
        },
        handleMaxSize (file) {
            this.$Notice.warning({
                title: '提示',
                desc: '上传的图片大小不能超过2M！'
            });
        },
        handleBeforeUpload (event) {
            var _this = this
            var file = event
            //_this.formApplication.FileName = file.name
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){
              _this.formEdit.P_img = this.result
            } 
        },
        //保存修改
        handleSave (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //let App_id = this.Applications.filter(item => item.id == this.CurApplication)[0].id
                    let EditInfo = {
                      applyid:this.CurApplication,
                      product_name:this.formEdit.P_name,
                      product_kind:this.formEdit.P_kind,
                      WiFi_module:this.formEdit.P_wifi,
                      Technical_scheme:this.formEdit.P_programme,
                      product_pic:this.formEdit.P_img,
                      productsid:this.EditInfo.id
                    }
                    this.modal_loading = true
                    let DATA = {'users':EditInfo}
                    axios.post(R_PRE_URL+'updateproducts',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('修改产品信息成功!')
                          this.modal_loading = false
                          this.$store.state.M_EditProduction = false
                          this.$emit('refreshApplication')
                          break
                          case 2:
                          this.$Message.error('该产品名称已存在!')
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('修改产品信息失败!')
                          this.modal_loading = false
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
                    
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
     

    }
  }
</script>
<style scoped>
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
