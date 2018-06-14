<template>
    <div class="DebugEquipment">
        <h2>设备调试</h2>
        <div  class="BlockWrap marginTB_20">
            <Row class="marginTB_20">
                <Col span="6" class="PaddingLR_10">
                    <Form :label-width="0">
                        <FormItem>
                            <Select v-model="cur_application" @on-change="Change_cur_application" placeholder="请选择当前应用">
                                <Option v-for="(item,idx) in ApplicationList" :value="item.id" :key="item.id">{{item.apply_name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Select v-model="cur_production" @on-change="Change_cur_production" placeholder="请选择当前产品">
                                <Option v-for="(item,idx) in ProductionList" :value="item.id" :key="item.id">{{item.product_name}}</Option>
                            </Select>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="24">
                                    <Button type="dashed" long @click="handleAdd" icon="plus-round">添加设备</Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem
                                v-for="(item, index) in equipmentList"
                                :key="index"
                                :prop="'items.' + index + '.value'">
                            <Row class="BgDarkBlue colorWhite PaddingLR_10">
                                <Col span="24" class="TextRight">
                                    <span class="cursorPointer" @click="handleRemove(item.id)"><Icon type="close-circled"></Icon></span>
                                </Col>
                                <Col span="20">
                                    <h3  class="Ellipsis">{{item.debugname}}</h3>
                                </Col>
                                <Col span="20">
                                    <p>{{item.mac}}</p>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem v-if="equipmentList.length<1">
                            <h2 class="TextCenter"><Icon type="social-tux"></Icon> 暂无数据</h2>
                        </FormItem>
                    </Form>
                </Col>
                <Col span="17" offset="1">
                    <Row class="PaddingLR_10">
                        <Col span="24">
                            <h2>调试反馈内容</h2>
                            <div style="width: 100%;height: 200px;background: #eee;margin: 20px 0;"></div>
                        </Col>
                        <Col span="24" class="marginTB_20">
                            <Table :columns="columnsAgreement" :data="dataAgreement"></Table>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <!-- 添加调试设备 -->
        <Modal v-model="modalEquipment" width="700" :mask-closable="false">
            <p slot="header">
                <Icon type="information-circled"></Icon>
                <span>添加设备</span>
            </p>
            <div>
                <Form ref="formEquipment" :model="formEquipment" :rules="ruleEquipment" :label-width="80">
                    <FormItem label="名称" prop="name">
                        <Input v-model="formEquipment.name" placeholder="请输入设备名称（20字以内）"></Input>
                    </FormItem>
                    <FormItem label="mac" prop="mac">
                        <Input v-model="formEquipment.mac" placeholder="请输入设备mac（长度为12）"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align:center">
                <Button type="error" size="large" :loading="modal_loading" @click="addEquipment('formEquipment')">提交</Button>
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
        modal_loading:false,
        modalEquipment:false,
        // cur_application:'',
        // cur_production:'',
        //ApplicationList:[],  //所有应用
        ProductionList:[],  //当前应用对应所有产品
        index: 1,
        formEquipment:{
            name:'',
            mac:''
        },
        ruleEquipment: {
            name: [
                { required: true, message: '请输入设备名称', trigger: 'blur' }
            ],
            mac: [
                { required: true, message: '请输入设备mac', trigger: 'blur' }
            ],
        },
        equipmentList:[],
        columnsAgreement:[
            {
                title: '功能码(下发设备)',
                key: 'function_code_lower'
            },
            {
                title: '指令说明',
                key: 'describe_lower'
            },
            {
                title: '数据类型',
                key: 'data_kind_lower'
            },
            {
                title: '字节数',
                key: 'byte_lower'
            },
            {
                title: '调试数据',
                key: 'sendData',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('input', {
                            style: {
                                width: '100px'
                            },
                            on: {
                                change: (e) => {
                                    this.changeSendData(params.index,e.target.value)
                                }
                            }
                        }, '')
                    ]);
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            on: {
                                click: () => {
                                    this.send(params.index)
                                }
                            }
                        }, '发送')
                    ]);
                }
            }

        ],
        dataAgreement:[],
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetProduction(this.cur_application)
        //this.GetApplication()
      
    },
    computed: {
        ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        },
        cur_application: {
            get: function () {
              return this.$store.state.CurApplication
            },
            set: function (newValue) {
              this.$store.state.CurApplication = newValue
            }
        },
        cur_production: {
            get: function () {
              return this.$store.state.CurProduction
            },
            set: function (newValue) {
              this.$store.state.CurProduction = newValue
            }
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
        //切换当前应用获取对应产品
        Change_cur_application(Value){
            this.GetProduction(Value)
        },
        Change_cur_production(Value){
            this.GetEquipment(Value)
            this.GetAgreementInfo(Value)
        },
        //获取所有应用
        // GetApplication(){
        //     axios.get(R_PRE_URL+'selectallapply?userid='+this.ID
        //     ).then((res)=> {
        //         switch(res.data.result){
        //           case 1:
        //           if(res.data.applylist[0]){
        //             this.cur_application = this.$store.state.CurApplication == ''?res.data.applylist[0].id:this.$store.state.CurApplication
        //             this.ApplicationList = res.data.applylist
        //             this.GetProduction(this.cur_application)
        //           }else{
        //             this.cur_application = ''
        //           }
        //           break
        //           case 0:
        //           this.$Message.error('获取应用列表失败!')
        //           break
        //           default:
        //           this.$Message.error('系统繁忙!')
        //           this.modal_loading = false
        //         }
        //     }).catch((error)=> {
        //         console.log(error)
        //     })
        // },
        //获取对应产品列表
        GetProduction(apply_id){
            axios.get(R_PRE_URL+'selectdebugpro?apply_id=' + apply_id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  if(res.data.prolist[0]){
                    this.ProductionList = res.data.prolist
                    this.cur_production = res.data.prolist[0].id
                    this.GetEquipment(this.cur_production)
                  }
                  break
                  case 0:
                  this.$Message.error('获取产品列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
            })
        },
        //获取对应调试设备列表
        GetEquipment(product_id){
            axios.get(R_PRE_URL+'selectdebug?product_id=' + product_id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.equipmentList = res.data.prolist
                  break
                  case 0:
                  this.$Message.error('获取调试设备列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,获取调试设备列表失败!')
                this.modal_loading = false
            })
        },
        //获取对用产品协议信息
        GetAgreementInfo(product_id){
            axios.get(R_PRE_URL+'selectgnm?product_id=' + product_id
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.dataAgreement = res.data.prolist
                  break
                  case 0:
                  this.$Message.error('获取调试设备列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.modal_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,获取调试设备列表失败!')
                this.modal_loading = false
            })
        },

        handleAdd () {
            this.modalEquipment = true
        },
        //删除调试设备
        handleRemove (ID) {
            this.$Modal.confirm({
                title: '删除提醒',
                content: '<p>确定删除该调试设备？</p>',
                onOk: () => {
                    axios.get(R_PRE_URL+'deletedebug?debugid=' + ID
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('删除调试设备成功!')
                          this.GetEquipment(this.cur_production)
                          break
                          case 0:
                          this.$Message.error('删除调试设备失败!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                    })
                },
                onCancel: () => {
                }
            })
        },
        //添加调试设备
        addEquipment(name){
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let info = {
                        apply_id:this.cur_application,
                        product_id:this.cur_production,
                        debugname:this.formEquipment.name,
                        mac:this.formEquipment.mac
                    }
                    let DATA = {'debugs':info}
                    axios.post(R_PRE_URL+'insertdebug',DATA
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('添加调试设备成功!')
                          this.GetEquipment(this.cur_production)
                          break
                          case 0:
                          this.$Message.error('添加调试设备失败!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙,添加调试设备失败!')
                        this.modal_loading = false
                    })
                    this.modalEquipment = false
                    
                } else {
                    this.$Message.error('带*号的为必填项!');
                }
            })
        },
        //输入发送数据
        changeSendData(idx,data){
            this.dataAgreement[idx].sendData = data
        },
        //发送数据
        send(idx){
            let sendObj = this.dataAgreement[idx]
            if(!sendObj.sendData){
                this.$Message.error('调试数据不能为空!')
                return false
            }
            if(sendObj.sendData.length%2 != 0){
                this.$Message.error('调试数据位数必须是偶数个!')
                return false
            }
            if(this.equipmentList.length<1){
                this.$Message.error('请先添加调试设备!')
                return false
            }

            this.$Message.error('设备不在线!')



        },
        cancel(){

        }
    }
  }
</script>
<style lang="scss" scoped>
.DebugEquipment{
    margin-top: 50px;
}
</style>
