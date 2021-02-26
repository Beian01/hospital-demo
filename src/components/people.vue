<template>
  <div id="container">
  <div class="tianjia">
    <el-button @click="addpeople()" style="float:left">添加人员</el-button>
    <!-- <el-button @click="adddepartments()" style="float:left">添加部门</el-button> -->
    <el-button @click="addpteames()" style="float:left">添加科室</el-button>
    <el-button @click="addpposts()" style="float:left">添加岗位</el-button>
    <el-dialog
  title="绩效考核"
  :visible.sync="jixiaodialogVisible"
  width="30%"
  >
  <el-form :model="addjixiaokaohe" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属人">
  <el-input v-model="addjixiaokaohe.perUser" disabled></el-input>
  </el-form-item>
  <el-form-item label="日期">
   <el-date-picker
   disabled
   style="width:100%"
      v-model="searchFormField.date"
      type="date"
      placeholder="选择日期"
       format="yyyy 年 MM 月 dd 日">
    </el-date-picker>
  </el-form-item>
  <el-form-item label="考核类型">
    <el-select v-model="addjixiaokaohe.perKind" value-key="item" placeholder="请选择" @change="jixiaochange" style="width:100%">
        <el-option
        v-for="item in addjixiaoes"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="操作分值">
  <el-input v-model="addjixiaokaohe.perValue"></el-input>
  </el-form-item>
  <el-form-item label="描述">
    <el-select v-model="addjixiaokaohe.perDescribe" value-key="item" placeholder="请选择" @change="jixiaochange" style="width:100%">
        <el-option
        v-for="item in option"
        :key="item.value"
        :label="item.label"
        :value="item.value">
        </el-option>
    </el-select>
    </el-form-item>
  
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addjixiaos">确 定</el-button>
  </span>
</el-dialog>

    <el-dialog
  title="添加科室"
  :visible.sync="pteamsVisible"
  width="30%"
  >
  <el-form :model="adddepartment" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属部门">
    <el-select v-model="adddepartment.pdepartment" value-key="item" placeholder="请选择" @change="partmentchange" style="width:100%">
        <el-option
        v-for="item in pdepartment"
        :key="item.dname"
        :label="item.dname"
        :value="item.dname">
        </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="所属科室">
  <el-input v-model="adddepartment.department"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addkeshi()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="添加岗位"
  :visible.sync="ppostVisible"
  width="30%"
  >
 <el-form :model="addppost" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属部门">
    <el-select v-model="addppost.pdepartment" value-key="item" placeholder="请选择" @change="partmentschange" style="width:100%">
        <el-option
        v-for="item in pdepartment"
        :key="item.dname"
        :label="item.dname"
        :value="item.dname">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="所属科室">
    <el-select v-model="addppost.department" value-key="item" placeholder="请选择" @change="pteamchange" style="width:100%">
        <el-option
        v-for="item in pteam"
        :key="item.tname"
        :label="item.tname"
        :value="item.tname">
        </el-option>
    </el-select>
    </el-form-item>
  <el-form-item label="添加的岗位">
  <el-input v-model="addppost.ppost"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addgangwei()">确 定</el-button>
  </span>
