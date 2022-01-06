<template>
  <el-form style="width: 40%" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


    <el-form-item label="设备名" prop="name">
      <el-input v-model="ruleForm.name"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交表单</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
<!--      <el-button @click="test() ">test</el-button>-->
    </el-form-item>
  </el-form>
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      ruleForm: {
        name: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入名词', trigger: 'change' }
        ],
      }
    };
  },
  methods: {
    test(){
      console.log(this.$data.ruleForm)
    },
    submitForm(formName) {
      const _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //将表单的数据提交到后台
          axios.post("http://localhost:8181/device/save",_this.ruleForm).then(function (resp){
            if(resp.data == "success" ){
              //添加成功，屏幕上方会显示信息
              _this.$message({
                message: '成功添加',
                type: 'success'
              });
            //  添加完成之后，跳转到设备管理界面
              _this.$router.push("/deviceManage")
            }else {
              _this.$message.error('添加失败');
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>