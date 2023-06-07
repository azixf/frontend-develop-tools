<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useClipboard } from "@vueuse/core";
const bgColor = ref("");

onMounted(() => {
  setColor();
});

function getRandomColor() {
  return "#" + Math.random().toString(16).slice(2, 8).padStart(6, "0");
}

function setColor() {
  bgColor.value = getRandomColor();
}

const { copy, copied } = useClipboard({
  source: bgColor,
  legacy: true,
});
</script>
<template>
  <div class="random-color" wh-full f-c-c relative>
    <h1 text-3xl>{{ bgColor }}</h1>
    <div absolute bottom-4 right-4 flex text-5 gap-x-4>
      <div
        title="刷新"
        cursor="pointer"
        i-carbon-update-now
        @click="setColor"
      ></div>
      <div
        v-if="!copied"
        title="复制颜色"
        cursor="pointer"
        i-carbon-copy
        @click="copy(bgColor)"
      ></div>
      <div i-carbon-status-resolved text-green-500 v-else></div>
    </div>
  </div>
</template>

<style scoped>
.random-color {
  background-color: v-bind(bgColor);
}
</style>
