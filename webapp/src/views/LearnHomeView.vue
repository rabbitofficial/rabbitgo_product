<template>
  <var-loading description="LOADING" type="circle" :loading="loading">
    <div class="content">
      <div class="main flex-col">
        <img src="../assets/learnhome.png" alt="" />
        <span>
          Welcome to learn the courses! Please tap the button below to make a
          request:
        </span>
      </div>

      <div class="connect flex-row justify-center items-center">
        <span id="wallet" ref="wallet"></span>
      </div>

      <div
        v-show="isConnected"
        class="points flex-col justify-center items-center"
      >
        <span>Eggs: {{ objBackend.wallet.points }}</span>
        <span
          >RBT:
          <!-- {{
            objBackend.wallet.balances.length > 0
              ? Number(objBackend.wallet.balances[0].balance) / 10 ** 9
              : 0
          }} -->
          {{ rbtNumber }}</span
        >

        <!-- <div>{{ rbtNumber }}</div> -->
        <var-button
          @click="redeemShow = true"
          color="#9134E2"
          text-color="#fff"
          style="margin-top: 10px"
          >Redeem Eggs</var-button
        >
        <var-button @click="linkTo()" type="success" style="margin-top: 10px"
          >Courses</var-button
        >
      </div>

      <var-dialog
        v-model:show="redeemShow"
        @confirm="redeem()"
        confirm-button-text="Confirm"
        cancel-button-text="Cancel"
      >
        <template #title>
          <var-icon name="information" color="#2979ff" />
        </template>

        <var-input
          :hint="false"
          :line="true"
          type="number"
          placeholder="Points to redeem"
          v-model="redeemAmount"
        />
      </var-dialog>
      <var-loading type="circle" v-show="isLoading" />
      <!-- <div @click="Dialog('兰亭临帖 行书如行云流水')">testapi</div> -->
      <!-- <div>{{ obj.account.address }}</div> -->
    </div>
  </var-loading>
</template>

