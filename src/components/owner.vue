<template>
  <div id="containers">
     <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span style="float:left">个人信息</span>
        </div>
        <div v-for="(value,key,index) in table" :key="index" class="text item">
            {{ $t('menu.'+key) + ': ' + value}}
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
     table:{}
    }
  },
  methods: {
            
        },
    created(){
        var that = this
        var name = localStorage.getItem('name')
        var pPwd = localStorage.getItem('password')
       that.$http.post('http://localhost:8080/personnelManagement/login', {
                      pId: name,
                      pPwd: pPwd
                    })
                    .then(function (res) {
                        var data = res.data.data
                        console.log(data)
                        localStorage.setItem('pId',data.pId)
                        localStorage.setItem('pName',data.pName)
                        localStorage.setItem('pSalary',data.pSalary)
                        localStorage.setItem('pPwd',data.pPwd)
                        localStorage.setItem('pHospital',data.pHospital)
                        localStorage.setItem('pDepartment',data.pDepartment)
                        localStorage.setItem('pPost',data.pPost)
                        localStorage.setItem('pTeam',data.pTeam)
                        
                        // var arr = []
                        // for(var i in data){
                        //     var obj = {}
                        //     obj[i] = data[i]
                        //     arr.push(obj)
                        // }
                        that.table = data
                        that.table.pGender = that.table.pGender == 1 ? '男' : '女'
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
