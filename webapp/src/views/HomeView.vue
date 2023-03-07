<script setup lang="ts">
//import TheWelcome from '../components/TheWelcome.vue'
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
//import { useCounterStore } from "@/stores/counter";
import Back from "@/components/Back.vue";
import { axios } from "../http/axios";
import tool from "../util/config";
//const counter2 = useCounterStore();
const router = useRouter();
//const route = useRoute();
// reactive state
//const count = ref(0);
const objBackend = reactive({ list: [] });
const courseList = reactive({ list: [{ title: "" }] });
const total = ref(0);

const obj = reactive({
  lessons: [
  ],
  menuList: [
    {
      title: "Courses",
      isActive: true,
    },
    {
      title: "Description",
      isActive: false,
    },
  ],
});

function linkTo(item: any) {
  router.push({
    name: "content",
    params: {
      obj: JSON.stringify(item),
    },
  });
}

function switchMenu(e: any) {
  obj.menuList.forEach((item) => {
    item.isActive = false;
  });

  e.isActive = true;
}

// lifecycle hooks
onMounted(() => {
  axios({
    url: tool.network + "courses/users",
    data: {},
    method: "get",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    objBackend.list = res;
    console.log("objBackend:", res);
  });

  axios({
    url: tool.network + "courses/totalRewardById",
    data: {},
    method: "get",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    total.value = res[0].total;
    console.log("totalRewardById:", res);
  });

  axios({
    url: tool.network + "courses/courseList",
    data: {},
    method: "get",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    courseList.list = res;
    console.log("courseList:", res);
  });
  //console.log(`The initial count is ${count.value}.`)
});
</script>

<template>
  <div class="content">
    <Back msg="hehe" class="back" />
    <div class="flex-col page">
      <div class="flex-col flex-auto group space-y-27">
        <div
          class="flex-col justify-start items-center self-start text-wrapper"
        >
          <span class="font_3 text_4">ongoing</span>
          <!-- {{ counter2.count }} -->
        </div>
        <div class="flex-col items-center space-y-16">
          <span class="text_5">Crypto Trading Learning Course</span>
          <span class="text_6"
            >2022/12/28 00:00 ~ 2023/03/30 20:30 (UTC+08:00)</span
          >
        </div>
        <div class="flex-col">
          <div class="flex-col relative section space-y-26">
            <div class="flex-col space-y-10">
              <span class="self-start font_4 text_7">Reward</span>
              <div class="flex-row justify-between items-center">
                <span class="font_4 text_8">Token</span>
                <div class="flex-row items-center group_2">
                  <img class="shrink-0 image_2" src="../assets/rabbit.png" />
                  <span class="font_1 text_9">{{ total }} RBT</span>
                </div>
              </div>
            </div>
            <div class="flex-col space-y-18">
              <div class="flex-row justify-between">
                <span class="text_10"
                  >Learner({{ objBackend.list.length }})</span
                >
                <span class="self-start font_2 text_11">View All</span>
              </div>
              <div class="flex-row space-x-6 headlist">
                <div
                  v-for="(item, index) in objBackend.list"
                  :key="index"
                  class="flex-col justify-center items-center text-wrapper_2"
                >
                  <img
                    class="headImg"
                    :src="tool.network + 'static/Cranks.png'"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex-col group_3">
            <div
              class="flex-row justify-between items-center self-center group_4"
            >
              <div
                @click="switchMenu(item)"
                :class="{ active_menu: item.isActive }"
                :key="index"
                class="flex-col justify-start items-center text-wrapper_3"
                v-for="(item, index) in obj.menuList"
              >
                <span class="font_3 text_12"> {{ item.title }}</span>
              </div>
            </div>

            <div
              v-if="obj.menuList[0].isActive"
              class="flex-col group_5 space-y-8"
            >
              <div
                class="flex-row items-center section_2 space-x-8"
                :key="index"
                v-for="(item, index) in courseList.list"
              >
                <div
                  class="flex-col justify-start items-center shrink-0 text-wrapper_4"
                >
                  <span class="font_5">{{ index + 1 }}</span>
                </div>
                <span class="font_6 text_14" @click="linkTo(item)">
                  <!-- <RouterLink to="/content">{{ item.title }}</RouterLink> -->
                  <!-- @ts-nocheck -->
                  {{ item.title }}
                </span>
              </div>
            </div>

            <div
              v-if="obj.menuList[1].isActive"
              class="flex-col group_5 space-y-8 desfont"
            >
              <span class=""
                >we are launching this new year giveaway to welcome all members
                to</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.headlist {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
}

.headImg {
  width: 32px;
}

.back {
  margin-left: 22px;
  color: #397cd9;
  margin-top: 0px;
}

.content {
  padding-top: 20px;
}

.active_menu {
  border-bottom: solid 2px #9134e2 !important;
  color: #9134e2 !important;
}