<script setup lang="ts">
import TonConnectUI from "@tonconnect/ui";
import { toUserFriendlyAddress } from "@tonconnect/sdk";
import { ref, onMounted, onUnmounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import tool from "../util/config";
//import { StyleProvider, Themes } from '@varlet/ui'

/* import { Button as VarButton } from '@varlet/ui'
import '@varlet/ui/es/button/style/index' */

import { axios } from "../http/axios";
import { Dialog } from "@varlet/ui";

const redeemShow = ref(false);
const redeemAmount = ref("");
const walletAddressTop = ref();
const wallet = ref("");
const loading = ref(false);
const isConnected = ref(false);

const router = useRouter();
const isLoading = ref(false);
let myConnector: any;

const rbtNumber = computed(() => {
  let result: any;
  if (objBackend.wallet.balances.length > 0) {
    result = objBackend.wallet.balances.filter((item) => {
      return item.metadata.symbol === "RBT";
    });
  }

  if (result.length > 0) {
    return result[0].balance / 10 ** 9;
  } else {
    return 0;
  }
});

function popup(info: string) {
  Dialog({
    message: info,
    title: "Info",
    //@ts-ignore
    "confirm-button-text": "ok",
    confirmButton: true,
    cancelButton: false,
  });
}

function linkTo() {
  router.push({
    name: "home",
    params: {},
  });
}
//StyleProvider(Themes.dark)
function redeem() {
  loading.value = true;
  axios({
    url: tool.network + "redeem",
    data: {
      redeemPoints: redeemAmount.value,
      redeemWallet: walletAddressTop.value,
    },
    method: "post",
    config: {
      timeout: 10000,
    },
  })
    .then((res) => {
      loading.value = false;

      if (res.status == "ok") {
        popup("Redeem Successfully");
        setTimeout(() => {
          location.reload();
        }, 1500);
      } else {
        popup("Faild, insuffcient Points!");
      }

      console.log("res:", res);
    })
    .catch((err) => {
      loading.value = false;
      popup("Redeem Failed");
      console.log("err:", err);
    });
}

let obj = reactive({
  wallet: {
    device: {
      platform: "",
      appName: "",
      appVersion: "",
      maxProtocolVersion: "",
      features: ["SendTransaction"],
    },
    provider: "",
    account: {
      address: "",
      chain: "",
      walletStateInit: "",
    },
    walletAddress: "",
  },
});
let objBackend = reactive({
  wallet: {
    status: "ok",
    tokenStr: "",
    new: "0",
    points: "0",
    nft: "",
    balances: [
      {
        balance: "0",
        jetton_address: "",
        metadata: {
          address: "",
          decimals: 9,
          image: "",
          name: "useless",
          symbol: "sb",
        },
        verification: "none",
        wallet_address: { address: "", is_scam: false },
      },
    ],
  },
});

function getWalletInfo(tonConnectUI: any, callback: (a: any) => void) {
  let time = 100;
  let timmer = setInterval(() => {
    if (tonConnectUI.account) {
      clearInterval(timmer);
      myConnector = tonConnectUI;
      callback(tonConnectUI);
    }
    //console.log(tonConnectUI)
    time = time + 100;
  }, 100);
}

function getDataFromServer(address: string, user: any) {
  console.log("user", user);
  isLoading.value = true;
  axios({
    url: tool.network + "authtoken",
    data: { wallet: address, ...user },
    method: "post",
    config: {
      timeout: 10000,
    },
  }).then((res) => {
    objBackend.wallet = res;
    isLoading.value = false;
    localStorage.setItem("token", res.tokenStr);
    // window.location.reload();
    //console.log("res:", res)
  });
}

async function getWalletList(tonConnectUI: any) {
  const connectedWallet = await tonConnectUI.connectWallet({
    manifestUrl: "https://ton.daezi.cloud/tonconnect-manifest.json",
  });
  return connectedWallet;
}

let isActiveTab: () => void;
onMounted(() => {
  // const tg = window.Telegram.WebApp;
  // console.log("window.Telegram.WebApp",window.Telegram.WebApp.initData)
  /* if (window.Telegram.WebApp) {
    window.Telegram.WebApp.ready(() => {
      console.log("window.Telegram.WebApp", window.Telegram.WebApp.initData);
    });
  } */

  console.log(
    "window.Telegram.MainButton22",
    window.Telegram.WebApp.initDataUnsafe.user
  );

  // window.Telegram.WebApp.showAlert(window.Telegram.WebApp.initDataUnsafe.user.id)
  const tonConnectUI = new TonConnectUI({
    manifestUrl: "https://ton.daezi.cloud/tonconnect-manifest.json?1",
    buttonRootId: "wallet",
    actionsConfiguration: {
      modals: ["error"],
      notifications: ["success"],
    },
    restoreConnection: true,
  });

  getWalletInfo(tonConnectUI, (data) => {
    let walletAddress = toUserFriendlyAddress(data.account.address);
    walletAddressTop.value = walletAddress;
    //console.log("data2:", data)
    isConnected.value = data.connected;
    getDataFromServer(
      walletAddress,
      window.Telegram.WebApp.initDataUnsafe.user
    );

    // detect disconnect wallet and remove token
    const unsubscribe = tonConnectUI.onStatusChange((walletAndwalletInfo) => {
      //console.log("walletAndwalletInfo", walletAndwalletInfo)
      localStorage.removeItem("token");
      isConnected.value = false;
      // update state/reactive variables to show updates in the ui
    });
  });

  isActiveTab = function () {
    if (document.hidden) {
      //
    } else {
      getWalletInfo(tonConnectUI, (data) => {
        let walletAddress = toUserFriendlyAddress(data.account.address);
        walletAddressTop.value = walletAddress;
        isConnected.value = data.connected;
        getDataFromServer(
          walletAddress,
          window.Telegram.WebApp.initDataUnsafe.user
        );
      });
    }
  };
  //console.log(666)
  document.addEventListener("visibilitychange", isActiveTab);
});

onUnmounted(() => {
  //console.log("des")
  document.removeEventListener("visibilitychange", isActiveTab);
});
</script>

<style scoped>
.content {
  box-sizing: border-box;
  padding: 43px 33.5px 20px 33.5px;
}

.points {
  width: 100%;
  font-size: 16px;
  color: #9134e2;
  padding-top: 20px;
}

.connect {
  width: 100%;
  font-size: 16px;
  color: #397cd9;
  padding-top: 20px;
}

.main span {
  font-size: 16px;
  color: black;
  box-sizing: border-box;
  padding: 10px;
}

.main img {
  width: 104px;
  align-self: center;
  padding-top: 20px;
}

.main {
  width: 323px;
  height: 196px;
  background-color: #f1f1f3;
  border-radius: 25px;
}
</style>
