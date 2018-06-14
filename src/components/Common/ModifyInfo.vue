<template>
    <div class="ModifyInfo">
        <!-- 修改个人账号信息 -->
        <div>
            <h2>修改个人账号信息</h2>
            <div class="BlockWrap marginTB_20">
                <Form label-position="left" ref="formModify" :model="formModify" :rules="ruleValidateModify" :label-width="120">
                    <FormItem label="账号">
                        {{formModify.Account}}
                    </FormItem>
                    <FormItem label="头像">
                        <img :style="{width:'150px',height:'150px'}" :src="formModify.Avatar" />
                    </FormItem>
                    <FormItem label="">
                        <Upload action="//jsonplaceholder.typicode.com/posts/"
                        :before-upload="handleBeforeUpload"
                        >
                            <Button type="ghost" icon="ios-loop-strong">更换头像</Button>
                        </Upload>
                    </FormItem>
                    <FormItem label="姓名" prop="Name">
                        <Input v-model="formModify.Name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="密码" prop="Psd">
                        <Input type="password" v-model="formModify.Psd" placeholder="请输入密码"></Input>
                    </FormItem>
                    <FormItem label="确认密码" prop="PsdAgain">
                        <Input type="password" v-model="formModify.PsdAgain" placeholder="请再次输入密码"></Input>
                    </FormItem>

                    <Button @click="ModifySubmit('formModify')" type="error">提交</Button>
                    <Button @click="BackInfo" type="primary">返回</Button>
                </Form>
            </div>
        </div>

    </div>
</template>
<script>

  export default{
    data: function () {
      return {
        formModify:{
            Avatar:'https://i.loli.net/2017/08/21/599a521472424.jpg',
            Name: 'shbt',
            Account: '15722500690',
            Psd: '',
            PsdAgain:'',
        },
        ruleValidateModify: {
            Name: [
                { required: true, message: '请输入姓名！', trigger: 'blur' }
            ],
            Psd: [
                { required: true, message: '请输入新密码！', trigger: 'blur' }
            ],
            PsdAgain: [
                { required: true, message: '请确认新密码！', trigger: 'blur' }
            ]
        },
      }
    },
    mounted: function () {
      
    },
    created: function () {
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        BackInfo(){
            this.IfModify = false
        },
        handleBeforeUpload(event){
            var _this = this
            var file = event
            //_this.formApplication.FileName = file.name
            var reader = new FileReader();   
            reader.readAsDataURL(file);   
            reader.onload = function(e){
              _this.formModify.Avatar = this.result
            } 
        },
        ModifySubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(this.formModify)
                    this.$Message.success('修改个人账号信息成功!');
                } else {
                    this.$Message.error('带*号为必填项!');
                }
            })
        },
     

    }
  }
</script>
<style lang="scss" scoped>
.ModifyInfo{
    margin-top: 50px;
    form{
        width: 300px;
        margin: 0 auto;
    }
}


</style>