.desfont {
  font-size: 16px;
}

.page {
  background-color: #ffffff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}

.header {
  padding: 14px 0 2px 16px;
  height: 46px;
}

.font_1 {
  font-size: 16px;
  font-family: Inter;
  line-height: 11.5px;
  color: #ffffff;
}

.text_2 {
  color: #397cd9;
  line-height: 12px;
}

.pos_2 {
  position: absolute;
  left: 17px;
  top: 50%;
  transform: translateY(-50%);
}

.space-y-4 > *:not(:first-child) {
  margin-top: 4px;
}

.text {
  color: #000000;
  font-size: 16px;
  font-family: Inter;
  line-height: 15.5px;
}

.font_2 {
  font-size: 12px;
  font-family: Inter;
  line-height: 9px;
}

.text_3 {
  color: #777777;
}

.image {
  width: 43px;
  height: 30px;
}

.pos {
  position: absolute;
  right: 1px;
  top: 50%;
  transform: translateY(-50%);
}

.group {
  padding: 0 0 12px;
  overflow-y: auto;
}

.space-y-27 > *:not(:first-child) {
  margin-top: 27px;
}

.text-wrapper {
  margin-left: 22px;
  padding: 8px 0;
  background-color: #eff3ff;
  border-radius: 5px;
}

.font_3 {
  font-size: 14px;
  font-family: Inter;
  line-height: 13.5px;
}

.text_4 {
  color: #10a75f;
}

.space-y-16 > *:not(:first-child) {
  margin-top: 16px;
}

.text_5 {
  color: #000000;
  font-size: 20px;
  font-family: Inter;
  font-weight: 700;
  line-height: 19.5px;
}

.text_6 {
  color: #777777;
  font-size: 12px;
  font-family: Inter;
  line-height: 11px;
}

.section {
  margin: 0 24px;
  padding: 14px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 1px 2px #0000000f, 0px 1px 3px #0000001a;
}

.space-y-26 > *:not(:first-child) {
  margin-top: 26px;
}

.space-y-10 > *:not(:first-child) {
  margin-top: 10px;
}

.font_4 {
  font-size: 16px;
  font-family: Inter;
  line-height: 11.5px;
  font-weight: 600;
}

.text_7 {
  color: #9134e2;
  line-height: 12px;
}

.text_8 {
  color: #000000;
  line-height: 12px;
}

.group_2 {
  margin-right: 2px;
}

.image_2 {
  border-radius: 54.5px;
  width: 40px;
  height: 38px;
}

.text_9 {
  color: #000000;
  line-height: 12px;
}

.space-y-18 > *:not(:first-child) {
  margin-top: 18px;
}

.text_10 {
  color: #000000;
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 14.5px;
}

.text_11 {
  margin-right: 2px;
  color: #9134e2;
}

.space-x-6 > *:not(:first-child) {
  margin-left: 6px;
}

.text-wrapper_2 {
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #60d7db; */
  border-radius: 50%;
}

.group_3 {
  padding: 9px 38px 0;
}

.group_4 {
  width: 197px;
  border-bottom: solid 2px #e2e8f0;
}

.text-wrapper_3 {
  padding: 8px 0;
  width: 88px;
  height: 30px;
  color: #000000;
  /* border-bottom: solid 2px #9134e2; */
}

.text_12 {
  line-height: 10.5px;
}

.text_13 {
  margin-right: 14px;
  color: #1a202c;
}

.group_5 {
  padding-top: 20px;
}

.space-y-8 > *:not(:first-child) {
  margin-top: 8px;
}

.section_2 {
  margin-right: 4px;
  padding: 20px 31px;
  background-color: #eff3ff;
  border-radius: 4px;
  overflow: hidden;
}

.text-wrapper_4 {
  padding: 10px 0;
  background-color: #ffffff;
  border-radius: 50%;
  width: 35px;
  height: 35px;
}

.font_5 {
  font-size: 18px;
  font-family: Inter;
  line-height: 13.5px;
  font-weight: 600;
  color: #406cef;
}

.font_6 {
  font-size: 18px;
  font-family: Inter;
  line-height: 17px;
  font-weight: 600;
  color: #000000;
}

.text_14 {
  line-height: 27px;
}

.section_3 {
  margin-right: 4px;
  padding: 20px 0 8px;
  background-color: #eff3ff;
  border-radius: 4px;
  overflow: hidden;
}

.space-x-8 > *:not(:first-child) {
  margin-left: 8px;
}

.font_7 {
  font-size: 18px;
  font-family: Inter;
  line-height: 22px;
  font-weight: 600;
  color: #000000;
}

.space-x-10 > *:not(:first-child) {
  margin-left: 10px;
}

.text_15 {
  margin-top: 12px;
}

.space-x-12 > *:not(:first-child) {
  margin-left: 12px;
}

.text_16 {
  color: #000000;
  line-height: 14px;
}
</style>
