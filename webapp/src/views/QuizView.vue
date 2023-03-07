<template>
  <div class="content">
    <Back msg="hehe" class="back" />
    <div class="flex-col flex-auto group_2">
      <div class="flex-row items-center group_3 space-x-6">
        <img class="image_2" src="../assets/money.png" />
        <span class="font_2 text_3">Earn 10RBT</span>
      </div>
      <div class="flex-col section">
        <span class="self-start font_1 text_4"
          >Question {{ currentQuizIndex + 1 }} of
          {{ allQuizOptions.quiz.length }}</span
        >
        <span class="self-start font_1 text_5">What is "fiat" money?</span>
        <div class="flex-col list">
          <div class="flex-col list-item space-x-18">
            <div
              class="font_1 radio_item"
              v-for="(item, index) in allQuizOptions.quiz[currentQuizIndex]"
            >
              <input
                type="radio"
                name="radio"
                :value="{
                  id: String(item.id),
                  title: String(item.title),
                  index: index,
                }"
                v-model="allQuizAnswers.answers[currentQuizIndex]"
                :id="String(item.id)"
              />
              <label :for="String(item.id)">{{ item.title }}</label>
            </div>
          </div>
        </div>
      </div>

      <!-- <div style="font-size:18px">
                <div @click="linkTo('congrats')">congrats page</div>
                <div @click="linkTo('try')">try page</div>
                <div @click="linkTo('done')">done page</div>
            </div> -->

      <div class="buttonControl">
        <div
          @click="previousQuiz()"
          class="arrow_area"
          v-show="currentQuizIndex != 0 && !isSubmited"
        >
          <img class="image_3" src="../assets/arrow.png" />
        </div>

        <div
          @click="nextQuiz()"
          class="flex-col justify-center items-center self-center button"
        >
          <span class="text_6">{{
            currentQuizIndex == allQuizOptions.quiz.length - 1 && isSubmited
              ? "Result"
              : currentQuizIndex == allQuizOptions.quiz.length - 1
              ? "Submit"
              : "Next"
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import Back from "@/components/Back.vue";
import { Dialog } from "@varlet/ui";
const currentQuizIndex = ref(0);
const isSubmited = ref(false);
const route = useRoute();
const router = useRouter();
//const obj = reactive(JSON.parse(String(route.params.obj)))
const quizOptions = reactive([
  {
    title: "Non-digital money1",
    id: 1,
  },
  {
    title: "Non-digital money2",
    id: 2,
  },
  {
    title: "Non-digital money3",
    id: 3,
  },
  {
    title: "Non-digital money4",
    id: 4,
  },
]);

const quizAnswer = reactive({
  ans: "2",
});

const allQuizAnswers = reactive({ answers: [] });
const allQuizOptions = reactive({
  quiz: [
    [
      {
        title: "question1 option1",
        id: 1,
      },
      {
        title: "question1 option2",
        id: 2,
      },
      {
        title: "question1 option3",
        id: 3,
      },
      {
        title: "question1 option4",
        id: 4,
      },
    ],
    [
      {
        title: "question2 option1",
        id: 1,
      },
      {
        title: "question2 option2",
        id: 2,
      },
      {
        title: "question2 option3",
        id: 3,
      },
      {
        title: "question2 option4",
        id: 4,
      },
    ],
    [
      {
        title: "question3 option1",
        id: 1,
      },
      {
        title: "question3 option2",
        id: 2,
      },
      {
        title: "question3 option3",
        id: 3,
      },
      {
        title: "question3 option4",
        id: 4,
      },
    ],
  ],
});

function popup() {
  Dialog({
    message: "Choose One Option",
    title: "No Option",
    //@ts-ignore
    "confirm-button-text": "ok",
    confirmButton: true,
    cancelButton: false,
  });
}

function previousQuiz() {
  currentQuizIndex.value--;
}

function nextQuiz() {
  if (isSubmited.value) {
    linkTo();
  }

  if (!allQuizAnswers.answers[currentQuizIndex.value]) {
    popup();
    return;
  }
  if (currentQuizIndex.value == allQuizOptions.quiz.length - 1) {
    isSubmited.value = true;
    console.log("final");
  } else {
    currentQuizIndex.value++;
  }

  console.log(allQuizAnswers);
}

function linkTo() {
  router.push({
    name: "congrats",
    params: {},
  });
}
</script>

<style scoped>
.back {
  margin-left: 22px;
  color: #397cd9;
}

.submitedButton {
  background-color: gray !important;
}

.arrow_area {
  width: 58px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.radio_item {
  padding: 22px 12px;
  display: flex;
  align-items: center;
}

.radio_item input {
  width: 16px;
  height: 16px;
  margin: 0;
}

.radio_item label {
  margin-left: 8px;
}

.buttonControl {
  position: absolute;
  bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 345px;
}

.content {
  padding-top: 20px;
}

.font_1 {
  font-size: 16px;
  font-family: Inter;
  line-height: 15.5px;
  color: #000000;
}

.font_2 {
  font-size: 12px;
  font-family: Inter;
  line-height: 9px;
}

.group_2 {
  padding: 0 18px 32px;
  overflow-y: auto;
}

.group_3 {
  padding: 8px 0 23px;
}

.space-x-6 > *:not(:first-child) {
  margin-left: 6px;
}

.image_2 {
  width: 13px;
  height: 13px;
}

.image_3 {
  width: 20px;
  height: 13px;
}

.text_3 {
  color: #9134e2;
}

.section {
  margin-left: 7px;
  margin-right: 4px;
  padding: 16px 20px 20px;
  background-color: #f5f5f55e;
  border-radius: 10px;
}

.text_4 {
  color: #777777;
  line-height: 13.5px;
}

.text_5 {
  margin-top: 22px;
  line-height: 19px;
}

.list {
  margin-top: 12px;
}

.list-item {
  margin-right: 18px;

  background-color: #ffffff;
  border-radius: 10px;
}

.section_2 {
  background-color: #ffffff;
  border-radius: 9999px;
  overflow: hidden;
  width: 16px;
  height: 16px;
  border: solid 11px #805ad5;
}

.button {
  padding: 14px 0 14px;
  background-color: #9134e2;
  border-radius: 10px;
  width: 240px;
}

.text_6 {
  color: #ffffff;
  font-size: 18px;
  font-family: Inter;
  font-weight: 600;
  line-height: 17.5px;
}
</style>
