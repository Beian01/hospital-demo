<template>
  <div id="containers">
     <el-card class="box-card" style="margin-top: 50px;" v-for="(item,index) in table" :key="index">
        <div slot="header" class="clearfix">
            <span style="float:left">{{'个人绩效-----' + item.perKind}}</span>
        </div>
        <div class="text item">
            <p class="text item">{{'日期' + ' : ' + item.perDate}}</p>
            <p class="text item">{{'原因' + ' : ' + item.perDescribe}}</p>
            <p class="text item">{{'所属用户' + ' : ' + item.perUser}}</p>
            <p class="text item">{{'分值' + ' : ' + item.perValue}}</p>
        </div>
        <!-- <div v-for="(item,index) in table" :key='index'>
        <p class="text item">{{item}}</p>
        <p class="text item">aa</p>
        <p class="text item">aa</p>
        
        </div> -->
    </el-card>
    </div>
</template>

<script>

export default {
  data () {
    return {
     table:[]
    }
  },
  methods: {
            
        },
        mounted(){
        },
    created(){
        var that = this
        var name = localStorage.getItem('name')
        var pPwd = localStorage.getItem('password')
       that.$http.post('http://localhost:8080/performance/getAllPer', {
                      perUser: name,
                    //   pPwd: pPwd
                    })
                    .then(function (res) {
                        // console.log(res.data)
                        var data = res.data
                        // var arr = []
                        // for(var i in data){
                        //     var obj = {}
                        //     obj[i] = data[i]
                        //     arr.push(obj)
                        // }
                        that.table = data
                        // that.table.push(data)
                        for(var i in that.table){
                            that.table[i].perKind = that.table.perKind == 1 ? '减分' : '加分'
                        }
                            console.log(that.table)
                        
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
