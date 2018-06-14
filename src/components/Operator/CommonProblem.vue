<template>
    <div class="CommonProblem">
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
                <Col span="4"><h2>常见问题</h2></Col>
                <Col span="8" class="TextRight">
                    <Button type="error" icon="android-add" @click="AddProblem">创建问题</Button>
                </Col>
            </Row>
            <!-- 常见问题列表 -->
            <div  class="BlockWrap marginTB_20">
                <Table border :loading="table_loading" :columns="ProblemColumns" :data="ProblemData" ></Table>
                <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
            </div>

            <!-- 创建常见问题 -->
            <CreateProblem v-on:refreshProblem="Refresh"></CreateProblem>
            <!-- 编辑常见问题 -->
            <EditProblem :EditInfo="EditInfo" v-on:refreshProblem="Refresh"></EditProblem>
        </div>
        
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import CreateProblem from './Create/CreateProblem.vue'
import EditProblem from './Edit/EditProblem.vue'
  export default{
    data: function () {
      return {
        EditInfo:'',
        table_loading:true,
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        ProblemColumns: [
            {
                title: '序号',
                key: 'id'
            },
            {
                title: '问题类型',
                key: 'fproblemtype'
            },
            {
                title: '问题',
                key: 'fproblem'
            },
            {
                title: '创建时间',
                key: 'fcreatetime'
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
                                    this.EditProblem(params.row)
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
                                    this.removeProblem(params.row.id)
                                }
                            }
                        }, '删除')
                    ]);
                }
            }
        ],
        ProblemData:[]
      }
    },
    mounted: function () {
      
    },
    created(){
        this.GetProblemList()
      
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
        CreateProblem,
        EditProblem
    },
    methods: {
        ToCreateApplication(){
            this.$router.push({name:'开发者平台'})
            this.$store.state.DeveloperMenuCur = '应用管理'
        },
        AddProblem(){
            this.$store.state.M_CreateProblem = true
        },
        //获取问题列表
        GetProblemList(){
            let CreatInfo = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':CreatInfo}
            axios.post(R_PRE_URL+'prolist',DATA
            ).then((res)=> {
                  switch(res.data.result){
                    case 1:
                    this.ProblemData = res.data.prolist
                    this.Total = res.data.sunmun
                    this.table_loading = false
                    break
                    case 0:
                    this.$Message.error('获取问题列表失败!')
                    break
                    default:
                    this.$Message.error('系统繁忙!')
                  }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙,获取问题列表失败!')
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          //this.GetProduction()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          //this.GetProduction()
        },
        //编辑问题
        EditProblem(Info){
            this.EditInfo = Info
            this.$store.state.M_EditProblem = true
        },
        //删除问题
        removeProblem(ID){
            this.$Modal.confirm({
                title: '删除提醒',
                content: '<p>确定删除该问题？</p>',
                onOk: () => {
                    axios.get(R_PRE_URL+'deletepro?proid=' + ID
                    ).then((res)=> {
                        switch(res.data.result){
                          case 1:
                          this.$Message.success('问题删除成功!')
                          this.Refresh()
                          break
                          case 0:
                          this.$Message.error('问题删除失败!')
                          break
                          default:
                          this.$Message.error('系统繁忙!')
                          this.modal_loading = false
                        }
                    }).catch((error)=> {
                        console.log(error)
                        this.$Message.error('系统繁忙，问题删除失败!')
                        this.modal_loading = false
                    })
                },
                onCancel: () => {
                    //this.$Message.info('Clicked cancel');
                }
            })
        },
        Refresh(){
            this.GetProblemList()
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.CommonProblem{
    margin-top: 50px;
}
</style>
