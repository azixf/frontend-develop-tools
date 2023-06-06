<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
  <div wh-full>
    <el-button type="primary">button</el-button>
    <div text-7 color-amber cursor="pointer" i-mdi-alert-circle-check></div>
    <div
      text-7
      cursor="pointer"
      dark:i-carbon-moon
      i-carbon-sun
      @click="toggleDark()"
    ></div>
  </div>
</template>

<style scoped></style>
