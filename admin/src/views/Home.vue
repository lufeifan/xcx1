<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1','3']" :default-active="$route.path">

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>物品管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="/goodslist">物品列表</el-menu-item>
            <el-menu-item index="/setgoods">新建物品</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>订单管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="/handle">已处理</el-menu-item>
            <el-menu-item index="/unhandle">未处理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>管理员
          </template>
          <el-menu-item-group>
            <el-menu-item index="/adminlist">管理员列表</el-menu-item>
            <el-menu-item index="/setadmin">创建管理员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>系统设置
          </template>
          <el-menu-item-group>
            <el-menu-item @click="back">退出系统</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <span>后台管理</span>
      </el-header>
      <router-view></router-view>
    </el-container>
  </el-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
}
</style>


<script>
export default {
  methods: {
    back() {
      this.$confirm("是否退出登录", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          sessionStorage.clear();
          this.$router.push("/");
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消!"
          });
        });
    }
  }
};
</script>