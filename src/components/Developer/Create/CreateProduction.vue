<template>
  <div>
    <!-- 创建新产品 -->
    <Modal v-model="ifShowModal_P" width="600" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>创建新产品</span>
        </p>
        <div style="">
            <Form ref="formCreateP" :model="formCreateP" :rules="ruleCreateP"  label-position="left" :label-width="100">
                <FormItem label="所属应用">
                    <Select v-model="P_belongKind" disabled placeholder="请选择所属应用">
                        <Option v-for="item in ApplicationList" :value="item.id" :key="item.id">{{ item.apply_name }}</Option>
                    </Select>
                </Select>
                </FormItem>
                <FormItem label="产品名称" prop="P_name"  placeholder="请输入产品名称">
                    <Input v-model="formCreateP.P_name"></Input>
                </FormItem>
                <FormItem label="设备类别" prop="P_kind">
                    <Select v-model="formCreateP.P_kind" placeholder="请选择设备类别">
                        <Option v-for="item in EquipmentKinds" :value="item.typename" >{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="WiFi模块" prop="P_wifi">
                    <Select v-model="formCreateP.P_wifi" placeholder="请选择WiFi模块">
                        <Option v-for="item in WifiModules" :value="item.typename" >{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="技术方案" prop="P_programme">
                    <RadioGroup v-model="formCreateP.P_programme">
                        <Radio v-for="item in technologyProgrammes" :label="item.typename"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="应用图标" prop="A_img">
                    <div class="demo-upload-list">
                        <template>
                            <img :src="formCreateP.P_img?formCreateP.P_img:'/static/img/icon/application.png'">
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
            <Button type="error" size="large" :loading="modal_loading" @click="handleCreateP('formCreateP')">确定创建</Button>
            <Button type="primary" size="large"  @click="Next_creatAgreement()">下一步</Button>
        </div>
    </Modal>

    <!-- 创建新协议 -->
    <Modal v-model="ifShowModal_A" width="700" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>创建新协议</span>
        </p>
        <div style="">
            <Form ref="formCreateA" :model="formCreateA" :rules="ruleCreateA"  label-position="left" :label-width="100">
                <Tag type="dot" color="yellow">协议信息</Tag>
                <FormItem label="所属产品">
                    <Input disabled  v-model="formCreateP.P_name"></Input>
                    <!-- <Select v-model="formCreateP.P_name"  placeholder="请选择所属产品">
                        <Option value="formCreateP.P_name">{{ formCreateP.P_name }}</Option>
                        
                        <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                    </Select> -->
                </FormItem>
                <FormItem label="协议名称" prop="Agm_name">
                    <Input v-model="formCreateA.Agm_name"></Input>
                </FormItem>
                <FormItem label="双向/单向" prop="Agm_T2I">
                    <RadioGroup v-model="formCreateA.Agm_T2I">
                        <Radio label="双向指令"></Radio>
                        <Radio label="下发指令"></Radio>
                        <Radio label="上报指令"></Radio>
                    </RadioGroup>
                </FormItem>

                <Row v-if="formCreateA.Agm_T2I == '双向指令'">
                    <Col span="10">
                        <Tag type="dot" color="yellow">下发设备</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_D">
                            <Input v-model="formCreateA.Agr_functionCode_D" placeholder='（格式为10xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_D">
                            <Select v-model="formCreateA.Agr_dataType_D">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_D">
                            <Input v-model="formCreateA.Agr_byte_D" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_D">
                            <Input v-model="formCreateA.Agr_unitSymbol_D"  placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_D">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formCreateA.Agr_describe_D" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                    <Col span="10" offset="4">
                        <Tag type="dot" color="yellow">设备上报</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_U">
                            <Input v-model="formCreateA.Agr_functionCode_U"  placeholder='（格式为18xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_U">
                            <Select v-model="formCreateA.Agr_dataType_U">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_U">
                            <Input v-model="formCreateA.Agr_byte_U" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_U">
                            <Input v-model="formCreateA.Agr_unitSymbol_U" placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_U">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formCreateA.Agr_describe_U" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formCreateA.Agm_T2I == '下发指令'">
                    <Col span="12">
                        <Tag type="dot" color="yellow">下发设备</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_D">
                            <Input v-model="formCreateA.Agr_functionCode_D" placeholder='（格式为10xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_D">
                            <Select v-model="formCreateA.Agr_dataType_D">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_D">
                            <Input v-model="formCreateA.Agr_byte_D" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_D">
                            <Input v-model="formCreateA.Agr_unitSymbol_D"  placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_D">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formCreateA.Agr_describe_D" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formCreateA.Agm_T2I == '上报指令'">
                    <Col span="12">
                        <Tag type="dot" color="yellow">设备上报</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_U">
                            <Input v-model="formCreateA.Agr_functionCode_U"  placeholder='（格式为18xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_U">
                            <Select v-model="formCreateA.Agr_dataType_U">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_U">
                            <Input v-model="formCreateA.Agr_byte_U" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_U">
                            <Input v-model="formCreateA.Agr_unitSymbol_U" placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_U">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formCreateA.Agr_describe_U" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large" :loading="modal_loading" @click="handleCreateA('formCreateA')">确定创建</Button>
            <Button type="primary" size="large" v-if="formCreateA.Agm_T2I == '上报指令'"  @click="Next_creatWarning()">下一步</Button>
        </div>
    </Modal>

    <!-- 创建新告警 -->
    <Modal v-model="ifShowModal_W" width="700" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>创建新告警规则</span>
        </p>
        <div style="">
            <Form ref="formCreateW" :model="formCreateW" :rules="ruleCreateW"  label-position="left" :label-width="100">
                <Tag type="dot" color="yellow">规则信息</Tag>
                <FormItem label="所属产品">
                    <Input disabled  v-model="formCreateP.P_name"></Input>
                    <!-- <Select v-model="W_belongKind" disabled placeholder="请选择所属产品">
                        <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                    </Select> -->
                </FormItem>
                <FormItem label="规则名称" prop="W_name">
                    <Input v-model="formCreateW.W_name"></Input>
                </FormItem>
                <FormItem label="所属协议">
                    <Input disabled  v-model="formCreateA.Agm_name"></Input>
                    <!-- <Select v-model="formCreateW.W_belongAgm" placeholder="请选择所属协议">
                        <Option v-for="item in AgreementList" :value="item.agreement_name" :key="item.id">{{ item.agreement_name }}</Option>
                    </Select> -->
                </FormItem>
                <FormItem label="告警条件" prop="W_condition">
                    <Row type="flex" justify="space-between" class="code-row-bg">
                        <Col span="6">
                            <Input disabled value='数据值'></Input>
                        </Col>
                        <Col span="6">
                            <Select v-model="formCreateW.choose">
                                <Option v-for="item in chooseList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                            </Select>
                        </Col>
                        <Col span="6">
                            <Input v-model="formCreateW.W_condition"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="告警内容" prop="W_content">
                    <Input type="textarea" :autosize="true" :maxlength='250' v-model="formCreateW.W_content" placeholder='请输入告警内容（250字以内）...'></Input>
                </FormItem>
                <FormItem label="告警类型" prop="W_kind">
                    <Select v-model="formCreateW.W_kind" style="width:200px">
                        <Option v-for="item in kindList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="通知类型" prop="W_noticeKind">
                    <Select v-model="formCreateW.W_noticeKind" style="width:200px">
                        <Option v-for="item in noticeKindList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="通知方式" prop="W_noticeWay">
                    <RadioGroup v-model="formCreateW.W_noticeWay">
                        <Radio label="极光推送"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="状态" prop="W_status">
                    <RadioGroup v-model="formCreateW.W_status">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用"></Radio>
                    </RadioGroup>
                </FormItem>

                
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large" :loading="modal_loading" @click="handleCreateW('formCreateW')">确定创建</Button>
        </div>
    </Modal>
  </div>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
  export default{
    props:['CurApplication','Applications'],
    data: function () {
      //Agreement验证
        const validateAgr_functionCode_U = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='下发指令') {
                callback(new Error('请输入功能码'));
            }else{
                callback();
            }
        };
        const validateAgr_dataType_U = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='下发指令') {
                callback(new Error('请选择数据类型'));
            }else{
                callback();
            }
        };
        const validateAgr_byte_U = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='下发指令') {
                callback(new Error('请选择数据类型'));
            }else{
                callback();
            }
        };
        const validateAgr_functionCode_D = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='上发指令') {
                callback(new Error('请输入功能码'));
            }else{
                callback();
            }
        };
        const validateAgr_dataType_D = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='上发指令') {
                callback(new Error('请选择数据类型'));
            }else{
                callback();
            }
        };
        const validateAgr_byte_D = (rule, value, callback) => {
            if (value === '' && this.formCreateA.Agm_T2I!='上发指令') {
                callback(new Error('请选择数据类型'));
            }else{
                callback();
            }
        };
      return {
        modal_loading:false,
        //Production
          EquipmentKinds:[],
          WifiModules:[],
          technologyProgrammes:[],
          formCreateP:{
              P_name:'',
              P_kind:'',
              P_wifi:'',
              P_programme:'WiFi',
              P_img:''
          },
          ruleCreateP: {
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
          },
        //Agreement
          formCreateA:{
              Agm_name:'',
              Agm_T2I:'双向指令',
              Agr_functionCode_U:'',
              Agr_dataType_U:'',
              Agr_byte_U:'',
              Agr_unitSymbol_U:'',
              Agr_describe_U:'',
              Agr_functionCode_D:'',
              Agr_dataType_D:'',
              Agr_byte_D:'',
              Agr_unitSymbol_D:'',
              Agr_describe_D:'',
          },
          ruleCreateA: {
              Agm_name: [
                  { required: true, message: '请填写协议名称', trigger: 'blur' }
              ],
              Agm_T2I: [
                  { required: true, message: '', trigger: 'change' }
              ],
              Agr_functionCode_U:[
                  { validator: validateAgr_functionCode_U, message: '请输入功能码', trigger: 'blur' }
              ],
              Agr_dataType_U:[
                  { validator: validateAgr_dataType_U, message: '请选择数据类型', trigger: 'change' }
              ],
              Agr_byte_U:[
                  { validator: validateAgr_byte_U, message: '请输入字节数', trigger: 'blur' }
              ],
              Agr_functionCode_D:[
                  { validator: validateAgr_functionCode_D, message: '请输入功能码', trigger: 'blur' }
              ],
              Agr_dataType_D:[
                  { validator: validateAgr_dataType_D, message: '请选择数据类型', trigger: 'change' }
              ],
              Agr_byte_D:[
                  { validator: validateAgr_byte_D, message: '请输入字节数', trigger: 'blur' }
              ],
              
          },
          dataTypeList:[],
          agreement_ID:'',
        //Warning
          formCreateW:{
              W_name:'',
              W_belongAgm:'',
              choose:'小于',
              W_condition:'',
              W_content:'',
              W_kind:'',
              W_noticeKind:'',
              W_noticeWay:'极光推送',
              W_status:'启用',
          },
          ruleCreateW: {
              W_name: [
                  { required: true, message: '请填写规则名称', trigger: 'blur' }
              ],
              W_belongAgm: [
                  { required: true, message: '请选择所属协议', trigger: 'change' }
              ],
              W_condition: [
                  { required: true, message: '请填写告警条件', trigger: 'blur' }
              ],
              W_content: [
                  { required: true, message: '请填写告警内容', trigger: 'blur' }
              ],
              W_kind: [
                  { required: true, message: '请选择通知类型', trigger: 'change' }
              ],
              W_noticeKind: [
                  { required: true, message: '请选择通知类型', trigger: 'change' }
              ]
          },
          chooseList:[{"value":"小于"},{"value":"等于"},{"value":"大于"},{"value":"小于等于"},{"value":"大于等于"},{"value":"不等于"}],
          kindList:[],
          noticeKindList:[],
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
        //Production
          ifShowModal_P: {
              get: function () {
                return this.$store.state.M_CreateProduction
              },
              set: function (newValue) {
                this.$store.state.M_CreateProduction = false
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
        //Agreement
          ifShowModal_A: {
              get: function () {
                return this.$store.state.M_CreateAgreement
              },
              set: function (newValue) {
                this.$store.state.M_CreateAgreement = false
              }
          },
          // ProductionList(){
          //     //return this.Productions
          // },
          A_belongKind(){
              return this.formCreateP.P_name
          },
        //Warning
          ifShowModal_W: {
              get: function () {
                return this.$store.state.M_CreateWarning
              },
              set: function (newValue) {
                this.$store.state.M_CreateWarning = false
              }
          },
      
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
                  this.modal_loading = false
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
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        //获取技术方案
        GettechnologyProgrammes(){
            axios.post(R_PRE_URL+'selectjsfa'
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.technologyProgrammes = res.data.jsfalist
                  this.formCreateP.P_programme = res.data.jsfalist[0].typename
                  break
                  case 0:
                  this.$Message.error('获取技术方案失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
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
              _this.formCreateP.P_img = this.result
            } 
        },
        handleCreateP (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    //let App_id = this.Applications.filter(item => item.id == this.CurApplication)[0].id
                    let CreatInfo = {
                        userid:this.ID,
                        applyid:this.CurApplication,
                        product_name:this.formCreateP.P_name,
                        product_kind:this.formCreateP.P_kind,
                        WiFi_module:this.formCreateP.P_wifi,
                        Technical_scheme:this.formCreateP.P_programme,
                        product_pic:this.formCreateP.P_img,
                    }
                    //this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'insertproducts',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('创建新产品成功!')
                          this.modal_loading = false
                          this.production_ID = res.data.id
                          this.$store.state.M_CreateProduction = false
                          this.$emit('refreshApplication')
                          break
                          case 2:
                          this.$Message.error('该产品名称已已存在!')
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('创建新产品失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                    })
                    
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        Next_creatAgreement(){
            this.handleCreateP('formCreateP')
            this.GetDataType()
            this.$store.state.M_CreateAgreement = true
        },

        //Agreement
            //获取数据类型
            GetDataType(){
                axios.post(R_PRE_URL+'selectagreementtype'
                ).then((res)=> {
                    switch(res.data.result){
                      case 1:
                      this.dataTypeList = res.data.warningtypelist
                      break
                      case 0:
                      this.$Message.error('获取数据类型失败!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                }).catch((error)=> {
                    console.log(error)
                    this.$Message.error('系统繁忙，获取数据类型失败!')
                })
            },
            handleCreateA (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let CreatInfo = {
                          product_id:this.production_ID,
                          agreement_name:this.formCreateA.Agm_name,
                          double_or_single:this.formCreateA.Agm_T2I,
                          function_code_lower:this.formCreateA.Agr_functionCode_D,
                          data_kind_lower:this.formCreateA.Agr_dataType_D,
                          byte_lower:this.formCreateA.Agr_byte_D,
                          Unit_symbol_lower:this.formCreateA.Agr_unitSymbol_D,
                          describe_lower:this.formCreateA.Agr_describe_D,
                          function_code_upper:this.formCreateA.Agr_functionCode_U,
                          data_kind_upper:this.formCreateA.Agr_dataType_U,
                          byte_upper:this.formCreateA.Agr_byte_U,
                          Unit_symbol_upper:this.formCreateA.Agr_unitSymbol_U,
                          describe_upper:this.formCreateA.Agr_describe_U,
                        }
                        //this.modal_loading = true
                        let DATA = {'users':CreatInfo}
                        axios.post(R_PRE_URL+'insertagreement',DATA
                        ).then((res)=> {
                            switch(res.data.result){
                              case 1:
                              this.$Message.success('创建协议成功!')
                              this.agreement_ID = res.data.id
                              this.$store.state.M_CreateAgreement = false
                              this.modal_loading = false
                              this.$emit('refreshApplication')
                              if(res.data.double_or_single == '上报指令'){
                                  this.$store.state.M_CreateWarning = true
                                  this.GetWarningKind()
                                  this.GetNoticeKind()
                              }
                              break
                              case 2:
                              this.$Message.error('协议名称重复!')
                              this.modal_loading = false
                              break
                              case 0:
                              this.$Message.error('创建协议失败!')
                              this.modal_loading = false
                              break
                              default:
                              this.$Message.error('系统繁忙!')
                              this.modal_loading = false
                            }
                        }).catch((error)=> {
                            console.log(error)
                            this.$Message.error('系统繁忙,创建协议失败!')
                            this.modal_loading = false
                        })
                        
                    } else {
                        this.$Message.error('带*号的为必填项!');
                    }
                })
            },
            Next_creatWarning(){
                this.handleCreateA('formCreateA')
            },
        //Warning
            //获取告警类型下拉
            GetWarningKind(){
                axios.post(R_PRE_URL+'selectgj'
                ).then((res)=> {
                    switch(res.data.result){
                      case 1:
                      this.kindList = res.data.arrlist
                      break
                      case 0:
                      this.$Message.error('获取告警类型失败!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                }).catch((error)=> {
                    console.log(error)
                    this.$Message.error('系统繁忙，获取告警类型失败!')
                })
            },
            //获取通知类型下拉
            GetNoticeKind(){
                axios.post(R_PRE_URL+'selecttz'
                ).then((res)=> {
                    switch(res.data.result){
                      case 1:
                      this.noticeKindList = res.data.arrlist
                      break
                      case 0:
                      this.$Message.error('获取通知类型失败!')
                      break
                      default:
                      this.$Message.error('系统繁忙!')
                    }
                }).catch((error)=> {
                    console.log(error)
                    this.$Message.error('系统繁忙，获取通知类型失败!')
                })
            },
            handleCreateW (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let CreatInfo = {
                          product_id:this.production_ID,
                          fname:this.formCreateW.W_name,
                          fagreement_name:this.formCreateW.W_belongAgm,
                          fwarn_condition:this.formCreateW.W_condition,
                          fwarn_content:this.formCreateW.W_content,
                          fwarn_type:this.formCreateW.W_kind,
                          fnotice_type:this.formCreateW.W_noticeKind,
                          fnotice_fs:this.formCreateW.W_noticeWay,
                          fstatus:this.formCreateW.W_status,
                          fwarn_num :this.formCreateW.choose
                        }
                        //this.modal_loading = true
                        let DATA = {'warnings':CreatInfo}
                        axios.post(R_PRE_URL+'insertwarning',DATA
                        ).then((res)=> {
                            switch(res.data.result){
                              case 1:
                              this.$Message.success('创建新告警规则成功!')
                              this.$store.state.M_CreateWarning = false
                              this.modal_loading = false
                              this.$emit('refreshApplication')
                              break
                              case 2:
                              this.$Message.error('告警规则名称重复!')
                              this.modal_loading = false
                              break
                              case 0:
                              this.$Message.error('创建新告警规则失败!')
                              this.modal_loading = false
                              break
                              default:
                              this.$Message.error('系统繁忙!')
                              this.modal_loading = false
                            }
                        }).catch((error)=> {
                            console.log(error)
                            this.$Message.error('系统繁忙,创建新告警规则失败!')
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
