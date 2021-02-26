<template>
  <div id="containers">
     <div class="echarts">
     <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
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
     data:[]
    }
  },
  methods: {
         
    getall(){
        
    }
        },
    created(){
        
    },
    mounted(){
        var that = this
       
       that.$http.get('http://localhost:8080/achievement/getCombined')
                    .then(function (res) {
                        console.log(res)
                        that.tableData = res.data.data
                        var arr = []
                        var dataarr =[]
                        that.tableData.map(i=>{
                            arr.push(i.date)
                            dataarr.push(i.price)
                        })
                        var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myChart'));
      myChart.setOption({
          title: {
        text: '医院绩效评估'
    },
        xAxis: {
        type: 'category',
        data: arr
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: dataarr,
        type: 'line',
        smooth: true
    }]
      });

                    })
    }
}
</script>

<style  scoped>
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
