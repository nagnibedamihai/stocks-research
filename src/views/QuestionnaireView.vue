<template>
  <div class="container mx-auto px-4 py-8">
    <div class="w-full bg-white rounded-lg shadow-lg p-6 mx-auto">
      <div class="flex flex-row justify-stretch align-middle items-stretch">
        <div class="grow">
          <h2 class="text-2xl font-bold mb-2">
            Questionnaire
            <a
              class="text-sm"
              href="https://www.tradingview.com/u/without_worries/"
              target="_blank"
              >by WW</a
            >
          </h2>
        </div>
      </div>

      <div>
        <hr class="my-3 border-gray-300" />
      </div>

      <div class="w-full flex flex-col md:flex-row items-stretch gap-2 mb-3">
        <div class="max-w-48">
          <label
            class="block text-base font-bold text-gray-700 mb-1"
            for="ticker"
            >Ticker:</label
          >
          <input
            id="ticker"
            v-model="ticker"
            class="px-2 h-8 block w-full font-bold rounded-md border border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            type="text"
            @input="ticker = ticker.toUpperCase()"
          />
        </div>

        <div
          class="w-48 bg-blue-100 px-4 py-1 rounded-lg flex flex-col justify-center"
        >
          <p class="text-lg font-semibold">
            Total Score: <br />
            {{ totalScore }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div
          v-for="(question, index) in questions"
          :key="index"
          :class="`mb-1 w-full h-auto relative ${
            question.sectionTitle ? 'md:col-span-2 lg:col-span-3' : ''
          }`"
        >
          <h2
            v-if="question.sectionTitle"
            class="mb-2 mt-2 text-gray-300 font-bold text-lg"
          >
            <span class="w-full">{{ question.sectionTitle }}</span>
            <hr class="mb-3 border-gray-300" />
          </h2>
          <h3 v-else class="text-base font-semibold text-gray-900 mb-2">
            {{ question.index }}) {{ question.text }}
            <DefaultTooltip
              v-if="questions[index].description"
              :text="questions[index].description"
              position="top"
            >
              <font-awesome-icon
                :icon="['far', 'circle-question']"
                class="text-gray-400"
              />
            </DefaultTooltip>
          </h3>
          <div v-if="question.type === 'radio'" class="mb-0">
            <RadioGroup v-model="answers[index]" :name="`question-${index}`">
              <div class="flex flex-wrap gap-2">
                <RadioGroupOption
                  v-for="option in question.options"
                  :key="option.value"
                  v-slot="{ checked }"
                  :value="option.value"
                >
                  <div
                    :class="[
                      checked
                        ? 'bg-indigo-100 text-indigo-800 ring-2 ring-indigo-500 ring-offset-2'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200',
                    ]"
                    class="inline-block cursor-pointer px-2 py-1 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out"
                  >
                    {{ option.label }}
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>
          <div v-else-if="question.type === 'number'" class="mt-2">
            <DefaultSlider
              v-model="answers[index]"
              :max="question.max"
              :min="question.min"
              :step="question.step"
              :valueLabel="question.valueLabel(answers[index])"
            />
          </div>
        </div>
      </div>

      <button
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 hidden"
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
                    {{ modalTitle }}
                  </DialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      {{ modalText }}
                    </p>
                  </div>

                  <div class="mt-4">
                    <button
                      class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      type="button"
                      @click="showModal = false"
                    >
                      {{ modalButtonText }}
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  RadioGroup,
  RadioGroupOption,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import DefaultSlider from "@/components/ui/DefaultSlider.vue";
import DefaultTooltip from "@/components/ui/DefaultTooltip.vue";

const ticker = ref("");
const answers = ref<(number | null)[]>([]);
const showModal = ref(false);

const modalTitle = ref("Analysis Results");
const modalText = ref("Your total score for {{ ticker }} is {{ totalScore }}.");
const modalButtonText = ref("Got it, thanks!");

const questions = [
  {
    text: "Signal",
    type: "radio",
    index: 1,
    options: [
      { label: "Incredible", value: 3 },
      { label: "Great", value: 2 },
      { label: "Good", value: 1 },
    ],
    initial: 0,
    description:
      "This is the first question. The most important. No alert = no action. <br> 10-day / 2-week chart <br> Incredible = 3 points <br> Great = 2 points <br> Good = 1 point.",
  },
  {
    text: "Stock splits",
    type: "radio",
    index: 2,
    options: [
      { label: "Reverse split", value: -999 },
      { label: "No Splits", value: 2 },
      { label: "1 split", value: 3 },
      { label: "2 splits", value: 6 },
      { label: "3 splits", value: 9 },
      { label: "4 splits", value: 12 },
      { label: "5 splits", value: 15 },
    ],
    initial: 0,
    description:
      "No splits = 2 points <br> Each positive split in the last 10 years = 3 points <br> Reverse split = no investment",
  },
  {
    text: "Drop from recent high",
    type: "number",
    index: 3,
    min: 0,
    max: 9,
    step: 1,
    initial: 0,
    valueLabel: function (value: number) {
      return parseInt(value || 0) * 10 + "%";
    },
    description: "Each 10% drop from the recent high = 1 point",
  },
  {
    sectionTitle: "The trend",
  },
  {
    text: "Broken Price action/RSI resistance?",
    type: "radio",
    index: 4,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 3 points, No = 0 points",
  },
  {
    text: "Higher highs / higher lows?",
    type: "radio",
    index: 5,
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
    description: "From price action or RSI <br> Yes = 2 points, No = 0 points",
  },
  {
    text: "Has GRM support?",
    type: "radio",
    index: 6,
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
    description:
      "Has Golden Ratio Multiplier support on the 2-day chart and above? <br> Yes = 5 points, No = 0 points",
  },
  {
    sectionTitle: "Support and resistance",
  },
  {
    text: "Monthly candle support?",
    type: "radio",
    index: 7,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 3 points, No = 0 points",
  },
  {
    text: "Quarterly candle support?",
    type: "radio",
    index: 8,
    options: [
      { label: "Yes", value: 4 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 4 points, No = 0 points",
  },
  {
    text: "Bi-annual candle support?",
    type: "radio",
    index: 9,
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 5 points, No = 0 points",
  },
  {
    text: "Annual candle support?",
    type: "radio",
    index: 10,
    options: [
      { label: "Yes", value: 6 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 6 points, No = 0 points",
  },
  {
    sectionTitle: "Moving averages + Oscillators + Volume",
  },
  {
    text: "Did the buy signal print below the 100-month RMA?",
    type: "radio",
    index: 11,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description:
      "Running/rolling moving average <br>Yes = 3 points, No = 0 points",
  },
  {
    text: "Weekly RSI > 50?",
    type: "radio",
    index: 12,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 3 points, No = 0 points",
  },
  {
    text: "Stochastic RSI recently in the green?",
    type: "radio",
    index: 13,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 3 points, No = 0 points",
  },
  {
    text: "Divergence? Regular or hidden?",
    type: "radio",
    index: 14,
    options: [
      { label: "Yes", value: 3 },
      { label: "No", value: 0 },
    ],
    description:
      "Regular or hidden divergence (<60 days) <br> Yes = 3 points, No = 0 points",
  },
  {
    text: "Weekly volume increasing?",
    type: "radio",
    index: 15,
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
    description: "Yes = 1 point, No = 0 points",
  },
  {
    sectionTitle: "Candles",
  },
  {
    text: "Weekly chart",
    type: "radio",
    index: 16,
    options: [
      { label: "No candle", value: 0 },
      { label: "Bullish engulfing / indecision candle", value: 1 },
      { label: "Reversal pattern? (hammer candle)", value: 2 },
      { label: "Dragonfly DOJI", value: 3 },
    ],
    description:
      "Bullish engulfing / indecision candle = 1 point <br> Reversal pattern? (hammer candle) = 2 points <br> Dragonfly DOJI = 3 points",
  },
  {
    text: "10-day chart",
    type: "radio",
    index: 17,
    options: [
      { label: "No candle", value: 0 },
      { label: "Bullish engulfing / indecision candle", value: 1 },
      { label: "Reversal pattern? (hammer candle)", value: 2 },
      { label: "Dragonfly DOJI", value: 3 },
    ],
    description:
      "Bullish engulfing / indecision candle = 1 point <br> Reversal pattern? (hammer candle) = 2 points <br> Dragonfly DOJI = 3 points",
  },
  {
    text: "1-Month chart",
    type: "radio",
    index: 18,
    options: [
      { label: "No candle", value: 0 },
      { label: "Bullish engulfing / indecision candle", value: 1 },
      { label: "Reversal pattern? (hammer candle)", value: 1 },
      { label: "Dragonfly DOJI", value: 2 },
    ],
    description:
      "Bullish engulfing / indecision candle = 1 point <br> Reversal pattern? (hammer candle) = 1 point <br> Dragonfly DOJI = 2 points",
  },
];

answers.value = questions.map((question) => question.initial);

const totalScore = computed(() => {
  return answers.value.reduce((sum, answer) => sum + parseInt(answer || 0), 0);
});

watch(totalScore, (newScore) => {
  if (newScore < 0) {
    modalTitle.value = "Get out!";
    modalText.value = "This stock is very risky. Do not invest!";
    modalButtonText.value = "Got it, thanks!";
    showModal.value = true;
  }
});
</script>
