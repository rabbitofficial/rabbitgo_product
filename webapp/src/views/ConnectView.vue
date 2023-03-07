<template>
  <div class="content">
    <Back msg="hehe" class="back" />
    <div class="flex-col flex-auto group_2">
      <span class="self-center text_4">Connect Wallet</span>
      <div class="group_3">
        <span class="font_2">By connecting a wallet, you agree to</span>
        <span class="font_2 text_5">Terms of Service</span>
        <span class="font_2">and</span>
        <span class="font_2 text_5">Privacy Policy</span>
        <span class="font_2">.</span>
      </div>
      <div class="flex-row self-center equal-division">
        <div class="flex-col items-center equal-division-item space-y-16">
          <img class="image_2" src="../assets/tonkeeper.png" />
          <span class="font_3 text_6">Tonkeeper</span>
        </div>
        <div class="flex-col items-center equal-division-item space-y-16">
          <img class="image_3" src="../assets/openmask.png" />
          <span class="font_3 text_6">OpenMask</span>
        </div>
      </div>
      <div class="flex-col justify-start items-center self-center button">
        <span class="text_7">Learn More</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Back from "@/components/Back.vue";
</script>

<style scoped>
.back {
  margin-left: 22px;
  color: #397cd9;
}

.content {
  padding-top: 20px;
}

.group_2 {
  padding: 38px 36px 20px 36px;
  overflow-y: auto;
}

.text_4 {
  color: #000000;
  font-size: 28px;
  font-family: Inter;
  font-weight: 700;
  line-height: 21px;
}

.group_3 {
  margin-top: 26px;
  line-height: 18px;
  text-align: center;
}

.font_2 {
  font-size: 15px;
  font-family: Inter;
  line-height: 18px;
  font-weight: 600;
  color: #777777;
}

.text_5 {
  text-decoration: underline;
}

.equal-division {
  margin-top: 62px;
  width: 234.5px;
}

.equal-division-item {
  flex: 1 1 117.5px;
  padding: 4px 4px 4px 28px;
}

.space-y-16 > *:not(:first-child) {
  margin-top: 16px;
}

.image_2 {
  border-radius: 10px;
  width: 75px;
  height: 75px;
}

.font_3 {
  font-size: 15px;
  font-family: Inter;
  line-height: 15px;
  font-weight: 600;
  color: #000000;
}

.text_6 {
  font-size: 16px;
}

.image_3 {
  width: 75px;
  height: 75px;
}

.button {
  margin-top: 32px;
  padding: 16px 0;
  background-color: #9134e2;
  border-radius: 20px;
  width: 119px;
}

.text_7 {
  color: #ffffff;
  font-size: 14px;
  font-family: Open Sans;
  font-weight: 700;
  line-height: 10px;
}
</style>
