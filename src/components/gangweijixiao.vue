<template>
  <div id="containers">
     <div class="echarts">
     <!-- <div id="myChart" :style="{width: '100%', height: '300px'}"></div> -->
     <el-breadcrumb separator-class="el-icon-arrow-right">
  
  <el-breadcrumb-item>当前所在部门</el-breadcrumb-item>
  <el-breadcrumb-item>{{id}}</el-breadcrumb-item>
  <el-breadcrumb-item>{{ids}}</el-breadcrumb-item>
</el-breadcrumb>
     </div>
     <div style="display:flex;margin-top:2%;flex-direction:row">
     <div style="margin-left:10px"  v-for="(item,index) in options " :key="index">
        <el-button @click="bumen(item.value)">{{item.value}}</el-button>
     
     </div>
     </div>
     <div style="display:flex;margin-top:2%;flex-direction:row">
     <div style="margin-left:10px"  v-for="(item,index) in optiones " :key="index">
        <el-button @click="bumens(item.value)">{{item.value}}</el-button>
     
     </div>
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
      prop="post"
      label="岗位"
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
    <el-table-column
      prop="depart"
      label="所属部门"
      >
    </el-table-column>
   <el-table-column
      prop="team"
      label="所属科室"
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
     ids:'骨科',
     id:'医务部',
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
    }
  },
  methods: {
    bumenes(){
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepartAndTeamAllPost',{
               depart: '医务部',
               team:'骨科'
          }).then(res=>{
              console.log(res)
              var data = res.data.data
              this.tableData = data
          })
    },
    bumens(val){
      this.ids = val
        this.$http.post('http://localhost:8080/achievement/getCombinedByDepartAndTeamAllPost',{
               depart: this.id,
               team:this.ids
          }).then(res=>{
              console.log(res)
              var data = res.data.data
              this.tableData = data
          })
    },
    bumen(value){
        this.id = value
        console.log(this.id)
        this.$http.post('http://localhost:8080/getAll/getTeam',{
            pDepartment : value
        }).then(res=>{
            var keshi = res.data.data
            console.log(keshi)
            this.optiones = []
            for(var i in keshi){
                var obj = {}
                obj.value = keshi[i].tname
                obj.label = keshi[i].tname
                this.optiones.push(obj)
            }
            // var that = this
            if(keshi){
                this.ids = keshi[0].tname
            }else{
                this.ids = ''
            }
            this.bumens()
        })
        // this.$http.post('http://localhost:8080/achievement/getCombinedByDepart',{
        //     depart: this.id
        // }).then(res=>{
        //     console.log(res)
        //     var that = this
        //     that.tableData = res.data.data
        // })
    },
    
        },
    created(){
        
    },
    mounted(){
        this.bumen('医务部')
        this.bumenes()
       
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
