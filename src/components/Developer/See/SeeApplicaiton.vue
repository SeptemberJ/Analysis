<template>
    <!-- 查看应用 -->
    <Modal v-model="ifShowModal" width="600" :mask-closable="false" @on-visible-change="ChangeVisible">
        <p slot="header">
            <Icon type="information-circled"></Icon>
            <span>查看应用信息</span>
        </p>
        <div style="">
            <Form ref="formSee" :model="formSee" label-position="left" :label-width="120">
                <Tag type="dot"  color="blue">应用信息</Tag>
                <FormItem label="应用分类" prop="A_kind">
                    {{formSee.A_kind}}
                </FormItem>
                <FormItem label="应用名称" prop="A_name">
                    {{formSee.A_name}}
                </FormItem>
                <FormItem label="应用说明" prop="A_introduction">
                    {{formSee.A_introduction}}
                </FormItem>
                <FormItem label="应用图标" prop="A_img">
                    <img :src="formSee.A_img?formSee.A_img:'/static/img/icon/application.png'">
                </FormItem>
                <Tag type="dot"  color="blue">Android</Tag>
                <FormItem label="Android应用包名" prop="A_android">
                    {{formSee.A_android}}
                </FormItem>
                <Tag type="dot"  color="blue">ios</Tag>
                <FormItem label="ios应用包名" prop="A_ios">
                    {{formSee.A_ios}}
                </FormItem>
                <FormItem label="APPID" prop="A_ios">
                    {{formSee.A_appid}}
                </FormItem>
                <FormItem label="APPKey" prop="A_ios">
                    {{formSee.A_appkey}}
                </FormItem>
                <FormItem label="创建时间" prop="A_ios">
                    {{formSee.A_create_time}}
                </FormItem>
            </Form>
        </div>
        <div slot="footer" style="text-align:center">
            <Button type="primary" size="large"  @click="Close()">关闭</Button>
        </div>
    </Modal>
        
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
  export default{
    props:['DetailInfo'],
    data: function () {
      return {
        ImgSource:'',
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
        // ID(){
        //     let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
        //     return ID
        // },
        ifShowModal: {
            get: function () {
              return this.$store.state.M_SeeApplication
            },
            set: function (newValue) {
              this.$store.state.M_SeeApplication = false
            }
        },
        formSee(){
            let Info = {
                A_kind : this.DetailInfo.apply_type,
                A_name : this.DetailInfo.apply_name,
                A_introduction : this.DetailInfo.apply_introduction?this.DetailInfo.apply_introduction:'------',
                A_img : this.DetailInfo.apply_icon,
                A_android : this.DetailInfo.android_name?this.DetailInfo.android_name:'------',
                A_ios : this.DetailInfo.ios_name?this.DetailInfo.ios_name:'------',
                A_appid : this.DetailInfo.appid,
                A_appkey : this.DetailInfo.appkey,
                A_create_time : this.DetailInfo.create_time,
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
            this.$store.state.M_SeeApplication = e
        },
        Close(){
            this.$store.state.M_SeeApplication = false
        }
    }
  }
</script>
<style scoped>
.ivu-tag-dot{
    border: 0px solid #e3e8ee !important;
    padding: 0 !important;
    font-size: 16px;
    font-weight: bold !important;
    
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
