<template>
    <!-- 创建新应用 -->
    <Modal v-model="ifShowModal" width="600" :mask-closable="false" @on-visible-change="ChangeVisible">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>修改应用信息</span>
        </p>
        <div style="">
            <Form ref="formEdit" :model="formEdit" :rules="ruleEdit"  label-position="left" :label-width="120">
                <FormItem label="应用分类" prop="A_kind">
                    <Select v-model="formEdit.A_kind" placeholder="请选择应用类别">
                        <Option value="智能家居">智能家居</Option>
                        <Option value="智慧社区">智慧社区</Option>
                        <Option value="智能硬件">智能硬件</Option>
                    </Select>
                </FormItem>
                <FormItem label="应用名称" prop="A_name">
                    <Input v-model="formEdit.A_name"></Input>
                </FormItem>
                <FormItem label="应用说明" prop="A_introduction">
                    <Input v-model="formEdit.A_introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入应用说明"></Input>
                </FormItem>
                <FormItem label="应用图标" prop="A_img">
                    <div class="demo-upload-list">
                        <template>
                            <img :src="formEdit.A_img?formEdit.A_img:'/static/img/icon/application.png'">
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
                <FormItem label="Android应用包名" prop="A_android">
                    <Input v-model="formEdit.A_android" placeholder="请输入应用包名（50字以内）"></Input>
                </FormItem>
                <FormItem label="iOS应用包名" prop="A_ios">
                    <Input v-model="formEdit.A_ios" placeholder="请输入Bundle Id（50字以内）"></Input>
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="error" size="large" :loading="modal_loading" @click="handleEdit('formEdit')">保存</Button>
            <Button type="primary" size="large"  @click="DeleteApplication()">删除</Button>
        </div>
    </Modal>
        
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
        ImgSource:'',
        ruleEdit: {
            A_kind: [
                { required: true, message: '请选择应用类别', trigger: 'change' }
            ],
            A_name: [
                { required: true, message: '应用名称不能为空', trigger: 'blur' }
            ],
        }
      }
    },
    mounted() {
      
    },
    created() {
        console.log('EditInfo---')
        console.log(this.EditInfo)
        //this.GetApplicationInfo()
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_EditApplication
            },
            set: function (newValue) {
              this.$store.state.M_EditApplication = false
            }
        },
        // Tit(){
        //     return this.EditInfo
        // }

        formEdit(){
            let Info = {
                A_kind : this.EditInfo.apply_type,
                A_name : this.EditInfo.apply_name,
                A_introduction : this.EditInfo.apply_introduction,
                A_img : this.ImgSource?this.ImgSource:this.EditInfo.apply_icon,
                A_android : this.EditInfo.android_name,
                A_ios : this.EditInfo.ios_name,
            }
            return Info
        }
        
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        ChangeVisible(e){
            this.$store.state.M_EditApplication = e
            //console.log(this.$store.state.M_EditApplication)
        },
        DeleteApplication(){
            this.$Modal.confirm({
                    title: '删除提醒',
                    content: '<p>确定删除该应用？</p>',
                    onOk: () => {
                        axios.get(R_PRE_URL+'deleteapply?id='+this.EditInfo.id
                        ).then((res)=> {
                            switch(res.data.result){
                              case 1:
                              this.$Message.success('应用删除成功!')
                              this.$store.state.M_EditApplication = false
                              this.$emit('refreshApplication')
                              break
                              case 0:
                              this.$Message.error('删除应用失败!')
                              break
                              default:
                              this.$Message.error('系统繁忙!')
                            }
                        }).catch((error)=> {
                            console.log(error)
                        })
                    },
                    onCancel: () => {
                    }
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
                _this.ImgSource = this.result
              //_this.formEdit.A_img = this.result
            } 
        },
        handleEdit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                      applyid:this.EditInfo.id,
                      apply_type:this.formEdit.A_kind,
                      apply_name:this.formEdit.A_name,
                      apply_introduction:this.formEdit.A_introduction,
                      apply_icon:this.ImgSource?this.ImgSource:'' ,
                      // apply_icon:this.formEdit.A_img == this.ImgSource?'':this.formEdit.A_img ,
                      Android_name:this.formEdit.A_android,
                      ios_name:this.formEdit.A_ios
                    }
                    this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'updateapply',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('应用信息修改成功!')
                          this.$store.state.M_EditApplication = false
                          this.modal_loading = false
                          this.$emit('refreshApplication')
                          break
                          case 0:
                          this.$Message.error('应用信息修改失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙，应用信息修改失败!')
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
