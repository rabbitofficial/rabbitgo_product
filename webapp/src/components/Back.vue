<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
defineProps<{
    msg: string
}>()

</script>

<template>
    <div class="back">
        <span @click="router.back()" class="button">Back</span>
    </div>
</template>

<style scoped>
.back span {
    font-size: 16px;
    font-family: Inter;
    color: #397cd9;
    line-height: 12px;
}
</style>
