<template>
  <div class="setgoods">
    <el-main>
      <el-form
        :model="model"
        ref="model"
        :rules="rules"
        label-width="80px"
        @submit.native.prevent="submitForm('model')"
      >
        <!-- enctype="multipart/form-data" -->
        <el-form-item label="商品名" prop="name">
          <el-input v-model="model.name"></el-input>
        </el-form-item>

        <el-form-item label="商品内容" prop="content">
          <el-input v-model="model.content"></el-input>
        </el-form-item>

        <el-form-item label="商品价格" prop="price">
          <el-input v-model="model.price"></el-input>
        </el-form-item>

        <el-form-item label="商品运费" prop="freight">
          <el-input v-model="model.freight"></el-input>
        </el-form-item>

        <el-form-item label="售后保障" prop="freight">
          <el-input v-model="model.buyend"></el-input>
        </el-form-item>

        <el-form-item label="商品分类" prop="radio">
          <el-radio v-model="model.radio" label="1">海报</el-radio>
          <el-radio v-model="model.radio" label="2">周边</el-radio>
          <el-radio v-model="model.radio" label="3">礼品</el-radio>
          <el-radio v-model="model.radio" label="4">购票</el-radio>
        </el-form-item>

        <el-form-item label="图片" style="margin-top: 0.5rem;" prop="image">
          <el-upload
            class="avatar-uploader"
            :action="domain"
            :http-request="upqiniu"
            :show-file-list="false"
          >
            <img v-if="model.image" :src="model.image" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </div>
</template>

<script>
export default {
  name: "setgoods",
  data() {
    return {
      radio: "1",
      imageUrl: "",
      // 七牛云的上传地址，根据自己所在地区选择，我这里是华南区
      domain: "https://upload-z2.qiniup.com",
      // 这是七牛云空间的外链默认域名
      qiniuaddr: "lululua.cn",

      model: {},
      upload: false,
      //输入规则
      rules: {
        name: [{ required: true, message: "请输入商品名", trigger: "blur" }],
        content: [
          { required: true, message: "请输入商品内容", trigger: "blur" }
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        image: [{ required: true, message: "请输入商品图", trigger: "blur" }],
        radio: [{ required: true, message: "请输入商品类型", trigger: "blur" }],
        freight: [
          { required: true, message: "请输入商品运费", trigger: "blur" }
        ],
        buyend: [{ required: true, message: "请输入商品类型", trigger: "blur" }],
      }
    };
  },
  props: {
    id: {
      type: String
    }
  },
  methods: {
    //   保存
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
    // 上传数据到数据库
    async save() {
      if (this.id) {
        //访问后台数据。将数据上传修改
        await this.$http.put(`/getgoodslist/${this.id}`, this.model);
        // 跳转到商品列表
        this.$router.push("/goodslist");
        // 提示信息
        this.$message({
          type: "success",
          message: "修改成功!"
        });
      } else {
        await this.$http.post("/getgoodslist", this.model);
        this.$router.push("/goodslist");
        this.$message({
          type: "success",
          message: "创建成功!"
        });
      }
    },
    async fetch() {
      //通过id访问后台获取数据
      const res = await this.$http.get(`/getgoodslist/${this.id}`);
      this.model = res.data;
    },
    upqiniu(req) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let filetype = "";
      if (req.file.type === "image/png") {
        filetype = "png";
      } else {
        filetype = "jpg";
      }
      // 重命名要上传的文件
      const keyname =
        "lu" + new Date() + Math.floor(Math.random() * 100) + "." + filetype;
      // 从后端获取上传凭证token
      this.$http.get("/token").then(res => {
        // this.axios.get('http://139.155.12.117:3000/api/token').then(res => {
        const formdata = new FormData();
        formdata.append("file", req.file);
        formdata.append("token", res.data);
        formdata.append("key", keyname);
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$http.post(this.domain, formdata, config).then(res => {
          // this.axios.post(this.domain, formdata, config).then(res => {
          this.imageUrl = "http://" + this.qiniuaddr + "/" + res.data.key;
          this.$set(this.model, "image", this.imageUrl);
        });
      });
    }
  },

  created() {
    this.id && this.fetch();
  }
};
</script>
<style scoped>
/* .el-button {
  position: relative;
  left: 50%;
} */
.avatar-uploader .el-upload {
  border: 5px dashed #ca1717 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>>