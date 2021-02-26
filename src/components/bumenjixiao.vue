<template>
  <div id="containers">
     <div class="echarts">
     <!-- <div id="myChart" :style="{width: '100%', height: '300px'}"></div> -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
  
  <el-breadcrumb-item>当前所在部门</el-breadcrumb-item>
  <el-breadcrumb-item>{{id}}</el-breadcrumb-item>
</el-breadcrumb>
     </div>
     <div style="display:flex;flex-direction:row;margin-top:2%">
     <el-button @click="bumen1">医务部</el-button>
     <el-button @click="bumen2">后勤部</el-button>
     <el-button @click="bumen3">行政部</el-button>
     <el-button @click="bumen4">技术部</el-button>
     <el-button @click="bumen5">人事部</el-button>
     </div>
     <div class="table">
       <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column
      prop="date"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="price"
      label="绩效值"
      >
    </el-table-column>
   <el-table-column
      prop="money"
      label="奖金"
      >
    </el-table-column>
    
  </el-table>
     </div>
    </div>
</template>

<script>

export default {
  data () {
    return {
     tableData: [],
     date:[],
     data:[],
     id:'医务部'
    }
  },
  methods: {
         
    bumen1(){
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart: this.id
        }).then(res=>{
            console.log(res)
            var that = this
            that.tableData = res.data.data
        })
    },
    bumen2(){
        this.id = '后勤部'
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart: this.id
        }).then(res=>{
            console.log(res)
            var that = this
            that.tableData = res.data.data
        })
    },
    bumen3(){
        this.id = '行政部'
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart: this.id
        }).then(res=>{
            console.log(res)
            var that = this
            that.tableData = res.data.data
        })
    },
    bumen4(){
        this.id = '技术部'
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart: this.id
        }).then(res=>{
            console.log(res)
            var that = this
            that.tableData = res.data.data
        })
    },
    bumen5(){
        this.id = '人事部'
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart: this.id
        }).then(res=>{
            console.log(res)
            var that = this
            that.tableData = res.data.data
        })
    },
        },
    created(){
        
    },
    mounted(){
        this.bumen1()
       
    //    that.$http.get('http://localhost:8080/achievement/getCombined')
    //                 .then(function (res) {
    //                     console.log(res)
    //                     that.tableData = res.data.data
    //                     var arr = []
    //                     var dataarr =[]
    //                     that.tableData.map(i=>{
    //                         arr.push(i.date)
    //                         dataarr.push(i.price)
    //                     })

    //                 })
    }
}
</script>

<style  scoped>
.table{
    margin-top: 2%
    }
.text {
    font-size: 14px;
    text-align: left
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 680px;
    display: block;
    margin: 0 auto;
  }
</style>
