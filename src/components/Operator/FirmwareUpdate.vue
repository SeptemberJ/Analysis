<template>
    <div class="FirmwareUpdate">
        <Row type="flex" justify="space-between" class="code-row-bg">
            <Col span="4"><h2>固件列表</h2></Col>
            <Col span="4" class="TextRight">
                <Button type="error" icon="android-add" @click="AddFirmware">创建新固件</Button>
            </Col>
        </Row>
        <!-- APK列表 -->
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="FirmwareColumns" :data="FirmwareData"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
        </div>
        <!-- 添加APK -->
        <Modal v-model="ifShowModal" width="600" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>创建新APK</span>
            </p>
            <div style="">
                <Form ref="formCreateFirmware" :model="formCreateFirmware" :rules="ruleCreateFirmware"  :label-width="100">
                    <FormItem prop="name" label="固件名称">
                        <Input type="text" v-model="formCreateFirmware.name" placeholder="请输入固件名称">
                      </Input>
                    </FormItem>
                    <FormItem prop="version" label="版本号">
                        <Input type="text" v-model="formCreateFirmware.version" placeholder="请输入版本号">
                      </Input>
                    </FormItem>
                    <FormItem label="文件" prop="file">
                        <Upload action="" 
                        :format="['bin']"
                        :on-format-error="handleFormatError"
                        :before-upload="handleBeforeUpload">
                            <Button type="ghost" icon="ios-cloud-upload-outline">选择上传文件</Button>
                        </Upload>
                        <h5 v-if="fileName">已选文件：{{fileName}}</h5>
                    </FormItem>
                </Form>
                
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="handleCreateFirmware('formCreateFirmware')">确定创建</Button>
            </div>
        </Modal>
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
        formCreateFirmware:{
            name:'',
            version:'',
            file:''
        },
        ruleCreateFirmware: {
            name: [
                { required: true, message: '请输入APK名称', trigger: 'blur' }
            ],
            version: [
                { required: true, message: '请输入版本号', trigger: 'blur' }
            ],
            file: [
                { required: true, message: '请选择需要上传的APK文件', trigger: 'change' }
            ],
        },
        FirmwareColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '固件名称',
                key: 'fname'
            },
            {
                title: '固件版本号',
                key: 'fversion'
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
        FirmwareData:[]
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetFirmwareList()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        //显示添加modal
        AddFirmware(){
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
              _this.formCreateFirmware.file = this.result
            }         
        },
        //创建固件
        handleCreateFirmware(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let CreatInfo = {
                      user_id:this.ID,
                      product_id:this.$store.state.CurProduction,
                      fname:this.formCreateFirmware.name,
                      fversion:this.formCreateFirmware.version,
                      fcontent:this.formCreateFirmware.file,
                    }
                    this.modal_loading = true
                    let DATA = {'users':CreatInfo}
                    axios.post(R_PRE_URL+'addfirmware',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('创建新固件成功!')
                          this.ifShowModal = false
                          this.modal_loading = false
                          this.GetFirmwareList()
                          break
                          case 0:
                          this.$Message.error('创建新固件失败!')
                          this.modal_loading = false
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙，创建新固件失败!')
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
          this.GetFirmwareList()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetFirmwareList()
        },
        //获取固件列表
        GetFirmwareList(){
            let FirmwareInfo = {
                userid:this.ID,
                product_id:this.$store.state.CurProduction,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':FirmwareInfo}
            axios.post(R_PRE_URL+'firmware',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.FirmwareData = res.data.firmware
                  this.Total = res.data.count
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取固件列表失败!')
                  this.table_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.table_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取固件列表失败!')
                this.table_loading = false
            })
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.FirmwareUpdate{
    margin-top: 50px;
}
</style>
