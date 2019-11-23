<template>
  <div>
    <el-card header="欢迎使用" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="model.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      sessionStorage.token = res.data.token;
      this.$message({
        type: "success",
        message: "登录成功!"
      });
      this.$router.push("/goodslist");
    }
  }
};
</script>

<style scoped>
.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>