</el-dialog>
  </div>
      <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="pId"
      label="工号"
      width="147px">
    </el-table-column>
    <el-table-column
      fixed
      prop="pName"
      label="姓名"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pHospital"
      label="所属医院"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pDepartment"
      label="所属部门"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pTeam"
      label="所属科室"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pPost"
      label="岗位"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pSalary"
      label="基础工资"
      width="147px">
    </el-table-column>
    <el-table-column
      prop="pgender"
      label="性别"
      width="147px">
      <template slot-scope="scope">
        {{scope.row.pgender == 1 ? '男' : '女'}}
        
    </template>
    </el-table-column>
    <el-table-column
      prop="pPhone"
      label="电话"
      width="147px">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
          size="mini"
          @click="handlekaohe(scope.row)">考核</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  title="修改信息"
  :visible.sync="dialogVisible"
  width="35%"
  >
  <el-form :model="tables" status-icon label-width="100px" class="demo-ruleForm">
    <el-form-item label="工号">
        <el-input v-model="tables.pid" :disabled="disable"></el-input>
    </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="tables.pname" :disabled="disable"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="pgender">
    <el-radio-group v-model="tables.pgender" style="float:left;transform: translate(11px, 14px);">
      <el-radio :label="0" :disabled="disable">女</el-radio>
      <el-radio :label="1" :disabled="disable">男</el-radio>
    </el-radio-group>
  </el-form-item>
    
    <el-form-item label="所属医院">
        <el-input v-model="tables.phospital"></el-input>
    </el-form-item>
    <el-form-item label="所属部门">
    <el-select v-model="tables.pdepartment" value-key="item" placeholder="请选择" @change="partmentchange" style="width:100%">
        <el-option
        v-for="item in pdepartment"
        :key="item.dname"
        :label="item.dname"
        :value="item.dname">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="所属科室">
    <el-select v-model="tables.pteam" value-key="item" placeholder="请选择" @change="pteamchange" style="width:100%">
        <el-option
        v-for="item in pteam"
        :key="item.tname"
        :label="item.tname"
        :value="item.tname">
        </el-option>
    </el-select>
    </el-form-item>
    <el-form-item label="岗位">
    <el-select v-model="tables.ppost" value-key="item" placeholder="请选择"  @change="ppostchange" style="width:100%">
        <el-option
        v-for="item in ppost"
        :key="item.poName"
        :label="item.poName"
        :value="item.poName">
        </el-option>
    </el-select>
    </el-form-item>
    
    <el-form-item label="基础工资">
        <el-input v-model="tables.psalary"></el-input>
    </el-form-item>
    <el-form-item label="电话">
        <el-input v-model="tables.pphone"></el-input>
    </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" v-if="this.isadd == ''" @click="update()">确 定</el-button>
    <el-button type="primary" v-if="this.isadd != ''" @click="add()">确 定</el-button>
  </span>
</el-dialog>
<el-dialog
  title="添加部门"
  :visible.sync="departmentVisible"
  width="30%"
  >
  <el-form :model="addpteams" status-icon label-width="100px" class="demo-ruleForm">
  <el-form-item label="所属部门">
  <el-input v-model="addpteams.pdepartment"></el-input>
  </el-form-item>
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="addbumen">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>

