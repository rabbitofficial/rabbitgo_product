<template>
    <div>
        <Back msg="hehe" class="back" />
        <div class="flex-col flex-auto group">
            <div class="flex-col items-center space-y-14">
                <img class="image_2"
                    src="../assets/logo_main2.png" />
                <span class="text_4">Nicely Done</span>
            </div>
            <div class="flex-col items-start group_2">
                <span class="font_2">You previously Earned</span>
                <span class="font_2">10RBT for Completing the Quiz</span>
            </div>
            <div class="flex-col group_3 space-y-14">
                <div class="flex-col justify-start items-center button">
                    <span class="font_3 text_5">Explore Other Courses</span>
                </div>
                <div class="flex-col justify-start items-center button_2"><span class="font_3 text_6">View my
                        wallet</span></div>
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
    color: #397cd9;
    margin-top: 20px;
}

.group {
    padding: 69px 62px 60px 62px;
    overflow-y: auto;
}

.image_2 {
    width: 174px;
    height: 139px;
}

.text_4 {
    color: #10a75f;
    font-size: 30px;
    font-family: Inter;
    font-weight: 700;
    line-height: 29px;
}

.group_2 {
    margin-top: 38px;
}

.font_2 {
    font-size: 18px;
    font-family: Inter;
    line-height: 22px;
    color: #000000;
}

.group_3 {
    margin-top: 56px;
    padding-left: 12px;
    padding-right: 8px;
}

.space-y-14>*:not(:first-child) {
    margin-top: 14px;
}

.button {
    padding: 18px 0 18px;
    background-color: #9134e2;
    border-radius: 10px;
}

.font_3 {
    font-size: 18px;
    font-family: Inter;
    line-height: 17px;
    font-weight: 600;
}

.text_5 {
    color: #ffffff;
}

.button_2 {
    padding: 18px 0 18px;
    background-color: #ebeffe;
    border-radius: 10px;
}

.text_6 {
    color: #000000;
    line-height: 17.5px;
}
</style>