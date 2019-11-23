<template>
  <div class="goodslist">
    <el-main>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" ></el-table-column>
        <el-table-column prop="name" label="标题" ></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column prop="radio" label="分类"></el-table-column>
        <el-table-column prop="image" label="图片"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="freight" label="运费"></el-table-column>
        <el-table-column prop="buyend" label="售后"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
            <el-button
              type="text"
              size="small"
              @click="$router.push(`setgoods/${scope.row._id}`)"
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
      //获取数据
      const res = await this.$http.get("/getgoodslist");
      this.items = res.data;
    },
    //删除
    async remove(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          //删除id匹配的值
          await this.$http.delete(`/getgoodslist/${row._id}`);
          //成功提示
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          //删除成功重新获取数据
          this.fetch();
        })
        //取消提示
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    //进入页面直接获取数据
    this.fetch();
  }
};
</script>
