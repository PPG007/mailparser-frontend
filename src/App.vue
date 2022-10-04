<template>
  <div id="app">
    <div class="my-input">
      <el-form label-position="top" label-width="80px" :model="config">
        <el-form-item label="Cookie">
          <el-input v-model="config.cookie"></el-input>
        </el-form-item>
        <el-form-item label="CSRF Token">
          <el-input v-model="config.token"></el-input>
        </el-form-item>
        <el-form-item label="需要多少天内的日报">
          <el-input v-model.number="config.length"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit" :loading="isLoading"
        >搜索</el-button
      >
    </div>
    <div class="my-table">
      <el-table :data="results" height="450">
        <el-table-column
          prop="sendAt"
          label="发送时间"
          width="150"
          sortable
        ></el-table-column>
        <el-table-column prop="content" label="内容"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              @click="copyToClipboard(scope.row.content)"
              type="primary"
              size="small"
              >复制</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Mail from "@/engine/Mail.js";
import {
  Table,
  TableColumn,
  Input,
  Button,
  Form,
  FormItem,
  Message,
} from "element-ui";

export default {
  name: "App",
  components: {
    ElTable: Table,
    ElTableColumn: TableColumn,
    ElInput: Input,
    ElButton: Button,
    ElForm: Form,
    ElFormItem: FormItem,
  },
  data() {
    return {
      results: [],
      config: {
        length: 0,
        cookie: "",
        token: "",
      },
      isLoading: false,
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      this.results = [];
      const params = {
        length: this.config.length,
        cookie: this.config.cookie,
        token: this.config.token,
      };
      try {
        const resp = await Mail.fetch(params);
        const items = resp.data.items;
        window.open(resp.data.fileURL);
        items.forEach((item) => {
          this.results.push(item);
        });
      } catch (err) {
        Message.error(err.response.data);
      }
      this.isLoading = false;
    },
    copyToClipboard(content) {
      navigator.clipboard.writeText(content);
      Message.success("copied!");
    },
  },
};
</script>

<style>
#app {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
}
body {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 70px;
}
.my-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: space-around;
  margin-bottom: 30px;
}
</style>
