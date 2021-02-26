<template>
  <div id="apps">
        <div class="content">

            <div class="content_input">
              <div class="avator_img">
                <img :src="avatorurl" alt="">
              </div>
                <el-input v-model="UserName" clearable placeholder="用户名"></el-input>
                <el-input v-model="PassWord" clearable show-password placeholder="密码"></el-input>
                <div class="content_button">
                    <el-button v-if="people" type="primary" @click="SignIn">登录</el-button>
					<el-button v-else type="primary" @click="adminSignIn">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../assets/ribbon'
// import '../assets/index'
export default {
  name: 'apps',
  data () {
    return {
      UserName: '',
	  people: true,
      PassWord: '',
      avatorurl: require('../assets/morenavator_img.png')
    }
  },
  watch:{
    'UserName':function(vnew,vold){
      if(vnew == 'admin'){
        this.avatorurl = require('../assets/admin.png')
		this.people = false
      }else if(!isNaN(vnew) && vnew.length == 8){
        this.avatorurl = require('../assets/avator_img.png')
      }else{
        this.avatorurl = require('../assets/morenavator_img.png')
      }
    }
  },
  methods: {
			adminSignIn(){
				let that = this;
                let username = that.UserName;
                let password = that.PassWord;
                if (!username) {
                    this.$notify.error({
                        title: '错误',
                        message: '用户名不能为空'
                    });
                    return;
                } else if (!password) {
                    this.$notify.error({
                        title: '错误',
                        message: '密码不能为空'
                    });
                    return;
                } else {
                  this.$http.post('http://localhost:8080/personnelManagement/adminLogin', {
                      pId: this.UserName,
                      pPwd: this.PassWord
                    })
                    .then(function (response) {
                      console.log(response)
                      var data = response.data
                      if(data.code == 200){
						that.$message.success('登陆成功')
						that.$router.push({
						　　path: '/table',
						　　query: {
						　　　　name: 'admin',
						　　　　
						　　}
						});
                      }else{
                        alert(data.msg)
                      }
                    // this.$router.push('/table')
                    })
                }
			},
            SignIn() {
                let that = this;
                let username = that.UserName;
                let password = that.PassWord;
                if (!username) {
                    this.$notify.error({
                        title: '错误',
                        message: '用户名不能为空'
                    });
                    return;
                } else if (!password) {
                    this.$notify.error({
                        title: '错误',
                        message: '密码不能为空'
                    });
                    return;
                } else {
                  this.$http.post('http://localhost:8080/personnelManagement/login', {
                      pId: this.UserName,
                      pPwd: this.PassWord
                    })
                    .then(function (response) {
                    //   console.log(response)
					  var data = response.data
					  localStorage.setItem('name', that.UserName);
					  localStorage.setItem('password', that.PassWord);
                      if(data.code == 200){
						that.$message.success('登陆成功')
						that.$router.push({
						　　path: '/usertable',
						　　query: {
						　　　　name: that.UserName,
						　　　　
						　　}
						});
                      }else{
                        that.$message.error(data.msg)
                      }
                    // this.$router.push('/table')
                    })
                    
                }
            }
        }
}
</script>

<style  scoped>
.content {
	width: 500px;
	height: 300px;
	box-sizing: border-box;
	padding: 0 50px;
	border-radius: 5px;
	box-shadow: 0px 2px 12px 0px rgba(105, 105, 105, 0.07);
	background: rgba(255, 255, 255, 0.5);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	animation: mymove 1s ease-in-out  alternate;
	transition: 1.5s;
}

@keyframes mymove {
	0% {
		width: 0px;
		height: 5px;
	}

	10% {
		width: 50px;
		height: 5px;
	}

	15% {
		width: 100px;
		height: 5px;
	}

	20% {
		width: 150px;
		height: 5px;
	}

	25% {
		width: 200px;
		height: 5px;
	}

	30% {
		width: 250px;
		height: 5px;
	}

	35% {
		width: 300px;
		height: 5px;
	}

	40% {
		width: 350px;
		height: 5px;
	}

	45% {
		width: 450px;
		height: 5px;
	}

	50% {
		width: 500px;
		height: 5px;
	}

	55% {
		height: 30px;
	}

	60% {
		height: 60px;
	}

	65% {
		height: 90px;
	}

	70% {
		height: 120px;
	}

	75% {
		height: 150px;
	}

	80% {
		height: 180px;
	}

	85% {
		height: 210px;
	}

	90% {
		height: 240px;
	}

	95% {
		height: 240px;
	}

	100% {
		height: 300px;
	}
}

.content_input {
	width: 300px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

}

.avator_img{
  width: 80px;
  height: 80px;
  border: 1px solid #eee;
  border-radius: 50%;
  position: absolute;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  left: 50%;
  transform: translate(-50% , -120%);
  background-color: #fff;
}
.avator_img img {
  width: 100%;
  border-radius: 50%;
  background-color: #eee;
  height: 100%;
}

.content_button {
	margin-top: 10px;
}

.el-input {
	margin-bottom: 25px;
}

.title {
	text-align: center;
	font-size: 24px;
	margin-bottom: 30px;
	font-weight: bold;
	color: #606266;
}

.el-button--primary {
	width: 100%;

}
</style>
