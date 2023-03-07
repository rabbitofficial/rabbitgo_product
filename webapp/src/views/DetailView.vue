<template>
  <div class="content">
    <Back msg="hehe" class="back" />
    <div class="flex-col flex-auto group_2">
      <div class="flex-col space-y-20">
        <span class="self-start font_1 text_4"
          >Lesson {{ obj.index }} of {{ obj.total }}</span
        >
        <span class="self-center text_5">{{
          lessonDetail.list[0]?.title
        }}</span>
      </div>
      <!-- <span class="self-start font_1 text_6">{{ lessonDetail.list[0]?.content }}</span> -->
      <span
        class="self-start font_1 text_6"
        v-html="lessonDetail.list[0]?.content"
      ></span>
      <div
        @click="linkTo('')"
        class="flex-col justify-center items-center self-center button"
      >
        <span class="text_7">Take quiz</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import Back from "@/components/Back.vue";
import { axios } from "../http/axios";
import tool from "../util/config";

const route = useRoute();
const router = useRouter();

const lessonDetail = reactive({ list: [{ title: "", content: "" }] });

const obj = JSON.parse(String(route.params.obj));

onMounted(() => {
  axios({
    url: tool.network + "courses/getlessonDetail?id=" + obj.id,
    data: {},
    method: "get",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    lessonDetail.list = res;
    console.log("lessonDetail:", res);
  });
});
function linkTo(item: any) {
  router.push({
    name: "quiz",
    params: {
      obj: JSON.stringify(item),
    },
  });
}
</script>

<style scoped>
.back {
  margin-left: 22px;
  color: #397cd9;
}

.content {
  padding-top: 20px;
}

.font_1 {
  font-size: 16px;
  font-family: Inter;
  line-height: 12px;
}

.group_2 {
  padding: 8px 22px 32px;
  overflow-y: auto;
}

.space-y-20 > *:not(:first-child) {
  margin-top: 20px;
}

.text_4 {
  color: #777777;
  line-height: 12.5px;
}

.text_5 {
  color: #000000;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 19.5px;
}

.text_6 {
  margin-top: 38px;
  margin-bottom: 38px;
  color: #000000;
  line-height: 19px;
}

.button {
  position: fixed;
  bottom: 60px;
  padding: 14px 0 14px;
  background-color: #9134e2;
  border-radius: 10px;
  width: 240px;
}

.text_7 {
  color: #ffffff;
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
  line-height: 17.5px;
}
</style>
