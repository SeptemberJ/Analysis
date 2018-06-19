<template>
    <div class="Home">
        <div>
            <!-- 概览 -->
            <div class="ColorfulBlock">
	            <div class="BlockWrap marginTB_20">
		            <Row :gutter="16" type="flex" justify="start" class="code-row-bg">
				        <Col span="6">
				        	<Card :bordered="false">
				                <Row>
							        <Col span="12">
							        	<img style="width:50px;" src="static/img/icon/user.png">
							        </Col>
							        <Col span="12">
							        	<p>用户总数</p>
							        	<p>23</p>
							        </Col>
							    </Row>

				            </Card>
				        </Col>
				        <Col span="6">
				        	<Card :bordered="false">
				                <Row>
							        <Col span="12">
							        	<img style="width:50px;" src="static/img/icon/equipment.png">
							        </Col>
							        <Col span="12">
							        	<p>设备总数</p>
							        	<p>23</p>
							        </Col>
							    </Row>
				            </Card>
				        </Col>
				    </Row>
	            </div>
	        </div>
	        <!-- 实时数据-->
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
        overviewData:[
        	{'name':'用户总数','mount':50},
        	{'name':'设备总数','mount':20}
        ]

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
        },
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        GetOverViewData(KIND){
            axios.get(R_PRE_URL + 'selectnumber?userid='+this.ID
              ).then((res)=> {
                this.OverView = res.data.info.overview
            }).catch((error)=> {
              console.log(error)
            })
        },
        
     

    }
  }
</script>
<style lang="scss" scoped>
.Home{
    margin-top: 50px;
}
</style>
