<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
import { ref } from "vue";

const rgbIpt = ref("");
const rgbOpt = ref("");
const hexIpt = ref("");
const hexOpt = ref("");

const { copy, copied } = useClipboard({
  source: rgbOpt,
  legacy: true,
});

const { copy: Copy, copied: Copied } = useClipboard({
  source: hexOpt,
  legacy: true,
});

const rgbToHex = (str: string) => {
  let result = "";
  if (str.indexOf("#") === 0) {
    result = str;
  } else if (str.indexOf("rgb(") === 0) {
    const colors = str.replace(/rgb\(/g, "").replace(/\)/g, "").split(",");
    const r =
      parseInt(colors[0]).toString(16).length === 1
        ? "0" + parseInt(colors[0]).toString(16)
        : parseInt(colors[0]).toString(16);
    const g =
      parseInt(colors[1]).toString(16).length === 1
        ? "0" + parseInt(colors[1]).toString(16)
        : parseInt(colors[1]).toString(16);
    const b =
      parseInt(colors[2]).toString(16).length === 1
        ? "0" + parseInt(colors[2]).toString(16)
        : parseInt(colors[2]).toString(16);
    result = `#${r}${g}${b}`;
  }
  return result;
};

const hexToRgb = (str: string) => {
  const template = str.toLowerCase();
  let result = "";
  if (template.indexOf("rgb(") === 0) {
    result = template;
  } else if (template.indexOf("rgba(") === 0) {
    const colors = template
      .replace(/rgba\(/g, "")
      .replace(/\)/g, "")
      .split(",");
    const r = colors[0];
    const g = colors[1];
    const b = colors[2];
    result = `rgb(${r},${g},${b})`;
  } else if (template.indexOf("#") === 0) {
    let colors = template.replace(/#/g, "");
    let resultArr = [];
    if (colors.length === 3) {
      colors = colors.replace(/[0-9a-f]/g, (str) => {
        return str + str;
      });
    }
    for (let i = 0; i < colors.length; i += 2) {
      resultArr.push(parseInt(colors[i] + colors[i + 1], 16));
    }
    result = `rgb(${resultArr.join(",")})`;
  }
  return result;
};

function translate(type: "rgb" | "hex") {
  if (type === "rgb") {
    rgbOpt.value = rgbToHex(rgbIpt.value);
  } else {
    hexOpt.value = hexToRgb(hexIpt.value);
  }
}
</script>

<template>
  <div wh-full bg-gray-500 f-c-c flex-col gap-y-6>
    <section flex gap-x-4>
      <label for="rgb">RGB转HEX</label>
      <input
        id="rgb"
        placeholder="形如：rgb(255,255,255)"
        name="rgb"
        type="text"
        outline-0
        p-x-2
        v-model="rgbIpt"
      />
      <button
        p-x-2
        p-y-1
        bg-rose-800
        active:brightness-120
        @click="translate('rgb')"
      >
        转换
      </button>
      <div v-if="!copied" @click="copy(rgbOpt)">{{ rgbOpt }}</div>
      <i text-green-500 i-carbon-status-resolved v-else></i>
    </section>
    <section flex gap-x-4>
      <label for="hex">HEX转RGB</label>
      <input
        id="hex"
        placeholder="形如：#ffffff"
        name="hex"
        type="text"
        outline-0
        p-x-2
        v-model="hexIpt"
      />
      <button
        p-x-2
        p-y-1
        bg-rose-800
        active:brightness-120
        @click="translate('hex')"
      >
        转换
      </button>
      <div v-if="!Copied" @click="Copy(hexOpt)">{{ hexOpt }}</div>
      <i text-green-500 i-carbon-status-resolved v-else></i>
    </section>
  </div>
</template>

<style scoped></style>
