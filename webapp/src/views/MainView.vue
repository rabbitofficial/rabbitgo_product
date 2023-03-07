<template>
  <div class="content">
    <div class="main flex-col">
      <img src="../assets/logo_main2.png" alt="" />
      <span>
        Welcome to the Rabbitgo Community Bot. Please tap the button below to
        make a request:
      </span>
    </div>

    <div class="connect flex-row justify-center items-center">
      <span @click="linkTo()">Connect Wallet</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function linkTo() {
  router.push({
    name: "learnhome",
    params: {},
  });
}
</script>

<style scoped>
.content {
  box-sizing: border-box;
  padding: 43px 33.5px 20px 33.5px;
}

.connect {
  width: 100%;
  font-size: 16px;
  color: #9134e2;
  padding-top: 20px;
}

.main span {
  font-size: 16px;
  color: black;
  box-sizing: border-box;
  padding: 10px;
}

.main img {
  width: 185px;
  align-self: center;
}

.main {
  width: 323px;
  height: 196px;
  background-color: #f1f1f3;
  border-radius: 25px;
}
</style>