export default {
  name: 'apps',
  data () {
    return {
      disable: false,
      pteamsVisible:false,
      ppostVisible:false,
      jixiaodialogVisible:false,
      pdepartment:[],
      ppost:[],
      option:[],
      addppost:{
        pdepartment:'',
        department:'',
        ppost:''
      },
      addjixiaokaohe:{
        perKind:'',
        perValue:'',
        perUser:'',
        perDescribe:'',
        perDate:''
      },
      addjixiaoes:[
        {
          value: 1,
          label: '加分'
        }, {
          value: 0,
          label: '减分',
        }
      ],
      adddepartment:{
        pdepartment:'',
        department:''
      },
      addpteams:{
        pdepartment:''
      },
      departmentVisible:false,
      isadd:'',
      pteam:[],
      val:'',
      tables: {
          pid: '',
          pname: '',
          phospital:'北京朝阳医院',
          pdepartment: '',
          pteam: '',
          pgender: '',
          ppost: '',
          psalary: '',
          pphone: ''
      },
      tableData: [],
      dialogVisible: false,
      searchFormField:{
        data:''
      }
    }
  },
  methods: {
    getNowTime() {
       var now = new Date();
       var year = now.getFullYear(); //得到年份
       var month = now.getMonth(); //得到月份
       
       var date = now.getDate(); //得到日期
       month = month + 1;
       month = month.toString().padStart(2, "0");
       date = date.toString().padStart(2, "0");
       var defaultDate = `${year}-${month}-${date}`;
       this.$set(this.searchFormField, "date", defaultDate);
   },
    addjixiaos(){
      this.$http.post('http://localhost:8080/performance/addPerformance',{
        perKind:this.addjixiaokaohe.perKind,
        perUser:this.addjixiaokaohe.perUser,

        perValue:this.addjixiaokaohe.perValue,
        // perDate:this.addjixiaokaohe.perDate,
        perDescribe:this.addjixiaokaohe.perDescribe,

     
      }).then(res=>{
        if(res.data.code == 200){
          this.jixiaodialogVisible = false
          this.$message.success('添加考核成功')
        }else{
          this.$message.error(res.data.msg + '----请重新考核')
           this.jixiaodialogVisible = false
        }
      })
    },
    jixiaochange(val){
      this.vals = val
    },
    handlekaohe(val){
      console.log(val)
      this.$http.get('http://localhost:8080/credit/getAllCredit').then(res=>{
        var data = res.data.data
        for(var i in data){
          var obj = {}
          obj.value = data[i].cname
          obj.label = data[i].cname
          this.option.push(obj)
        }
        console.log(this.option)
      })
      this.jixiaodialogVisible = true
      this.addjixiaokaohe.perUser = val.pId
    },
    addgangwei(){
      var that = this
      if(this.addppost.ppost){
that.$http.post('http://localhost:8080/getAll/addPost',{
        poDepartment:this.addppost.pdepartment,
         poName:this.addppost.department,
         ppost:this.addppost.ppost
      }).then(res=>{
        if(res.data.code == 200){
          this.ppostVisible = false
          this.$message.success('添加成功')
        }else{
          this.$message.error(res.data.msg + '----请重新添加')
           this.ppostVisible = false
        }
        
      })
      }else{
        that.$message.error('请完整信息')
      }
      
    },
    addkeshi(){
      var that = this
      if(this.adddepartment.department){
that.$http.post('http://localhost:8080/getAll/addTeam',{
        tDepartment:this.adddepartment.pdepartment,
        tName:this.adddepartment.department
      }).then(res=>{
        if(res.data.code == 200){
          this.pteamsVisible = false
          this.$message.success('添加成功')
        }else{
          this.$message.error(res.data.msg + '----请重新添加')
           this.pteamsVisible = false
        }
        
      })
      }else{
        that.$message.error('请完整信息')
      }
      
      console.log(this.adddepartment.pdepartment)
    },
    addbumen(){
      var that = this
      that.$http.post('http://localhost:8080/getAll/addDepart',{
        dName:this.addpteams.pdepartment
      }).then(res=>{
        if(res.data.code == 200){
          this.departmentVisible = false
          this.$message.success('添加成功')
        }else{
          this.$message.error(res.data.msg + '----请重新添加')
           this.departmentVisible = false
        }
        
      })
    },
    addpteames(){
      this.pteamsVisible = true
      this.$http.get('http://localhost:8080/getAll/getDepart').then(res=>{
            var data = res.data
            this.pdepartment = data.data
            
            if(this.pdepartment){
              this.adddepartment.pdepartment = this.pdepartment[0].dname
            }else{
              this.adddepartment.pdepartment = ''
            }
      

      })
    },
    addpposts(){
      this.ppostVisible = true
      this.$http.get('http://localhost:8080/getAll/getDepart').then(res=>{
            var data = res.data
            this.pdepartment = data.data
            if(this.pdepartment){
              this.addppost.pdepartment = this.pdepartment[0].dname
            }else{
              this.addppost.pdepartment = ''
            }
       this.$http.post('http://localhost:8080/getAll/getTeam',{
        pDepartment:this.addppost.pdepartment
      }).then(res=>{
        var data = res.data
        this.pteam = data.data
        if(this.pteam){
          this.addppost.department = this.pteam[0].tname
        }else{
          this.addppost.department = ''
        }

      })
      })
    },
    adddepartments(){
      this.departmentVisible = true
      
    },
    ppostchange(val){
      console.log(val)
    },
    pteamchange(val){
      console.log(val)
    },

    partmentschange(val){
 this.$http.post('http://localhost:8080/getAll/getTeam',{
        pDepartment:val
      }).then(res=>{
        var data = res.data
        this.pteam = data.data
        if(this.pteam){
          this.addppost.department = this.pteam[0].tname
        }else{
          this.addppost.department = ''
        }
      })
    },

    partmentchange(val){
      this.$http.post('http://localhost:8080/getAll/getTeam',{
        pDepartment:val
      }).then(res=>{
        var data = res.data
        this.pteam = data.data
        if(this.pteam){
          this.tables.pteam = this.pteam[0].tname
        }else{
          this.tables.pteam = ''
        }
  this.$http.post('http://localhost:8080/getAll/getPost',{
          pDepartment: val
        }).then(res=>{
          var data = res.data
          this.ppost = data.data
          if(this.ppost){
            this.tables.ppost = this.ppost[0].poName
          }else{
            this.tables.ppost = ''
          }

        })
        console.log(res)
      })
    },
      addpeople(){
        this.isadd = 1
          this.dialogVisible = true
          this.disable = false
          this.$http.get('http://localhost:8080/getAll/getDepart').then(res=>{
            var data = res.data
            this.pdepartment = data.data
            this.tables.pdepartment = this.pdepartment[0].dname
          // console.log(this.phospital)
          this.$http.post('http://localhost:8080/getAll/getTeam',{
        pDepartment:this.tables.pdepartment
      }).then(res=>{
        var data = res.data
        this.pteam = data.data
        if(this.pteam){
          this.tables.pteam = this.pteam[0].tname
        }else{
          this.tables.pteam = ''
        }
         this.$http.post('http://localhost:8080/getAll/getPost',{
          pDepartment: this.tables.pdepartment
        }).then(res=>{
          var data = res.data
          this.ppost = data.data
          if(this.ppost){
            this.tables.ppost = this.ppost[0].poName
          }else{
            this.tables.ppost = ''
          }

        })
      })
    })
        
     

      },
      add(){
        this.$http.post('http://localhost:8080/personnelManagement/addUser ',{
              pId:this.tables.pid,
              pName:this.tables.pname,
              pHospital:this.tables.phospital,
              pDepartment:this.tables.pdepartment,
              pTeam:this.tables.pteam,
              pPost:this.tables.ppost,
              pPhone:this.tables.pphone,
              pGender:this.tables.pgender,
              pSalary:this.tables.psalary
          }).then(res=>{
              var data = res.data
              if(data.code == 200){
                  this.$message.success('添加成功')
                  this.isadd = ''
                  this.$router.go(0)
                  for(var i in this.tables){
                      this.tables[i] = ''
                  }
                //   console.log(this.tables)
                  this.dialogVisible = false
              }
            //   console.log(res)
          })
      },
      update(){
        
          this.$http.post('http://localhost:8080/personnelManagement/adminUpdate ',{
              pId:this.tables.pid,
              pName:this.tables.pname,
              pHospital:this.tables.phospital,
              pDepartment:this.tables.pdepartment,
              pTeam:this.tables.pteam,
              pPost:this.tables.ppost,
              pPhone:this.tables.pphone,
              pSalary:this.tables.psalary
          }).then(res=>{
              var data = res.data
              if(data.code == 200){
                  this.$message.success('修改成功')
                    this.$router.go(0)
                  for(var i in this.tables){
                    this.tables[i] = ''
                  }
                //   console.log(this.tables)
                  this.dialogVisible = false
              }
            //   console.log(res)
          })
      },
    getAll(){
        this.$http.get('http://localhost:8080/personnelManagement/getAll ').then(res=>{
            var data = res.data
            this.tableData = data.data
            })
    },
    handleEdit(e){
      this.$http.get('http://localhost:8080/getAll/getDepart').then(res=>{
        var data = res.data
          this.pdepartment = data.data
          // console.log(this.phospital)
        })
        this.tables.pid = e.pId
        this.tables.pname = e.pName
        this.tables.phospital = e.pHospital
        this.tables.pdepartment = e.pDepartment
        this.$http.post('http://localhost:8080/getAll/getTeam',{
          tDepartment:this.tables.pdepartment
        }).then(res=>{
          var data = res.data
          this.pteam = data.data
        })
        this.tables.pteam = e.pTeam
        this.$http.post('http://localhost:8080/getAll/getPost',{
          poDepartment:this.tables.pteam
        }).then(res=>{
          var data = res.data
          this.ppost = data.data
        })
        this.tables.ppost = e.pPost
        this.tables.pgender = e.pGender
        this.tables.psalary = e.pSalary
        this.tables.pphone = e.pPhone
        // this.
        this.dialogVisible = true
        this.disable = true
    },
    handleDelete(e){
        this.$http.post('http://localhost:8080/personnelManagement/adminDelete',{
            pId : e.pId
        }).then(res=>{
            this.$router.go(0)
            // console.log(res)
        })
    }
  },
  mounted(){
      this.getAll()
      this.getNowTime()
  }
}
</script>

<style  scoped>

</style>
