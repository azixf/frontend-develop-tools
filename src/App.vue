<script setup lang="ts">
import { useDark, useToggle } from "@vueuse/core";
import { ref, defineAsyncComponent } from "vue";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const activeTab = ref(0);

interface TabItem {
  label: string;
  value: number;
  component?: any;
}

const tabList: Array<TabItem> = [
  {
    label: "随机颜色拾取",
    value: 0,
    component: defineAsyncComponent(
      () => import("@/components/RandomColor.vue")
    ),
  },
  {
    label: "颜色值转换",
    value: 1,
    component: defineAsyncComponent(
      () => import("@/components/ColorTransformer.vue")
    ),
  },
  {
    label: "英语翻译",
    value: 2,
    component: defineAsyncComponent(
      () => import("@/components/LanguageTransformer.vue")
    ),
  },
  {
    label: "正则表达式",
    value: 3,
    component: defineAsyncComponent(
      () => import("@/components/RegExpTools.vue")
    ),
  },
];

function onTabChange(tab: number) {
  activeTab.value = tab;
}
</script>

<template>
  <div h-screen flex flex-col p-x-25 p-b-25>
    <header h-25 flex justify-between items-center>
      <aside flex items-center>
        <img h-15 src="/icon.svg" m-r-4 alt="" />
        <h1 text-3xl>前端开发工具</h1>
      </aside>
      <aside text-6 flex items-center>
        <span cursor="pointer" hover:underline m-l-8>Tools</span>
        <span cursor="pointer" hover:underline m-l-8>Playgrond</span>
        <a
          m-l-4
          href="https://github.com/azixf/frontend-develop-tools"
          target="_blank"
          cursor="pointer"
          i-carbon-logo-github
        ></a>
        <div
          m-l-4
          cursor="pointer"
          dark:i-carbon-moon
          i-carbon-sun
          @click="toggleDark()"
        ></div>
      </aside>
    </header>
    <main h-full flex-1 flex flex-col items-center>
      <aside flex gap-x-6 text-lg m-b-5>
        <div
          :class="['tab', { 'active-tab': item.value === activeTab }]"
          v-for="item in tabList"
          :key="item.value"
          @click="onTabChange(item.value)"
        >
          {{ item.label }}
        </div>
      </aside>
      <aside w-full h-full flex-1 border rounded border-slate-600 dark:border-gray-200>
        <keep-alive :max="20">
          <Component :is="tabList[activeTab].component"></Component>
        </keep-alive>
      </aside>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.tab {
  @apply cursor-pointer p-1 border rounded border-transparent hover:border-hex-d4237a hover:border-dashed  hover:text-hex-d4237a;
}
.active-tab {
  @apply text-hex-d4237a border-hex-d4237a;
}
</style>
