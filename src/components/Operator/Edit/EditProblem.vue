<template>
    <div>
        <!-- 编辑问题 -->
        <Modal v-model="ifShowModal" width="600" :mask-closable="false">
            <p slot="header">
                <Icon type="help-circled"></Icon>
                <span>编辑问题</span>
            </p>
            <div style="">
                <Form ref="formEditProblem" :model="formEditProblem" :rules="ruleEditProblem"  label-position="left" :label-width="100">
                    <FormItem label="类型" prop="kind">
                        <Select v-model="formEditProblem.kind" placeholder="请选问题类型">
                            <Option v-for="item in ProblemKindList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="问题" prop="question">
                        <Input type="textarea" :autosize="{minRows: 2,maxRows: 3}" :maxlength='50' v-model="formEditProblem.question" placeholder='请输入问题（50字以内）...'></Input>
                    </FormItem>
                    <FormItem label="答案" prop="answer">
                      <Input type="textarea" :autosize="{minRows: 5,maxRows: 5}" :maxlength='250' v-model="formEditProblem.answer" placeholder='请输入问题答案（250字以内）...'></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="handleEditProblem('formEditProblem')">确定创建</Button>
            </div>
        </Modal>

    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"

  export default{
    props:['EditInfo'],
    data: function () {
      return {
        modal_loading:false,
        ProblemKindList:[{'name':'常见问题'},{'name':'基础知识'}],
        ruleEditProblem: {
            kind: [
                { required: true, message: '请选择问题类型', trigger: 'change' }
            ],
            question: [
                { required: true, message: '请输入问题', trigger: 'blur' }
            ],
            answer: [
                { required: true, message: '请输入问题答案', trigger: 'blur' }
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
              return this.$store.state.M_EditProblem
            },
            set: function (newValue) {
              this.$store.state.M_EditProblem = false
            }
        },
        formEditProblem(){
            let Info = {
                kind:this.EditInfo.fproblemtype,
                question:this.EditInfo.fproblem,
                answer:this.EditInfo.fproblempass
            }
            return Info
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
      //编辑常见问题
        handleEditProblem (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                  let EditInfo = {
                    id:this.EditInfo.id,
                    userid:this.ID,
                    apply_id:this.$store.state.CurApplication,
                    fproblem_type:this.formEditProblem.kind,
                    fproblem:this.formEditProblem.question,
                    fproblempass:this.formEditProblem.answer
                  }
                  this.modal_loading = true
                  let DATA = {'users':EditInfo}
                  axios.post(R_PRE_URL+'updatepro',DATA
                  ).then((res)=> {
                      switch(res.data.result){
                        case 1:
                        this.$Message.success('修改问题成功!')
                        this.modal_loading = false
                        this.$store.state.M_EditProblem = false
                        this.$emit('refreshProblem')
                        break
                        case 0:
                        this.$Message.error('修改问题失败!')
                        this.modal_loading = false
                        break
                        default:
                        this.$Message.error('系统繁忙!')
                        this.modal_loading = false
                      }
                  }).catch((error)=> {
                      console.log(error)
                      this.$Message.error('系统繁忙,修改问题失败!')
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
