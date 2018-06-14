<template>
<div class="CircleChart">
    <h2>数据透视</h2>
    <div  class="BlockWrap marginTB_20 PaddingTB_50">
      <Row type="flex" justify="space-around" class="code-row-bg">
          <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 8}">
          	<iCircle
		        :size="200"
		        :trail-width="4"
		        :stroke-width="5"
		        :percent="Info.active_yesterday"
		        stroke-linecap="square"
		        stroke-color="#43a3fb">
		        <div class="demo-Circle-custom">
		            <h1>昨日活跃率</h1>
		            <p></p>
		            <span>
		                <i>{{Info.active_yesterday}}%</i>
		            </span>
		        </div>
		    </iCircle>
          </Col>
          <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 8}">
          	<iCircle
		        :size="200"
		        :trail-width="4"
		        :stroke-width="5"
		        :percent="Info.active_7day"
		        stroke-linecap="square"
		        stroke-color="#43a3fb">
		        <div class="demo-Circle-custom">
		            <h1>7日活跃率</h1>
		            <p></p>
		            <span>
		                <i>{{Info.active_7day}}%</i>
		            </span>
		        </div>
		    </iCircle>
          </Col>
          <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 8}">
          	<iCircle
		        :size="200"
		        :trail-width="4"
		        :stroke-width="5"
		        :percent="Info.active_30day"
		        stroke-linecap="square"
		        stroke-color="#43a3fb">
		        <div class="demo-Circle-custom">
		            <h1>30日活跃率</h1>
		            <p></p>
		            <span>
		                <i>{{Info.active_30day}}%</i>
		            </span>
		        </div>
		    </iCircle>
          </Col>
          
      </Row>
        
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
import CryptoJS from "crypto-js"
import echarts from 'echarts'

export default{
    props:['Info'],
    data: function () {
      return {
        active_yesterday:0,
        active_7day:0,
        active_30day:0,

      }
    },
    mounted() {
      
    },
    created() {
      
      
    },
    computed: {
      ID(){
            let ID = CryptoJS.AES.decrypt(this.$store.state.userInfo.userID,this.$store.state.PlainText).toString(CryptoJS.enc.Utf8)
            return ID
        }
      
    },
    watch: {
      
    },
    components: {
      

    },
    methods: {
      //获取数据透视
      getCircleData(Url,Kind){
        let Info = {
          userid:this.ID,
          apply_id:this.$store.state.CurApplication,
        }
        let DATA = {'users':Info}
        axios.post(R_PRE_URL + Url ,DATA
        ).then((res)=> {
            switch(res.data.result){
                  case 1:
                  this[Kind]= res.data.activelv.toFixed(2)
                  break
                  case 0:
                  this.$Message.error('获取数据透视失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
        }).catch((error)=> {
          console.log(error)
          this.$Message.error('系统繁忙，获取数据透视失败!')
        })
      },

    }
}
</script>
<style lang="scss">
.CircleChart{
  width: 100%;
  display: block;
  float: left;
  clear: both;
}
    .demo-Circle-custom{
        & h1{
            color: #3f414d;
            font-size: 24px;
            font-weight: normal;
        }
        & p{
            color: #657180;
            font-size: 18px;
            margin: 10px 0 15px;
        }
        & span{
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;
            &:before{
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            };
        }
        & span i{
            font-style: normal;
            color: #3f414d;
        }
    }
</style>