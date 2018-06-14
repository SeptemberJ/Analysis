<template>
    <div class="UserFeedback">
        <!-- 没有任何信息 -->
       <!--  <div v-if="ApplicationList.length == 0">
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
                <Col span="4"><h2>反馈列表</h2></Col>
                <Col span="8" class="TextRight">
                    <Button type="error" icon="ios-trash" @click="DeleteFeedback">删除</Button>
                </Col>
            </Row>
            <!-- 反馈列表 -->
            <div  class="BlockWrap marginTB_20">
                <Table border ref="selectionFeedback" :loading="table_loading" :columns="FeedbackColumns" :data="FeedbackData" @on-selection-change="SelectChanged"></Table>
                <Page v-if="Total>0" class="marginT_20 marginB_150" :total="Total" show-total style="float: right;" :current="page_num" @on-change="changePage" @on-page-size-change="changePageSize" show-sizer></Page>
            </div>
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
        Total:0,
        page_num:1,  //页数
        number:10,   //每页条数
        selectionFeedback:[],
        FeedbackColumns: [
            {
                type: 'selection',
                width: 60,
                align: 'center'
            },
            {
                title: '用户名',
                key: 'fname'
            },
            {
                title: '手机/邮件',
                key: 'fmobile/fmail',
                render: (h, params) => {
                    return h('div', params.row.fmobile?params.row.fmobile:params.row.fmail);
                }
            },
            {
                title: '反馈内容',
                key: 'ffeedback_content'
            },
            {
                title: '时间',
                key: 'ftime'
            },
            {
                title: '反馈状态',
                key: 'fstatus'
            }
        ],
        FeedbackData:[]
      }
    },
    mounted: function () {
      
    },
    created() {
        this.GetFeedbackList()
      
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
        //删除用户反馈
        DeleteFeedback(){
            let len = this.selectionFeedback.length
            if(len == 0){
                this.$Message.error('请先选择要删除的项!')
            }else{
                this.$Modal.confirm({
                    title: '删除提醒',
                    content: '<p>确定删除这'+len+'条反馈？</p>',
                    onOk: () => {
                        let DeleteInfo = {
                            DeleteInfo:this.selectionFeedback
                        }
                        let DATA = {'users':DeleteInfo}
                        axios.post(R_PRE_URL+'deletefeedback',DATA
                        ).then((res)=> {
                            switch(res.data.result){
                              case 1:
                              this.$Message.success('删除反馈成功!')
                              this.GetFeedbackList()
                              break
                              case 0:
                              this.$Message.error('删除反馈失败!')
                              break
                              default:
                              this.$Message.error('系统繁忙!')
                            }
                        }).catch((error)=> {
                            console.log(error)
                            this.$Message.error('系统繁忙,删除反馈失败!')
                        })
                    },
                    onCancel: () => {
                    }
                })
            }
        },
        //获取反馈列表
        GetFeedbackList(){
            let MessageInfo = {
                userid:this.ID,
                apply_id:this.$store.state.CurApplication,
                page:this.page_num,
                number:this.number
            }
            let DATA = {'users':MessageInfo}
            axios.post(R_PRE_URL+'feedback',DATA
            ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.FeedbackData = res.data.feedback
                  this.Total = res.data.sunmun
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取反馈列表失败!')
                  this.table_loading = false
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                  this.table_loading = false
                }
            }).catch((error)=> {
                console.log(error)
                this.$Message.error('系统繁忙，获取反馈列表失败!')
                this.table_loading = false
            })
        },
        //分页
        changePage(event){
          this.page_num = event
          this.GetFeedbackList()
        },
        //切换每页条数
        changePageSize(event){
          this.number = event
          this.GetFeedbackList()
        },
        //选中项改变
        SelectChanged(selection){
            this.selectionFeedback = selection
        }
     

    }
  }
</script>
<style lang="scss" scoped>
.UserFeedback{
    margin-top: 50px;
}
</style>
