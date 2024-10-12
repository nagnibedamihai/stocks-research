<template>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4">Stock Analysis Questionnaire</h2>
    <div class="bg-blue-100 p-4 rounded-lg mb-6">
      <p class="text-lg font-semibold">Total Score: {{ totalScore }}</p>
    </div>

    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700" for="ticker"
        >Ticker:</label
      >
      <input
        id="ticker"
        v-model="ticker"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        type="text"
        @input="ticker = ticker.toUpperCase()"
      />
    </div>

    <div v-for="(question, index) in questions" :key="index" class="mb-8">
      <h3 class="text-lg font-medium text-gray-900 mb-2">
        {{ index + 1 }}) {{ question.text }}
      </h3>
      <div v-if="question.type === 'choice'" class="space-y-2">
        <label
          v-for="option in question.options"
          :key="option.value"
          class="flex items-center"
        >
          <input
            v-model="answers[index]"
            :name="`question-${index}`"
            :value="option.value"
            class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
            type="radio"
          />
          <span class="ml-2"
            >{{ option.label }} (score {{ option.value }})</span
          >
        </label>
      </div>
      <div v-else-if="question.type === 'number'" class="mt-2">
        <input
          v-model.number="answers[index]"
          :max="question.max"
          :min="question.min"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          type="number"
        />
      </div>
      <p v-if="question.description" class="mt-2 text-sm text-gray-500">
        {{ question.description }}
      </p>
    </div>

    <button
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="showModal = true"
    >
      Show Results
    </button>

    <TransitionRoot :show="showModal" appear as="template">
      <Dialog as="div" class="relative z-10" @close="showModal = false">
        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
                <DialogTitle
                  as="h3"
                  class="text-lg font-medium leading-6 text-gray-900"
                >
                  Analysis Results
                </DialogTitle>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    Your total score for {{ ticker }} is {{ totalScore }}.
                  </p>
                </div>

                <div class="mt-4">
                  <button
                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    type="button"
                    @click="showModal = false"
                  >
                    Got it, thanks!
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

const ticker = ref("");
const answers = ref<(number | null)[]>([]);
const showModal = ref(false);

const questions = [
  {
    text: "Oversold condition?",
    type: "choice",
    options: [
      { label: "Incredible", value: 3 },
      { label: "Great", value: 2 },
      { label: "Good", value: 1 },
    ],
    description:
      "This is the first question. The most important. No alert = no action.",
  },
  // ... rest of the questions
];

const totalScore = computed(() => {
  return answers.value.reduce((sum, answer) => sum + (answer || 0), 0);
});
</script>
