<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive } from "vue";
import Back from "@/components/Back.vue";
import { axios } from "../http/axios";
import tool from "../util/config";

const route = useRoute();
const router = useRouter();
const lessionList = reactive({ list: [{ tokenAward: "", title: "" }] });
const obj = reactive(JSON.parse(String(route.params.obj)));

function linkTo(item: any, index: any) {
  router.push({
    name: "detail",
    params: {
      obj: JSON.stringify({
        id: item.id,
        index,
        total: lessionList.list.length,
      }),
    },
  });
}

onMounted(() => {
  console.log(route.params.obj);
  axios({
    url:
      tool.network +
      "courses/getlesson?id=" +
      JSON.parse(String(route.params.obj)).id,
    data: {},
    method: "get",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    lessionList.list = res;
    console.log("lessionList:", res);
  });
});
</script>

<template>
  <div class="content">
    <Back msg="hehe" class="back" />
    <div class="flex-col flex-auto group_2 space-y-14">
      <div class="flex-col justify-start self-start text-wrapper">
        <span class="font_2 text_4" v-if="lessionList.list.length > 0"
          >Reward:
          {{
            lessionList.list
              .map((item) => {
                return item.tokenAward;
              })
              .reduce((a, b) => {
                return a + b;
              })
          }}
          RBT</span
        >
      </div>
      <div class="flex-col group_3">
        <span class="text_5">Course {{ obj.id }}: {{ obj.title }}</span>
        <div class="flex-col justify-start items-start divider">
          <div class="flex-col justify-start section">
            <div class="flex-col justify-start items-start relative">
              <div class="absolute divider_2_1"></div>
              <div class="absolute divider_2"></div>
            </div>
          </div>
        </div>
        <div
          class="flex-col list space-y-10"
          v-if="lessionList.list.length > 0"
        >
          <div
            @click="linkTo(item, index + 1)"
            :key="index"
            class="flex-col items-start list-item section_2 space-y-12"
            v-for="(item, index) in lessionList.list"
          >
            <span class="font_2 text_6">Earned {{ item.tokenAward }} RBT</span>
            <span class="font_3 text_7">
              {{ item.title }}
            </span>
          </div>
        </div>
        <div v-else class="flex-col list space-y-10" style="font-size: 20px">
          No lessons
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.back {
  margin-left: 22px;
  color: #397cd9;
}

.content {
  padding-top: 20px;
}

.font_2 {
  font-size: 12px;
  font-family: Inter;
  line-height: 9px;
  color: #ffffff;
}

.group_2 {
  padding: 4px 18px 279px;
  overflow-y: auto;
}

.space-y-14 > *:not(:first-child) {
  margin-top: 14px;
}

.text-wrapper {
  padding: 8px 0;
  background-color: #eff3ff;
  border-radius: 5px;
}

.text_4 {
  margin-left: 4px;
  color: #9134e2;
}

.group_3 {
  padding-left: 22px;
  padding-right: 10px;
}

.text_5 {
  margin-left: 6px;
  color: #000000;
  font-size: 20px;
  font-family: Inter;
  font-weight: 600;
  line-height: 27px;
}

.divider {
  margin-top: 22px;
  background-color: #edf2f7;
}

.section {
  background-color: #9134e2;
  width: 183px;
}

.divider_2 {
  position: absolute;
  top: 0;
  left: 0;
  height: 6px;
  background-color: #9134e2;
  width: 183px;
  border-radius: 2px;
}

.divider_2_1 {
  position: absolute;
  top: 0;
  left: 0;
  height: 6px;
  background-color: #cfcfcf;
  width: 310px;
  border-radius: 2px;
}

.image_2 {
  width: 48.5px;
  height: 4px;
}

.image_3 {
  width: 32px;
  height: 4px;
}

.pos {
  position: absolute;
  left: 33.5px;
  bottom: 0;
}

.pos_2 {
  position: absolute;
  left: 50px;
  bottom: 0;
}

.pos_3 {
  position: absolute;
  left: 67px;
  bottom: 0;
}

.pos_4 {
  position: absolute;
  right: 67.5px;
  bottom: 0;
}

.pos_5 {
  position: absolute;
  right: 50.5px;
  bottom: 0;
}

.pos_6 {
  position: absolute;
  right: 34px;
  bottom: 0;
}

.pos_7 {
  position: absolute;
  right: 0;
  bottom: 0;
}

.list {
  margin-top: 31px;
}

.space-y-10 > *:not(:first-child) {
  margin-top: 10px;
}

.list-item {
  margin-right: 11px;
}

.section_2 {
  padding: 20px;
  background-color: #9134e2;
  border-radius: 4px;
  overflow: hidden;
}

.text_6 {
  color: #fff;
}

.font_3 {
  font-size: 18px;
  font-family: Inter;
  line-height: 17px;
  color: #ffffff;
}

.text_7 {
  line-height: 27px;
}

.space-y-12 > *:not(:first-child) {
  margin-top: 8px;
}
</style>
