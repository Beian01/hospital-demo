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
      prop="acDate"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="acId"
      label="工号"
      >
    </el-table-column>
    <el-table-column
      prop="acValue"
      label="分值">
    </el-table-column>
    <el-table-column
      prop="acSalary"
      label="奖金">
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
       var pId = localStorage.getItem('pId')
       var pName = localStorage.getItem('pName')
       var pHospital = localStorage.getItem('pHospital')
       var pDepartment = localStorage.getItem('pDepartment')
       var pPost = localStorage.getItem('pPost')
       var pTeam = localStorage.getItem('pTeam')
       var pPwd = localStorage.getItem('pPwd')
       var pSalary = localStorage.getItem('pSalary')
       that.$http.post('http://localhost:8080/achievement/getByUserMonth', {
                      acId: pId,
                      pName: pName,
                      pHospital: pHospital,
                      pDepartment: pDepartment,
                      pPost: pPost,
                      pTeam: pTeam,
                      pPwd: pPwd,
                      pSalary: pSalary,
                     
                    })
                    .then(function (res) {
                        console.log(res)
                        that.tableData = res.data.data
                        var arr = []
                        var dataarr =[]
                        that.tableData.map(i=>{
                            arr.push(i.acDate)
                            dataarr.push(i.acValue)
                        })
                        var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myChart'));
      myChart.setOption({
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
