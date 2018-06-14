<template>
    <div class="ApplicationManagement">
        <!-- 查询 -->
        <Row type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="4">
                <Button type="error" icon="android-add" @click="AddApplication">新建应用</Button>
            </Col>
            <Col span="20" class="TextRight">
                <Input class="InlineBlock" v-model="A_keyword" :clearable="A_keyword==''?false:true" @on-change="ChangeKeyword" placeholder="查找相关应用" style="width: 250px;"></Input>
                <Button type="primary" icon="ios-search" @click="SearchAppliction">查询</Button>
            </Col>
        </Row>
        <!-- 应用列表 -->
        <h2>应用列表</h2>
        <div  class="marginTB_20">
            <p v-if="ApplicationList.length == 0" class="TextCenter">
                <Icon type="social-tux" :size="24"></Icon>
                暂无数据
            </p>
            <Row v-else :gutter="16" class="PaddingLR_10">
                <Col :xs="12" :sm="12" :md="12" :lg="8" class="marginB_20" v-for="(Application,Idx) in ApplicationList">
                    <Card>
                        <p slot="title" style="height: 100%">
                            <img class="SmallImg" :src="Application.apply_icon?Application.apply_icon:'static/img/icon/application.png'">
                        </p>
                        <div slot="extra"  style="width: 150px">
                            <h3 class="Ellipsis">{{Application.apply_name}}</h3>
                            <p class="Ellipsis marginT_10">{{Application.apply_introduction}}</p>
                            <p class="marginT_10">
                                <Icon type="social-android" :size="22" :class="{'colorBlue':Application.android_name}"></Icon> 
                                <Icon type="social-apple" :size="22" :class="{'colorBlue':Application.ios_name}"></Icon>
                            </p>
                        </div>

                        <Button type="text"  icon="ios-search" class="BigIcon" @click="Detail_A(Idx)"></Button>
                        <Button type="text"  icon="compose" class="BigIcon FloatRight" @click="Modify_A(Idx)"></Button>
                    </Card>
                </Col>
            </Row>
        </div>
        <!-- 创建新应用 -->
        <CreateApplication v-on:refreshApplication="Refresh" v-on:refreshProduction="RefreshProduction"/>
        <!-- 编辑应用信息 -->
        <EditApplicaiton :EditInfo="EditInfo" v-on:refreshApplication="Refresh"/>
        <!-- <EditApplicaiton :AppId="AppId" :EditInfo="EditInfo" v-if="ifShow"/> -->
        <!-- 查看应用信息 -->
        <SeeApplicaiton :DetailInfo="DetailInfo"/>
    </div>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateApplication from "./Create/CreateApplicaiton"
import EditApplicaiton from "./Edit/EditApplicaiton"
import SeeApplicaiton from "./See/SeeApplicaiton"
  export default{
    data: function () {
      return {
        modal_loading:false,
        A_keyword:'',
        ApplicationList:[],
        AppId:'',
        EditInfo:'',
        DetailInfo:'',
        formEdit:{
            A_kind:'',
            A_name:'',
            A_introduction:'',
            A_img:'',
            A_android:'',
            A_ios:'',
        },
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
        //this.uploadList = this.$refs.upload.fileList;
      
    },
    created() {
        this.GetApplication()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ifEdit:{
            get: function () {
              return this.$store.state.M_EditApplication
            },
            set: function (newValue) {
              this.$store.state.M_EditApplication = newValue
            }
        },
        // ApplicationList:{
        //     get: function () {
        //       return this.$store.state.ApplicationList
        //     },
        //     set: function (newValue) {
        //       this.$store.state.ApplicationList = newValue
        //     }
        // },
        
      
    },
    watch: {
      
    },
    components: {
        CreateApplication,
        EditApplicaiton,
        SeeApplicaiton
    },
    methods: {
        AddApplication(){
            this.$store.state.M_CreateApplication = true
        },
        //查询
        ChangeKeyword(){
            if(this.A_keyword == ''){
                this.GetApplication()
            }else{
                return false
            }

        },
        Refresh(){
            this.GetApplication()
            this.$emit('refreshApplicationList')
        },
        RefreshProduction(){
            this.$emit('refreshProductionList')
        },
        SearchAppliction(){
            let Keywords = {
                userid:this.ID,
                apply_name:this.A_keyword
            }
            let DATA = {'users':Keywords}
            axios.post(R_PRE_URL+'mohuselectapply',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.ApplicationList = res.data.applylist
                  break
                  case 0:
                  this.$Message.error('获取应用列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        Detail_A(Idx){
            let Info = this.ApplicationList[Idx]
            this.DetailInfo = Info
            this.$store.state.M_SeeApplication = true
        },
        Modify_A(Idx){
             let Info = this.ApplicationList[Idx]
            this.EditInfo = Info
            this.$store.state.M_EditApplication = true
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
              _this.formEdit.A_img = this.result
            } 
        },
        handleEdit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                      applyid:this.AppId,
                      apply_type:this.formEdit.A_kind,
                      apply_name:this.formEdit.A_name,
                      apply_introduction:this.formEdit.A_introduction,
                      apply_icon:this.formEdit.A_img == this.ImgSource?'':this.formEdit.A_img ,
                      Android_name:this.formEdit.A_android,
                      ios_name:this.formEdit.A_ios
                    }
                    //this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'updateapply',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('保存成功!')
                          this.$store.state.M_EditApplication = false
                          this.modal_loading = false
                          break
                          case 0:
                          this.$Message.error('保存失败!')
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
        //获取应用列表
        GetApplication(){
            axios.get(R_PRE_URL+'selectallapply?userid='+this.ID
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.ApplicationList = res.data.applylist
                  break
                  case 0:
                  this.$Message.error('获取应用列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.ApplicationManagement{
    margin-top: 50px;
    .BigIcon{
        font-size: 24px;
    }
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
