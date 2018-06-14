<template>
    <div class="Home">
        <!-- 开发接入流程 -->
        <h2>开发接入流程</h2>
        <div  class="BlockWrap marginTB_20 PaddingTB_50">
            <Steps :current="4" style="margin-left: 20px">
                <Step title="1.创建产品" content="快速创建APP连接产品" icon="ios-box"></Step>
                <Step title="2.自定义协议" content="自定义APP与产品通讯规则" icon="ios-paper"></Step>
                <Step title="3.调试产品" content="实现APP成功通讯产品" icon="ios-analytics"></Step>
                <Step title="4.发布产品" content="成功发布APP、产品" icon="speakerphone"></Step>
            </Steps>
        </div>
        <!-- 开发指南文件 -->
        <h2>开发指南文件</h2>
        <div  class="BlockWrap marginTB_20">
            <Table border :loading="table_loading" :columns="DownColumns" :data="DownData"></Table>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios'
  export default{
    data: function () {
      return {
        table_loading:true,
        DownColumns: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '文件',
                key: 'name',
                render: (h, params) => {
                    return h('div', [
                        // h('Icon', {
                        //     props: {
                        //         type: 'folder'
                        //     }
                        // }),
                        h('strong', params.row.name)
                    ]);
                }
            },
            {
                title: '操作',
                key: 'action',
                width: 250,
                align: 'center',
                render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                icon:'ios-search'
                            },
                            style: {
                                //marginRight: '20px',
                                display:this.DownData[params.index].lianjie != ''?'':'none'
                            },
                            on: {
                                click: () => {
                                    this.show(this.DownData[params.index].lianjie)
                                }
                            }
                        }, '查看'),
                        // h('Button', {
                        //     props: {
                        //         type: 'error',
                        //         icon:'archive'
                        //     },
                        //     style: {
                        //         //marginRight: '20px',
                        //         display:this.DownData[params.index].kind == 'xz'?'':'none'
                        //     },
                        //     on: {
                        //         click: () => {
                        //             this.remove(params.index)
                        //         }
                        //     }
                        // }, '下载'),
                        h('Button', {
                            props: {
                                type: 'text',
                                disabled:true
                            },
                            style: {
                                //marginRight: '20px',
                                display:this.DownData[params.index].lianjie == ''?'':'none'
                            },
                            on: {
                                click: () => {
                                    this.remove(params.index)
                                }
                            }
                        }, '敬请期待')
                    ]);
                }
            }
        ],
        DownData: [
        ]
      }
    },
    mounted: function () {
      
    },
    created() {
      this.GetGuideFile()
    },
    computed: {
      
    },
    watch: {
      
    },
    components: {
    },
    methods: {
        GetGuideFile(KIND){
            axios.post(R_PRE_URL + 'selectdevelopment'
              ).then((res)=> {
                switch(res.data.result){
                  case 1:
                  this.DownData = res.data.info.overview
                  this.table_loading = false
                  break
                  case 0:
                  this.$Message.error('获取开发指南文件列表失败!')
                  break
                  default:
                  this.$Message.error('系统繁忙!')
                }
                
            }).catch((error)=> {
              console.log(error)
            })
        },
        //查看指南
        show(LINK){
            window.open(LINK)

        }
     

    }
  }
</script>
<style lang="scss" scoped>
.Home{
    margin-top: 50px;
}
</style>
