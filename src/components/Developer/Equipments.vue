<template>
	<div class="Equipments">
		<!-- 查询 -->
        <Row type="flex" justify="space-between" class="code-row-bg marginTB_40">
            <Col span="24"  class="TextRight">
                <Button type="error" icon="android-add" @click="AddEquipment">新增设备</Button>
                <Button type="primary" icon="ios-download" @click="ImportEquipment">导入设备</Button>
            </Col>
        </Row>
        <!-- 导入设备 -->
        <Modal v-model="ifReadExcel" :mask-closable="false" width="500">
            <p slot="header" style="text-align:left">
                <span>导入设备</span>
            </p>
            <div style="text-align:left">
              <Form ref="formImport" :model="formImport" :rules="ruleImport" :label-width="120">
                <FormItem label="导入的excel：" prop="xlsFile">
                  <Upload 
                  :format="['xlsx','xls']"
                  :on-format-error="handleFormatError"
                  :before-upload="handleBeforeUpload"
                   action="">
                      <Button type="ghost" icon="ios-cloud-upload-outline">选择文件</Button>
                  </Upload>
                  <span v-if="file !== null">文件名: {{ file.name }}</span>
                    
                </FormItem>
                <FormItem label="模板下载：" prop="xlsMoban">
                    <a href="http://222.44.17.8:8085/images/AddEquipmentTemplate.xls">设备导入模板</a>
                </FormItem>
              </Form>
            </div>
            <div slot="footer">
                <Button type="error" size="large"  :loading="modal_loading" @click="upload">导入</Button>
            </div>
        </Modal>
        <!-- 新增设备 -->
        <Modal v-model="ifAdd" :mask-closable="false" width="500">
            <p slot="header" style="text-align:left">
                <span>新增设备</span>
            </p>
            <div style="">
                <Form ref="formCreateE" :model="formCreateE" :rules="ruleCreateE"  label-position="left" :label-width="100">
                    <FormItem label="设备编码" prop="Equ_code">
                        <Input v-model="formCreateE.Equ_code"></Input>
                    </FormItem>
                    <FormItem label="设备ID" prop="Equ_id">
                        <Input v-model="formCreateE.Equ_id"></Input>
                    </FormItem>
                    <FormItem label="设备类型" prop="Equ_sensortype">
                        <Input v-model="formCreateE.Equ_sensortype"></Input>
                    </FormItem>
                </Form>
                <span>(设备类型详见导入文件说明)</span>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large"  :loading="modal_loading" @click="handleCreateE">确定创建</Button>
            </div>
        </Modal>
        <!-- 编辑设备 -->
        <Modal v-model="ifEdit" :mask-closable="false" width="500">
            <p slot="header" style="text-align:left">
                <span>编辑设备</span>
            </p>
            <div style="">
                <Form ref="EditInfo" :model="EditInfo" :rules="ruleEditE"  label-position="left" :label-width="100">
                    <FormItem label="设备编码" prop="machine_code">
                        <Input disabled v-model="EditInfo.machine_code"></Input>
                    </FormItem>
                    <FormItem label="设备ID" prop="machine_id">
                        <Input disabled v-model="EditInfo.machine_id"></Input>
                    </FormItem>
                    <FormItem label="设备类型" prop="sensortype">
                        <Input v-model="EditInfo.sensortype"></Input>
                    </FormItem>
                </Form>
                <span>(设备类型详见导入文件说明)</span>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large"  :loading="modal_loading" @click="handleEditE">保存</Button>
            </div>
        </Modal>
        <!-- 设备列表 -->
        <h2>设备列表</h2>
        <div  class="marginTB_20">
            <Table border :loading="table_loading" :columns="EquipmentColumns" :data="EquipmentData"></Table>
            <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
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
      	ifAdd:false,
      	table_loading: false,
        ifReadExcel: false,
        ifEdit: false,
        modal_loading:false,
        file:null,
        EditInfo:{
            machine_code:'',
            machine_id:'',
            sensortype:'',
        },
        //EditInfo:'',
        formImport: {
	        xlsFile: '',
	        xlsMoban:''
	    },
        Total:10,
        page_num:1,  //页数
        number:10,   //每页条数
        formCreateE:{
        	Equ_code:'',
        	Equ_id:'',
        	Equ_sensortype:''
        },
        ruleCreateE: {
            Equ_code: [
                { required: true, message: '设备编码不能为空', trigger: 'blur' }
            ],
            Equ_sensortype: [
                { required: true, message: '设备类型不能为空', trigger: 'blur' }
            ],
        },
        ruleEditE: {
            sensortype: [
                { required: true, message: '设备编码不能为空', trigger: 'blur' }
            ],
        },
        EquipmentColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '设备编号',
                key: 'machine_code'
            },
            {
                title: '设备ID',
                key: 'machine_id'
            },
            {
                title: '设备类别',
                key: 'sensortype'
            },
            {
                title: '操作',
                key: 'action',
                width: 200,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size:'small',
                                icon:'compose'
                            },
                            style: {
                                marginRight: '20px',
                            },
                            on: {
                                click: () => {
                                    this.editEquipment(params.row)
                                }
                            }
                        }, '编辑'),
                        h('Button', {
                            props: {
                                type: 'error',
                                size:'small',
                                icon:'android-delete'
                            },
                            style: {
                            },
                            on: {
                                click: () => {
                                    this.$Modal.confirm({
                                    title: '提示',
                                    content: '<p>确定删除该设备？</p>',
                                    onOk: () => {
                                        this.removeEquipment(params.row)
                                    },
                                    onCancel: () => {
                                    }
                                });
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        EquipmentData:[],
        ruleImport: {
	        xlsFile: [
	            { required: true, message: '请选择导入的xls文件', trigger: 'blur' }
	        ]
	    },
      }
    },
    mounted: function () {
      
    },
    created() {
        this.getAllEquipment(this.ID,1,10)
      
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
        AddEquipment(){
        	this.ifAdd = true
        },
        //导入
        ImportEquipment(){
			this.ifReadExcel = true
        },
        handleFormatError(file) {
            this.file = null;
            this.$Notice.warning({
                title: '文件格式错误',
                desc: '文件 ' + file.name + ' 格式不对.'
            });
        },
        handleBeforeUpload (file) {
            this.file = file;
            //return false;
        },
        upload () {
            if(!this.file){
                this.$Message.error('请选择要导入的文件!')
            return false
            }
            let formData = new FormData();
            formData.append('filename', this.file);
            let config = {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
            axios.post(R_PRE_URL+'importXls?take_user='+ this.ID,formData,config
            ).then((res)=> {
                switch(res.data.message.length){
                    case 0:
                    this.$Message.success('导入成功!')
                    this.ifReadExcel = false
                    break
                    default:
                    let Message = ''
                    res.data.message.map((item ,idx)=>{
                        Message = Message + item + ','
                    })
                    this.$Message.warning('以下机器编号已存在：' + Message)
                    this.ifReadExcel = false
                }
            }).catch((error)=> {
            console.log(error)
            })
        },

    	//分页
        changePage(event){
          this.page_num = event
          this.getAllEquipment(this.ID,event,this.number)
        },

        //切换每页条数
        changePageSize(event){
          this.number = event
          this.getAllEquipment(this.ID,this.page_num,event)
        },
        //手动添加设备
        handleCreateE(){
        	if(this.formCreateE.Equ_code == ''){
                this.$Message.error('请输入设备编码!')
        		return false
        	}
            if(this.formCreateE.Equ_sensortype == ''){
                this.$Message.error('请输入设备类型!')
                return false
            }
        	let info = {
        		take_user: this.ID,
        		machine_id: this.formCreateE.Equ_id,
        		machine_code: this.formCreateE.Equ_code,
        		sensortype: this.formCreateE.Equ_sensortype,
        	}
        	let DATA = {'devices':info}
        	axios.post(R_PRE_URL+'insertdevice',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.$Message.success('新增设备成功!')
                  this.ifAdd = false
                  this.getAllEquipment(this.ID,1,this.number)
                  break
                  case 2:
                  this.$Message.error('该设备编号已存在!')
                  this.modal_loading = false
                  break
                  case 0:
                  this.$Message.error('新增设备失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，新增设备失败!')
                this.modal_loading = false
            })
        },
        //获取所有设备
        getAllEquipment(ID,PAGE,NUMBER){
            let info = {
                take_user:ID,//this.ID,
                page:PAGE,//this.page_num,
                number:NUMBER,//this.number
            }
            let DATA = {'users':info}
            axios.post(R_PRE_URL+'selectmachinetake',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.EquipmentData = res.data.machinetakelist
                  this.Total = res.data.count
                  this.modal_loading = false
                  break
                  case 0:
                  this.$Message.error('获取设备列表失败!')
                  this.modal_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取设备列表失败!')
                this.modal_loading = false
            })
        },
        //编辑
        editEquipment(Info){
            console.log(Info)
            this.ifEdit = true
            this.EditInfo = Info
        },
        //保存编辑
        handleEditE(){
            if(this.EditInfo.sensortype == ''){
                this.$Message.error('请输入设备类型!')
                return false
            }
            let info = {
                id: this.EditInfo.id,
                take_user: this.ID,
                // machine_id: this.EditInfo.machine_id,
                // machine_code: this.EditInfo.machine_code,
                sensortype: this.EditInfo.sensortype,
            }
            let DATA = {'users':info}
            axios.post(R_PRE_URL+'updatemachinetake',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.$Message.success('修改设备信息成功!')
                  this.ifEdit = false
                  this.modal_loading = false
                  this.getAllEquipment(this.ID,this.page_num,this.number)
                  break
                  case 2:
                  this.$Message.error('该设备编号已存在!')
                  this.modal_loading = false
                  break
                  case 0:
                  this.$Message.error('修改设备信息失败!')
                  this.modal_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，修改设备信息失败!')
                this.modal_loading = false
            })
        },
        removeEquipment(Info){
            axios.get(R_PRE_URL+'deletemachinetake?id=' + Info.id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.$Message.success('删除设备成功!')
                  this.ifEdit = false
                  this.modal_loading = false
                  this.getAllEquipment(this.ID,this.page_num,this.number)
                  break
                  case 0:
                  this.$Message.error('删除设备失败!')
                  this.modal_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，删除设备失败!')
                this.modal_loading = false
            })
        },

    },
  }
</script>
<style lang="scss" scoped>
.Equipments{
    margin-top: 50px;
}
</style>