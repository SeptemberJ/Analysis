<template>
	<div class="Schat">
    <h2>{{Info.Htit}}</h2>
    <div class="BlockWrap marginTB_20 PaddingTB_50">
        <Row type="flex" justify="space-around" class="code-row-bg">
            <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
                <ButtonGroup shape="circle">
                    <Button :type="BtCur == BtIdx?'primary':'ghost'" @click.prevent="BtTab(Bt.value,BtIdx)" v-for="(Bt,BtIdx) in Info.Sdata">
                        {{Bt.BtName}}
                    </Button>
                </ButtonGroup>
            </Col>
            <Col class="marginTB_10 TextCenter" :xs="{ span: 24,offset: 0}" :lg="{ span: 24}">
                <schart :width="width"
    :height="height"  :canvasId="Info.Htit" :type="type"  :data="data" :options="options"></schart>
            </Col>
            
        </Row>
    </div>
	</div>
</template>
<script>


import Schart from 'vue-schart';
import axios from 'axios'
  export default{
    props:['Info'],
    data: function () {
      return {
        BtCur:0,
        //canvasId: 'myCanvas',
        type: 'line',
        width: 750,
        height: 400,
        data: [],
        options: {
            padding: 50,                   // canvas 内边距
            bgColor: '#FFFFFF',            // 默认背景颜色
            title: '',// 图表标题
            titleColor: '#000000',         // 图表标题颜色
            titlePosition: 'top',      // 图表标题位置: top / bottom
            yEqual: 5,                     // y轴分成5等分
            fillColor: '#1E9FFF',          // 默认填充颜色
            contentColor: '#eeeeee',       // 内容横线颜色
            axisColor: '#666666',          // 坐标轴颜色
        }

      }
    },
    mounted: function () {
      
    },
    created() {
      console.log('bts------')
      console.log(this.Info)
      this.GetSchatData('Schat')
      
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
      Schart
      

    },
    methods: {
      BtTab(VALUE,IDX){
        console.log(IDX+'---'+VALUE)
        this.BtCur = IDX
        switch(IDX){
          case 0:
          this.GetSchatData('Schat')
          break
          case 1:
          this.GetSchatData('Schat2')
          break
          default:
          this.GetSchatData('Schat')
        }
      },
      GetSchatData(KIND){
        axios.get('static/json/'+ KIND +'.json'
          ).then((res)=> {
            console.log(KIND+ '--- backinfo------')
            console.log(res.data)
            this.data = res.data.info.data
        }).catch((error)=> {
          console.log(error)
        })

      },
    }
  }
</script>
<style lang="scss">
.Schat{
}
</style>