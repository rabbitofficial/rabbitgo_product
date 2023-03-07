<template>
  <div>
    <Back msg="hehe" class="back" />
    <div class="flex-col flex-auto group_2">
      <div class="flex-col items-center space-y-14">
        <img class="image_2" src="../assets/cong.png" />
        <span class="text_4">Congrats!</span>
      </div>
      <span class="text_5">You earned 10RBT</span>
      <div class="flex-col group_3 space-y-14">
        <div
          @click="linkTo()"
          class="flex-col justify-start items-center button"
        >
          <span class="font_2 text_6">Next Lesson</span>
        </div>
        <div
          @click="replaceTo()"
          class="flex-col justify-start items-center button_2"
        >
          <span class="font_2 text_7">View my Wallet</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from "@/components/Back.vue";
import { useRouter } from "vue-router";

const router = useRouter();
function linkTo() {
  router.push({
    name: "quiz",
    params: {
      obj: JSON.stringify(""),
    },
  });
}

function replaceTo() {
  router.replace({
    name: "learnhome",
  });
}
</script>

<style scoped>
.back {
  margin-left: 22px;
  color: #397cd9;
  margin-top: 20px;
}

.group_2 {
  padding: 70px 62px 224px 62px;
  overflow-y: auto;
}

.image_2 {
  width: 174px;
  height: 139px;
}

.text_4 {
  color: #000000;
  font-size: 30px;
  font-family: Inter;
  font-weight: 700;
  line-height: 28.5px;
}

.text_5 {
  margin-top: 38px;
  color: #000000;
  font-size: 28px;
  font-family: Inter;
  font-weight: 700;
  line-height: 21px;
}

.group_3 {
  margin-top: 78px;
  padding: 0 4px;
}

.space-y-14 > *:not(:first-child) {
  margin-top: 14px;
}

.button {
  margin-right: 2px;
  padding: 18px 0;
  background-color: #9134e2;
  border-radius: 10px;
}

.font_2 {
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
}

.text_6 {
  color: #ffffff;
  line-height: 13.5px;
}

.button_2 {
  margin-right: 2px;
  padding: 18px 0 14px;
  background-color: #ebeffe;
  border-radius: 10px;
}

.text_7 {
  color: #000000;
  line-height: 17.5px;
}
</style>
