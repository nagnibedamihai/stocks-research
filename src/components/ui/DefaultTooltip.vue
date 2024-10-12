<template>
  <div class="relative inline-block">
    <slot></slot>
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <div
        v-if="isOpen"
        :class="[positionClass]"
        class="absolute w-52 z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700"
      >
        <div v-html="text"></div>
        <div class="tooltip-arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  text: string;
  position?: "top" | "bottom" | "left" | "right";
}>();

const isOpen = ref(false);
const positionClass = computed(() => {
  switch (props.position) {
    case "top":
      return "bottom-full mb-2";
    case "bottom":
      return "top-full mt-2";
    case "left":
      return "right-full mr-2 top-1/2 -translate-y-1/2";
    case "right":
      return "left-full ml-2 top-1/2 -translate-y-1/2";
    default:
      return "bottom-full mb-2";
  }
});

const showTooltip = () => {
  isOpen.value = true;
};

const hideTooltip = () => {
  isOpen.value = false;
};

onMounted(() => {
  const el = document.querySelector(".relative.inline-block");
  el?.addEventListener("mouseenter", showTooltip);
  el?.addEventListener("mouseleave", hideTooltip);
});

onUnmounted(() => {
  const el = document.querySelector(".relative.inline-block");
  el?.removeEventListener("mouseenter", showTooltip);
  el?.removeEventListener("mouseleave", hideTooltip);
});
</script>
