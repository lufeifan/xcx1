<template>
  <div class="setadmin">
    <el-main>
      <el-form :model="model" ref="model" :rules="rules" label-width="120px">
        <el-form-item required label="管理员账号" prop="username">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item required label="管理员密码" prop="password">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-button
          type="primary"
          native-type="submit"
          @click.native.prevent="submitForm('model')"
        >保存</el-button>
      </el-form>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "setadmin",
  data() {
    return {
      model: {},
      rules: {
        username: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.save();
        } else {
          window.console.log("error submit!!");
          return false;
        }
      });
    },
    async save() {
      if (this.id) {
        await this.$http.put(`/adminuser/${this.id}`, this.model);
        this.$router.push("/adminlist");
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        await this.$http.post("/adminuser", this.model);
        this.$router.push("/adminlist");
        this.$message({
          type: "success",
          message: "创建成功!"
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`/adminuser/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
<style scoped>
.el-button{
  margin-left: 160px;
}
</style>>

