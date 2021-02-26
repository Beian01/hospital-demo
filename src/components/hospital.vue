<template>
  <div id="allecharts">
      <div class="top">
        <div ref="chart" :style="{width: '100%', height: '300px'}"></div>
      </div>
      <div class="center">
        <div class="left">
        <el-select @change="selectchange" style="width:15%;margin-top:15px" v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
        <div class="echarts">
     <div id="myChart" :style="{width: '100%', height: '300px'}"></div>
     </div>
     </div>
        <div class="right">
        <el-select @change="selectchanges" style="width:15%;margin-top:15px" v-model="values" placeholder="请选择">
    <el-option
      v-for="item in optiones"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
        <div id="myChartes" :style="{width: '100%', height: '300px'}"></div>
        </div>
      </div>
      <div class="content">
      <el-select @change="gangweiselectchange" style="width:15%;margin-top:15px" v-model="gangweivalue" placeholder="请选择">
    <el-option
      v-for="item in gangweioption"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
      <div id="myCh" :style="{width: '100%', height: '300px'}"></div>
      </div>
      <!-- <div class="footer">
      <div id="myCharttt" :style="{width: '100%', height: '300px'}"></div>
      </div> -->
    </div>
</template>

<script>

export default {
  data () {
    return {
        values:'',
        gangweivalue:'',
        gangweioption:[],
      optiones:[],
      options: [{
          value: '医务部',
          label: '医务部'
        }, {
          value: '后勤部',
          label: '后勤部',
        }, {
          value: '行政部',
          label: '行政部'
        }, {
          value: '技术部',
          label: '技术部'
        }, {
          value: '人事部',
          label: '人事部'
        }],
        value: '医务部'
      
    }
  },
  methods: {
      gangweiselectchange(val){
          this.gangweivalue = val
          this.$http.post('http://localhost:8080/achievement/getCombinedByDepartAndTeamAllPost',{
              
              depart: this.value,
               team:this.values
          }).then(res=>{
              var data = res.data.data
              var arr = []
              
              data.filter(i=>{
                  arr.push(i.post)
              })
              var arrlist = Array.from(new Set(arr));

              if(arrlist){
                  this.gangweivalue = arrlist[0]
              }else{
                  this.gangweivalue = ''
              }
                var objarr =[]
                for(var i in arrlist){
                    var obj = {}
                    obj.value = arrlist[i]
                    obj.label = arrlist[i]
                    objarr.push(obj)
                }
              this.gangweioption = objarr
              this.contents()
          })
      },
      contents () {
          this.$http.post('http://localhost:8080/achievement/getCombinedByDepartAndTeamAndPost',{
               depart: this.value,
               team:this.values,
               post:this.gangweivalue
          }).then(res=>{
              var aadata = res.data.data
              var postlist = [],
                  postprice = [],
                  postmoney = [],
                  postdate = []
              for(var i in aadata){
                  postdate.push(aadata[i].date)
                  postlist.push(aadata[i].post)
                  postprice.push(aadata[i].price)
                  postmoney.push(aadata[i].money)
              }
              var arrlistes = Array.from(new Set(postlist));
            //   var aa = arrliters ? arrliters[0] : ''
                  console.log(postdate,arrlistes,postprice,postmoney)
                  var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myCh'));
      myChart.setOption({
        color: ['#80FFA5', '#00DDFF'],
   
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['绩效值','奖金值']
    },
    
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: postdate
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '绩效值',
            type: 'line',
            stack: '绩效值',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: postprice
        },
        {
            name: '奖金',
            type: 'line',
            stack: '奖金值',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 0.8,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(128, 255, 165)'
                }, {
                    offset: 1,
                    color: 'rgba(1, 191, 236)'
                }])
            },
            emphasis: {
                focus: 'series'
            },
            data: postmoney
        },
       
    ]
      });
    })
      
    },
      selectchanges(val){
          this.values = val
          this.$http.post('http://localhost:8080/achievement/getCombinedByDepartAndTeam',{
               depart: this.value,
               team:this.values
          }).then(res=>{
              var keshishuju = res.data.data
              var keshidate = []
              var keshimoney = []
              var keshidata = []
              for(var i in keshishuju){
                  keshidate.push(keshishuju[i].date)
                  keshimoney.push(keshishuju[i].money)
                  keshidata.push(keshishuju[i].price)
              }
               var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myChartes'));
      myChart.setOption({
       
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
    grid: {
        left: '3%',
        right: '4%',
        bottom: '20%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: keshidate
    },
    series: [
        {
            name: '绩效',
            type: 'bar',
            data: keshidata
        },
        {
            name: '奖金',
            type: 'bar',
            data: keshimoney
        }
    ]
      });
    //   this.contents()
          })
      },
      selectchange(val){
          
          this.value = val
          var arrlists = []
          var arrdate = []
          this.$http.post('http://localhost:8080/getAll/getTeam',{
            pDepartment : val
        }).then(res=>{
            var keshi = res.data.data
            this.optiones =[]
            for(var i in keshi){
                var obj = {}
                obj.value = keshi[i].tname
                obj.label = keshi[i].tname
                this.optiones.push(obj)
            }
            // var that = this
            if(keshi){
                this.values = keshi[0].tname
            }else{
                this.values = ''
            }
            this.gangweiselectchange()
            // this.selectchanges(val,values)
        })
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
            depart : val
        }).then(res=>{
            var data = res.data.data
            for(var i in data){
                arrlists.push(data[i].price)
                arrdate.push(data[i].date)
                }
                if(arrlists.length == 0){
                    arrlists.push(0)
                    arrdate.push(0)
                }

                var echarts = require('echarts');
      var myChart = echarts.init(document.getElementById('myChart'));
      myChart.setOption({
         xAxis: {
        type: 'category',
        data: arrdate
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: arrlists,
        type: 'line',
        smooth: true
    }]
      });
        })
      },
      
     
      
    
    
    allecharts(){
        var datearr = []
        var datas = []
        this.$http.get('http://localhost:8080/achievement/getCombined').then(res=>{
            var data = res.data.data
            for(var i in data){
                datearr.push(data[i].price)
                datas.push(data[i].date)
                let myChart = this.echarts.init(this.$refs.chart);


    const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']
　　myChart.setOption({
    
     xAxis: {
        type: 'category',
        boundaryGap: false,
        data: datas
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: datearr,
        type: 'line',
        areaStyle: {}
    }] 
　　});
            }
        })
         
    }        
    },
    mounted(){
        this.allecharts()
        // this.drawLine()
        this.selectchange('医务部')
        this.selectchanges('骨科')
        // this.drawLines()
        // this.contents()
        // this.myCharttts()
        // this.gangweiselectchange()
    }
}
</script>

<style>
#allecharts{
    width: 100%;
    height: 100%;
    padding: 5px;
    display: flex;
    box-shadow: 10px 0 0 #ddd;
    flex-direction: column;
}
.top{
    border-bottom: 1px solid black;

}
.center{
    display: flex;
    flex-direction: row;
}
.left{
    border-bottom: 1px solid black;
    flex: 1;
}
.right{
    border-bottom: 1px solid black;
    flex: 1;
}
.content{
}
.footer{
}
</style>
