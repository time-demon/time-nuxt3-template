<!-- 个人中心 -->
<template>
  <div class="personalBox">
    <div class="personal box">
      Hello~{{ store_adminInfor.adminInfor.account }}
      22
    </div>
    <el-upload
      v-model:file-list="fileList"
      class="upload-demo"
      action="https://cdn.timebk.cn/upload/img/ces"
      multiple
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :limit="3"
      :on-exceed="handleExceed"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { adminInfor } from "~/stores/adminInfor";
const store_adminInfor = reactive<any>(adminInfor());

definePageMeta({
  order: 999999,
  title: "个人中心",
  icon: "sg sg-user",
});

const fileList = ref<UploadUserFile[]>([
]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};
</script>

<style scoped lang="scss">
.personalBox {
  display: flex;
  vertical-align: top;
  flex-wrap: wrap;
  > .personal {
    width: 300px;
    max-width: 100%;
  }
}
</style>
