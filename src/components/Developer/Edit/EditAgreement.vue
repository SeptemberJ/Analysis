<template>
    <!-- 创建新应用 -->
    <Modal v-model="ifShowModal" width="700" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>编辑协议信息</span>
        </p>
        <div style="">
            <Form ref="formEdit" :model="formEdit" :rules="ruleCreate"  label-position="left" :label-width="100">
                <Tag type="dot" color="yellow">协议信息</Tag>
                <FormItem label="所属产品">
                    <Select v-model="P_belongKind" disabled placeholder="请选择应用类别">
                        <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="协议名称" prop="Agm_name">
                    <Input v-model="formEdit.Agm_name"></Input>
                </FormItem>
                <FormItem label="双向/单向" prop="Agm_T2I">
                    <RadioGroup v-model="formEdit.Agm_T2I">
                        <Radio label="双向指令" disabled></Radio>
                        <Radio label="下发指令" disabled></Radio>
                        <Radio label="上报指令" disabled></Radio>
                    </RadioGroup>
                </FormItem>

                <Row v-if="formEdit.Agm_T2I == '双向指令'">
                    <Col span="10">
                        <Tag type="dot" color="yellow">下发设备</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_D">
                            <Input disabled v-model="formEdit.Agr_functionCode_D" placeholder='（格式为10xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_D">
                            <Select v-model="formEdit.Agr_dataType_D">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_D">
                            <Input disabled v-model="formEdit.Agr_byte_D" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_D">
                            <Input v-model="formEdit.Agr_unitSymbol_D"  placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_D">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formEdit.Agr_describe_D" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                    <Col span="10" offset="4">
                        <Tag type="dot" color="yellow">设备上报</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_U">
                            <Input disabled v-model="formEdit.Agr_functionCode_U"  placeholder='（格式为18xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_U">
                            <Select v-model="formEdit.Agr_dataType_U">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_U">
                            <Input disabled v-model="formEdit.Agr_byte_U" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_U">
                            <Input v-model="formEdit.Agr_unitSymbol_U" placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_U">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formEdit.Agr_describe_U" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formEdit.Agm_T2I == '下发指令'">
                    <Col span="12">
                        <Tag type="dot" color="yellow">下发设备</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_D">
                            <Input disabled v-model="formEdit.Agr_functionCode_D" placeholder='（格式为10xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_D">
                            <Select v-model="formEdit.Agr_dataType_D">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_D">
                            <Input disabled v-model="formEdit.Agr_byte_D" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_D">
                            <Input v-model="formEdit.Agr_unitSymbol_D"  placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_D">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formEdit.Agr_describe_D" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row v-if="formEdit.Agm_T2I == '上报指令'">
                    <Col span="12">
                        <Tag type="dot" color="yellow">设备上报</Tag>
                        <FormItem label="功能码" prop="Agr_functionCode_U">
                            <Input disabled v-model="formEdit.Agr_functionCode_U"  placeholder='（格式为18xx）'></Input>
                        </FormItem>
                        <FormItem label="数据类型" prop="Agr_dataType_U">
                            <Select v-model="formEdit.Agr_dataType_U">
                                <Option v-for="item in dataTypeList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="字节数" prop="Agr_byte_U">
                            <Input disabled v-model="formEdit.Agr_byte_U" placeholder='请填写字节数'></Input>
                        </FormItem>
                        <FormItem label="单位符号" prop="Agr_unitSymbol_U">
                            <Input v-model="formEdit.Agr_unitSymbol_U" placeholder='请填写单位符号'></Input>
                        </FormItem>
                        <FormItem label="描述" prop="Agr_describe_U">
                            <Input type="textarea" :autosize="true" :maxlength='100' v-model="formEdit.Agr_describe_U" placeholder='请输入协议说明（100字以内）...'></Input>
                        </FormItem>
                    </Col>
                </Row>
                
                
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large" :loading="modal_loading" @click="handleEdit('formEdit')">确定创建</Button>
            <Button type="primary" size="large"  @click="Next()">下一步</Button>
        </div>
    </Modal>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
  export default{
    props:['EditInfo','CurProduction','Productions'],
    data: function () {
      return {
        modal_loading:false,
        // formEdit:{
        //     Agm_name:'',
        //     Agm_T2I:'双向指令',
        //     Agr_functionCode_U:'',
        //     Agr_dataType_U:'',
        //     Agr_byte_U:'',
        //     Agr_unitSymbol_U:'',
        //     Agr_describe_U:'',
        //     Agr_functionCode_D:'',
        //     Agr_dataType_D:'',
        //     Agr_byte_D:'',
        //     Agr_unitSymbol_D:'',
        //     Agr_describe_D:'',
        // },
        ruleCreate: {
            A_kind: [
                { required: true, message: '请选择应用类别', trigger: 'change' }
            ],
            A_name: [
                { required: true, message: '应用名称不能为空', trigger: 'blur' }
            ],
        },
        dataTypeList:[]
      }
    },
    mounted() {
      
    },
    created() {
        this.GetDataType()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_EditAgreement
            },
            set: function (newValue) {
              this.$store.state.M_EditAgreement = false
            }
        },
        ProductionList(){
            return this.Productions
        },
        P_belongKind: {
            get: function () {
              return this.CurProduction
            },
            set: function (newValue) {
              this.CurProduction = newValue
            }
        },
        formEdit(){
            let Info = {
                Agm_name:this.EditInfo.agreement_name,
                Agm_T2I:this.EditInfo.double_or_single,
                Agr_functionCode_U:this.EditInfo.function_code_upper,
                Agr_dataType_U:this.EditInfo.data_kind_upper,
                Agr_byte_U:this.EditInfo.byte_upper,
                Agr_unitSymbol_U:this.EditInfo.unit_symbol_upper,
                Agr_describe_U:this.EditInfo.describe_upper,
                Agr_functionCode_D:this.EditInfo.function_code_lower,
                Agr_dataType_D:this.EditInfo.data_kind_lower,
                Agr_byte_D:this.EditInfo.byte_lower,
                Agr_unitSymbol_D:this.EditInfo.unit_symbol_lower,
                Agr_describe_D:this.EditInfo.describe_lower,
            }
            return Info
        }
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
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
        handleEdit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let EditInfo = {
                      agreement_id:this.EditInfo.id,
                      product_id:this.CurProduction,
                      agreement_name:this.formEdit.Agm_name,
                      double_or_single:this.formEdit.Agm_T2I,
                      function_code_lower:this.formEdit.Agr_functionCode_D,
                      data_kind_lower:this.formEdit.Agr_dataType_D,
                      byte_lower:this.formEdit.Agr_byte_D,
                      Unit_symbol_lower:this.formEdit.Agr_unitSymbol_D,
                      describe_lower:this.formEdit.Agr_describe_D,
                      function_code_upper:this.formEdit.Agr_functionCode_U,
                      data_kind_upper:this.formEdit.Agr_dataType_U,
                      byte_upper:this.formEdit.Agr_byte_U,
                      Unit_symbol_upper:this.formEdit.Agr_unitSymbol_U,
                      describe_upper:this.formEdit.Agr_describe_U,
                    }
                    this.modal_loading = true
                    let DATA = {'users':EditInfo}
                    axios.post(R_PRE_URL+'updateagreement',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('修改协议信息成功!')
                          this.$store.state.M_EditAgreement = false
                          this.modal_loading = false
                          this.$emit('refreshApplication')
                          break
                          case 2:
                          this.$Message.error('协议名称重复!')
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('修改协议信息失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙,修改协议信息失败!')
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
