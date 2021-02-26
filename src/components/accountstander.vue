<template>
  <div id="containers">
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <el-form :model="adddepartment" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属部门">
    <el-select v-model="adddepartment.pdepartment" value-key="item" placeholder="请选择" style="width:100%">
        <el-option
        v-for="item in pdepartment"
        :key="item.label"
        :label="item.label"
        :value="item.label">
        </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="事务">
  <el-input v-model="adddepartment.department"></el-input>
  </el-form-item>
  <el-form-item label="分值">
  <el-input v-model="adddepartment.fenzhi"></el-input>
  </el-form-item>
  <el-form-item label="奖金/分">
  <el-input v-model="adddepartment.jiangjin" :disabled="disabled"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addshiwu()">确 定</el-button>
  </span>
</el-dialog>

  <el-button @click="add()" style="float:left">增添</el-button>
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="cbranch"
      label="绩点"
      >
    </el-table-column>
    <el-table-column
      prop="cdepart"
      label="所属部门"
      >
    </el-table-column>
    <el-table-column
      prop="cname"
      label="事务"
      >
    </el-table-column>
    <el-table-column
      prop="cprice"
      label="奖金/分"
      >
    </el-table-column>
    
  </el-table>
    </div>
</template>

<script>

export default {
  watch:{
    'adddepartment.pdepartment':function(vnew,vold){
      if(vnew == '医务部'){
        // this.disabled = false
        this.adddepartment.jiangjin = 500
      }else if(vnew == '后勤部'){
        // this.disabled = false
        this.adddepartment.jiangjin = 200
      }else if(vnew == '行政部'){
        // this.disabled = false
        this.adddepartment.jiangjin = 400
      }else if(vnew == '技术部'){
        // this.disabled = false
        this.adddepartment.jiangjin = 300
      }else if(vnew == '人事部'){
        // this.disabled = false
        this.adddepartment.jiangjin = 100
      }
    }
  },
  data () {
    return {
      tableData: [],
      disabled:true,
      pdepartment:[{
          value: '1',
          label: '医务部'
        }, {
          value: '2',
          label: '后勤部',
          disabled: true
        }, {
          value: '3',
          label: '行政部'
        }, {
          value: '4',
          label: '技术部'
        }, {
          value: '5',
          label: '人事部'
        }],
      dialogVisible: false,
      adddepartment:{
        pdepartment:'',
        department:'',
        jiangjin:'',
        fenzhi:''
      }
    }
  },
  methods: {
    addshiwu(){
      this.$http.post('http://localhost:8080/credit/addCredit',{
        cDepart: this.adddepartment.pdepartment,
        cName: this.adddepartment.department,
        cPrice: this.adddepartment.jiangjin,
        cBranch: this.adddepartment.fenzhi,
      }).then(res=>{
        if(res.data.code == 200) {
          this.$message.success('添加成功')
          this.$router.go(0)
          this.dialogVisible = false
        }else{
          this.$message.error('添加失败')
          this.dialogVisible = false

        }
      })
    },
    add(){
      this.dialogVisible = true
    },
      getall(){
        this.$http.get('http://localhost:8080/credit/getAllCredit').then(res=>{
          var data = res.data.data
          this.tableData = data
          console.log(data)
        })
      }
  },
  mounted(){
    this.getall()
  }
}
</script>

<style  scoped>

</style>
