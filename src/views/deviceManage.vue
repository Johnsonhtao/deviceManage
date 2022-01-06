<template>

  <div>
    <el-table
        :data="tableData"
        border
        style="width: 80%">
      <el-table-column
          fixed
          prop="id"
          label="编号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="name"
          label="设备名"
          width="120">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="120">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="deleteByid(scope.row)"  type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        background
        page-size="5"
        layout="prev, pager, next"
        :total="total"
        @current-change="page">
    </el-pagination>
  </div>
</template>

<script>
import axios from "axios";

export default {
  methods: {

    deleteByid(row){
      // alert(row.id)
      console.log(row.id)
      const _this = this;
      axios.delete('http://localhost:8181/device/deleteById/'+row.id).then(function (resp) {
        _this.$message({
          message: '成功删除'+row.name,
          type: 'success'
        });
      })
      //当删除之后，重新刷新界面
      window.location.reload()

    },
    //获取id来进行更新
    edit(row) {
      // console.log(row)
      this.$router.push({
        path:'/deviceUpdate',
        query:{
          id: row.id
        }
      })
    },
    //分页
    page(currentpage){
      // alert(currentpage)
      const _this = this;
      axios.get('http://localhost:8181/device/findAll/'+currentpage+'/5').then(function (resp) {
        //为什么这么写，直接console.log就能看出来，要获取的字段
        _this.tableData = resp.data.content;
        _this.total = resp.data.totalElements;
        // console.log(resp);
      })
    },

  },
  //data 和 create是同等级别的
  data() {
    return {
      total:null,
      tableData: null,
    }
  },
  //初始化函数
  created(){
    const _this = this;
    axios.get('http://localhost:8181/device/findAll/1/5').then(function (resp){
      _this.tableData = resp.data.content;
      _this.total = resp.data.totalElements;
      console.log(resp);
    })
  },
}
</script>