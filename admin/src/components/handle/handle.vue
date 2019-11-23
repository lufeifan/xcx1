<template>
  <div class="goodslist">
    <el-main>
      <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="300"></el-table-column>
        <el-table-column prop="name" label="商品" width="300"></el-table-column>
        <el-table-column prop="userid" label="用户" width="300"></el-table-column>
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
    
  },
};
</script>
