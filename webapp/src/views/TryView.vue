<template>
    <div>
        <Back msg="hehe" class="back" />
        <div class="flex-col flex-auto group_2">
            <div class="flex-row items-start space-x-12">
                <img class="shrink-0 image_2" src="../assets/cup.png" />
                <span class="text_4">Let’s Try Again!</span>
            </div>
            <span class="self-center text_5">To Earn 10 RBT</span>
            <div class="flex-col group_3 space-y-18">
                <img class="self-center image_3" src="../assets/cross.png" />
                <div class="flex-col space-y-22">
                    <div class="flex-col items-start group_4">
                        <span class="font_2">You Got 2 Out of 3</span>
                        <span class="font_2">Answers Correct</span>
                    </div>
                    <div class="flex-col space-y-14">
                        <div class="flex-col justify-start items-center button"><span class="text_6">Retry Quiz</span>
                        </div>
                        <div class="flex-col justify-start items-center text-wrapper">
                            <span class="font_2 text_7">Back to Course</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Back from '@/components/Back.vue';
</script>

<style scoped>
.back {
    margin-left: 22px;
    margin-top: 20px;
    color: #397cd9;
}

.group_2 {
    padding: 91px 59px 224px;
    overflow-y: auto;
}

.space-x-12>*:not(:first-child) {
    margin-left: 12px;
}

.image_2 {
    width: 29px;
    height: 32px;
}

.text_4 {
    margin-top: 8px;
    color: #000000;
    font-size: 30px;
    font-family: Inter;
    font-weight: 700;
    line-height: 29.5px;
}

.text_5 {
    margin-top: 26px;
    color: #000000;
    font-size: 28px;
    font-family: Inter;
    font-weight: 600;
    line-height: 21px;
}

.group_3 {
    margin-top: 82px;
    padding: 0 14px;
}

.space-y-18>*:not(:first-child) {
    margin-top: 18px;
}

.image_3 {
    width: 44px;
    height: 44px;
}

.space-y-22>*:not(:first-child) {
    margin-top: 22px;
}

.group_4 {
    padding: 0 38px;
}

.font_2 {
    font-size: 18px;
    font-family: Inter;
    line-height: 22px;
    color: #000000;
}

.space-y-14>*:not(:first-child) {
    margin-top: 14px;
}

.button {
    margin-right: 4px;
    padding: 18px 0 18px;
    background-color: #9134e2;
    border-radius: 10px;
}

.text_6 {
    color: #ffffff;
    font-size: 18px;
    font-family: Inter;
    font-weight: 600;
    line-height: 17.5px;
}

.text-wrapper {
    margin-right: 4px;
    padding: 18px 0;
    background-color: #ebeffe;
    border-radius: 10px;
}

.text_7 {
    font-weight: 600;
    line-height: 13.5px;
}
</style>