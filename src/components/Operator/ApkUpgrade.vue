<template>
    <div class="ApkUpgrade">
        <!-- 没有任何信息 -->
        <!-- <div v-if="ApplicationList.length == 0">
            <Card :bordered="false" dis-hover>
                <div style="text-align:center">
                    <img src="static/img/NoInformation.png">
                    <h3>您还没有创建任何应用</h3>
                    <Button class="marginT_10" type="primary" icon="android-add" @click="ToCreateApplication">创建新应用</Button>
                </div>
            </Card>
        </div> -->
        <!-- 有信息 -->
        <!-- <div v-else> -->
        <div>
            <Row type="flex" justify="space-between" class="code-row-bg">
                <Col span="4"><h2>APK列表</h2></Col>
                <Col span="4" class="TextRight">
                    <Button type="error" icon="android-add" @click="AddAPK">创建新APK</Button>
                </Col>
            </Row>
            <!-- APK列表 -->
            <div  class="BlockWrap marginTB_20">
                <Table border :loading="table_loading" :columns="APKColumns" :data="APKData"></Table>
                <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
            </div>
            <!-- 添加APK -->
            <Modal v-model="ifShowModal" width="600" :mask-closable="false">
                <p slot="header">
                    <Icon type="information-circled"></Icon>
                    <span>创建新APK</span>
                </p>
                <div style="">
                    <Form ref="formCreateApk" :model="formCreateApk" :rules="ruleCreateApk"  :label-width="100">
                        <FormItem prop="name" label="APK名称">
                            <Input type="text" v-model="formCreateApk.name" placeholder="请输入APK名称">
                          </Input>
                        </FormItem>
                        <FormItem prop="version" label="版本号">
                            <Input type="text" v-model="formCreateApk.version" placeholder="请输入版本号">
                          </Input>
                        </FormItem>
                        <FormItem prop="introduction" label="更新说明">
                            <Input type="textarea" :autosize="true" :maxlength='250' v-model="formCreateApk.introduction" placeholder='请输入更新说明（250字以内）...'></Input>
                          </Input>
                        </FormItem>
                        <FormItem label="文件" prop="file">
                            <Upload action="" 
                            :format="['apk']"
                            :on-format-error="handleFormatError"
                            :before-upload="handleBeforeUpload">
                                <Button type="ghost" icon="ios-cloud-upload-outline">选择上传文件</Button>
                            </Upload>
                            <h5 v-if="fileName">已选文件：{{fileName}}</h5>
                        </FormItem>
                    </Form>
                    
                </div>
                <div slot="footer" style="text-align:center">
                    <Button type="error" size="large" :loading="modal_loading" @click="handleCreateApk('formCreateApk')">确定创建</Button>
                </div>
            </Modal>
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
        table_loading:true,
        ifShowModal:false,
        modal_loading:false,
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        fileName:'',
        formCreateApk:{
            name:'',
            version:'',
            introduction:'',
            file:''
        },
        ruleCreateApk: {
            name: [
                { required: true, message: '请输入APK名称', trigger: 'blur' }
            ],
            version: [
                { required: true, message: '请输入版本号', trigger: 'blur' }
            ],
            introduction: [
                { required: true, message: '请输入更新说明', trigger: 'blur' }
            ],
            file: [
                { required: true, message: '请选择需要上传的APK文件', trigger: 'change' }
            ],
        },
        APKColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: 'APK名称',
                key: 'fname'
            },
            {
                title: 'APK版本号',
                key: 'fversion'
            },
            {
                title: '更新说明',
                key: 'fupdateContent'
            },
            {
                title: '创建时间',
                key: 'fcreateTime'
            },
            // {
            //     title: '操作',
            //     key: 'action',
            //     width: 200,
            //     align: 'center',
            //     render: (h, params) => {
            //         return h('Button', {
            //                 props: {
            //                     type: 'error',
            //                     size:'small',
            //                     icon:'android-delete'
            //                 },
            //                 style: {
            //                 },
            //                 on: {
            //                     click: () => {
            //                         this.$Modal.confirm({
            //                         title: '提示',
            //                         content: '<p>确定删除该协议？</p>',
            //                         onOk: () => {
            //                             this.removeAgreement(params.row)
            //                         },
            //                         onCancel: () => {
            //                         }
            //                     });
            //                     }
            //                 }
            //             }, '删除')
            //         ]);
            //     }
            // }
        ],
        APKData:[]
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetApkList()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        ApplicationList:{
            get: function () {
              return this.$store.state.ApplicationList
            },
            set: function (newValue) {
              this.$store.state.ApplicationList = newValue
            }
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        //显示添加modal
        AddAPK(){
            this.ifShowModal = true
        },
        handleFormatError (file) {
            this.$Notice.warning({
                title: '提示',
                desc: '上传的文件格式不正确！'
            });
        },
        // handleMaxSize (file) {
        //     this.$Notice.warning({
        //         title: '提示',
        //         desc: '上传的文件大小不能超过2M！'
        //     });
        // },
        handleBeforeUpload (event) {
            var _this = this
            var file = event
            _this.fileName = file.name
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){
              _this.formCreateApk.file = this.result
            }         
        },
        handleCreateApk(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                      userid:this.ID,
                      apply_id:this.$store.state.CurApplication,
                      fname:this.formCreateApk.name,
                      fversion:this.formCreateApk.version,
                      fupdatecontent:this.formCreateApk.introduction,
                      fcontent:this.formCreateApk.file,
                    }
                    this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'addapk',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('创建APK成功!')
                          this.ifShowModal = false
                          this.modal_loading = false
                          this.GetApkList()
                          break
                          case 0:
                          this.$Message.error('创建APK失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙，创建APK失败!')
                        this.modal_loading = false
                    })
                    
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetApkList()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetApkList()
        },
        //获取APK列表
        GetApkList(){
            let ApkInfo = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':ApkInfo}
            axios.post(R_PRE_URL+'apkdetail',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.APKData = res.data.apkdetail
                  this.Total = res.data.count
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取APK列表失败!')
                  this.table_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.table_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取APK列表失败!')
                this.table_loading = false
            })
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.ApkUpgrade{
    margin-top: 50px;
}
</style>
