<template>
  <div class="adminlist">
    <el-main>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="200"></el-table-column>
        <el-table-column prop="username" label="账号" width="180"></el-table-column>
        <el-table-column prop="password" label="密码" ></el-table-column>
        <el-table-column fixed="right" label="操作" width="140">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
            <el-button
              type="text"
              size="small"
              @click="$router.push(`setadmin/${scope.row._id}`)"
            >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/adminuser");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`/adminuser/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>
