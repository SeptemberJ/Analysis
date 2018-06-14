<template>
    <!-- 创建新应用 -->
    <Modal v-model="ifShowModal" width="700" :mask-closable="false">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>创建新告警规则</span>
        </p>
        <div style="">
            <Form ref="formEdit" :model="formEdit" :rules="ruleEdit"  label-position="left" :label-width="100">
                <Tag type="dot" color="yellow">规则信息</Tag>
                <FormItem label="所属产品">
                    <Select v-model="W_belongKind" disabled placeholder="请选择所属产品">
                        <Option v-for="item in ProductionList" :value="item.id" :key="item.id">{{ item.product_name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="规则名称" prop="W_name">
                    <Input v-model="formEdit.W_name"></Input>
                </FormItem>
                <FormItem label="所属协议" prop="W_belongAgm">
                    <Select v-model="formEdit.W_belongAgm" placeholder="请选择所属协议">
                        <Option v-for="item in AgreementList" :value="item.agreement_name" :key="item.id">{{ item.agreement_name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="告警条件" prop="W_condition">
                    <Row type="flex" justify="space-between" class="code-row-bg">
                        <Col span="6">
                            <Input disabled value='数据值'></Input>
                        </Col>
                        <Col span="6">
                            <Select v-model="formEdit.choose">
                                <Option v-for="item in chooseList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                            </Select>
                        </Col>
                        <Col span="6">
                            <Input v-model="formEdit.W_condition"></Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="告警内容" prop="W_content">
                    <Input type="textarea" :autosize="true" :maxlength='250' v-model="formEdit.W_content" placeholder='请输入告警内容（250字以内）...'></Input>
                </FormItem>
                <FormItem label="告警类型" prop="W_kind">
                    <Select v-model="formEdit.W_kind" style="width:200px">
                        <Option v-for="item in kindList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="通知类型" prop="W_noticeKind">
                    <Select v-model="formEdit.W_noticeKind" style="width:200px">
                        <Option v-for="item in noticeKindList" :value="item.typename" :key="item.typename">{{ item.typename }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="通知方式" prop="W_noticeWay">
                    <RadioGroup v-model="formEdit.W_noticeWay">
                        <Radio label="极光推送"></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="状态" prop="W_status">
                    <RadioGroup v-model="formEdit.W_status" @on-change="RadioChange">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用"></Radio>
                    </RadioGroup>
                </FormItem>

                
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
    props:['EditInfo','CurProduction','Productions','Agreements'],
    data: function () {
      return {
        modal_loading:false,
        // formEdit:{
        //     W_name:'',
        //     W_belongAgm:'',
        //     choose:'小于',
        //     W_condition:'',
        //     W_content:'',
        //     W_kind:'',
        //     W_noticeKind:'',
        //     W_noticeWay:'极光推送',
        //     W_status:'启用',
        // },
        ruleEdit: {
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
            ],
            
        },
        chooseList:[{"value":"小于"},{"value":"等于"},{"value":"大于"},{"value":"小于等于"},{"value":"大于等于"},{"value":"不等于"}],
        kindList:[],
        noticeKindList:[],
      }
    },
    mounted() {
      
    },
    created() {
        this.GetWarningKind()
        this.GetNoticeKind()
        
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_EditWarning
            },
            set: function (newValue) {
              this.$store.state.M_EditWarning = false
            }
        },
        AgreementList(){
            return this.Agreements
        },
        ProductionList(){
            return this.Productions
        },
        W_belongKind: {
            get: function () {
              return this.CurProduction
            },
            set: function (newValue) {
              this.CurProduction = newValue
            }
        },
        formEdit(){
            let Info = {
                W_name:this.EditInfo.fname,
                W_belongAgm:this.EditInfo.fagreement_name,
                choose:this.EditInfo.fwarn_num,
                W_condition:this.EditInfo.fwarn_condition,
                W_content:this.EditInfo.fwarn_content,
                W_kind:this.EditInfo.fwarn_type,
                W_noticeKind:this.EditInfo.fnotice_type,
                W_noticeWay:this.EditInfo.fnotice_fs,
                W_status:this.EditInfo.fstatus,
            }
            return Info
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
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
        RadioChange(Item){
            this.EditInfo.fstatus = Item
        },
        handleEdit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                        warningid:this.EditInfo.id,
                        product_id:this.CurProduction,
                        fname:this.formEdit.W_name,
                        fagreement_name:this.formEdit.W_belongAgm,
                        fwarn_condition:this.formEdit.W_condition,
                        fwarn_content:this.formEdit.W_content,
                        fwarn_type:this.formEdit.W_kind,
                        fnotice_type:this.formEdit.W_noticeKind,
                        fnotice_fs:this.formEdit.W_noticeWay,
                        fstatus:this.formEdit.W_status,
                        fwarn_num :this.formEdit.choose
                    }
                    this.modal_loading = true
                    let DATA = {'warnings':CreatInfo}
                    axios.post(R_PRE_URL+'updatewarning',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('修改告警规则成功!')
                          this.$store.state.M_EditWarning = false
                          this.modal_loading = false
                          this.$emit('refreshApplication')
                          break
                          case 2:
                          this.$Message.error('告警规则名称重复!')
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('修改告警规则失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙,修改告警规则失败!')
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
