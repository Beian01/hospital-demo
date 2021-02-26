<template>
  <div class="container">
    <el-container>
      <el-header>
        <div class="title">
          <div class="information">
            <img src="../assets/avator_img.png" class="" alt="" />
            <p
              style="
                transform: translate(42px, -19px);
                font-size: 16px;
                font-weight: bolder;
              "
            >
              {{Id}}
            </p>
          </div>
          <div
            style="
              float: right;
              position: relative;
              display: flex;
              flex-direction: row;
              height: 100%;
            "
          >
            <p
              style="
                margin: 0;
                padding: 0;
                font-weight: bolder;
                font-size: 20px;
                margin-right: 10px;
              "
            >
              高校闲置物品交易平台
            </p>
            <el-button
            @click="back()"
              style="
                height: 50%;
                transform: translate(10px, 10px);
                float: right;
              "
              >退出</el-button
            >
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside>
          <el-col>
            <el-menu
              router 
              background-color="#D3DCE6"
              text-color="#fff"
              class="el-menu-vertical-demo"
            >
              <el-menu-item index="">
                <i class="el-icon-data-line"></i>
                <span slot="title">成绩</span>
              </el-menu-item>
              <el-menu-item index="">
                <i class="el-icon-data-line"></i>
                <span slot="title">学生</span>
              </el-menu-item>
              <el-menu-item index="">
                <i class="el-icon-data-line"></i>
                <span slot="title">老师</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-aside>
        <el-main>
        <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Id:''
    };
  },
  methods:{
      back(){
          this.$router.push('/')
          localStorage.clear()
      }
  },
  created(){
    this.Id = this.$route.query.name
    // console.log(this.$route.query.name)
  }
};
</script>
<style scoped>
.information {
  width: 50px;
  display: flex;
  flex-direction: row;
  height: 50px;
  transform: translate(15%, 10%);
  margin-left: 5%;
}
.information img {
  box-shadow: 0 0 10px #ddd;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.title {
  width: 100%;
  margin: 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 0;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
html,
body,
.el-container {
  margin: 0;
  padding: 0;
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}

.el-container {
  direction: vertical;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>