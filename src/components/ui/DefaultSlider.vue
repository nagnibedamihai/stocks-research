<template>
  <div class="flex items-center space-x-4">
    <input
      v-model="localValue"
      :max="max"
      :min="min"
      :step="step"
      class="w-64 h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-300"
      type="range"
      @input="updateValue"
    />
    <span class="text-lg font-medium">{{ valueLabel || localValue }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, withDefaults } from "vue";

interface Props {
  modelValue: number;
  min?: number;
  max?: number;
  step?: number;
  valueLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 10,
  step: 1,
  valueLabel: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const localValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const updateValue = () => {
  const updatedValue =
    typeof localValue.value === "string"
      ? parseInt(localValue.value, 10)
      : localValue.value || 0;
  emit("update:modelValue", updatedValue);
};
</script>
