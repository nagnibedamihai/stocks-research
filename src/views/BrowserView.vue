<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <h1 class="text-2xl font-bold mb-4">Browser</h1>

        <p class="mb-4">
          Enter ticker name and select media outlets to search in.
          <DefaultTooltip :text="tooltipText" position="left">
            <font-awesome-icon :icon="['far', 'circle-question']" />
          </DefaultTooltip>
        </p>

        <div class="mb-6">
          <form id="ticker-form" @submit.prevent="search()">
            <div class="flex">
              <input
                v-model="ticker"
                class="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                minlength="1"
                placeholder="Enter ticker"
                type="text"
                @change="uppercaseTicker()"
                @keyup="uppercaseTicker()"
              />
              <button
                class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="submit"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div
            v-for="source in sources"
            :key="source.id"
            class="flex items-center"
          >
            <label class="inline-flex items-center cursor-pointer">
              <Switch
                v-model="source.selected"
                :class="source.selected ? 'bg-green-600' : 'bg-gray-300'"
                class="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
              >
                <span class="sr-only">Use setting</span>
                <span
                  :class="source.selected ? 'translate-x-5' : 'translate-x-0'"
                  aria-hidden="true"
                  class="pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
                />
              </Switch>
              <span class="ml-3">{{ source.name }}</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Switch } from "@headlessui/vue";
import DefaultTooltip from "@/components/ui/DefaultTooltip.vue";

interface Source {
  id: number;
  name: string;
  selected: boolean;
}

const tooltipText =
  'Each site will open in a new tab, allowing you to quickly search across sites. <br> You need to allow multiple popups on this site for this feature to work. <br> You can close all the tabs by right click -> "Close Tabs to the Right" in the browser.';
const ticker = ref("");
const sources = reactive<Source[]>([
  {
    id: 1,
    name: "Stocktwits",
    selected: true,
    link: "https://stocktwits.com/symbol/${ticker}",
  },
  {
    id: 2,
    name: "Yahoo Finance",
    selected: true,
    link: "https://finance.yahoo.com/quote/${ticker}?p=${ticker}&.tsrc=fin-srch",
  },
  {
    id: 3,
    name: "Nasdaq",
    selected: true,
    link: "https://www.nasdaq.com/market-activity/stocks/${ticker}",
  },
  {
    id: 4,
    name: "Wall Street Journal",
    selected: true,
    link: "https://www.wsj.com/market-data/quotes/${ticker}",
  },
  {
    id: 5,
    name: "CNBC",
    selected: true,
    link: "https://www.cnbc.com/quotes/${ticker}?qsearchterm=${ticker}",
  },
  {
    id: 6,
    name: "Business Insider",
    selected: true,
    link: "https://markets.businessinsider.com/stocks/${ticker}",
  },
  {
    id: 7,
    name: "Finviz",
    selected: true,
    link: "https://finviz.com/quote.ashx?t=${ticker}",
  },
  {
    id: 8,
    name: "MarketWatch",
    selected: true,
    link: "https://www.marketwatch.com/investing/stock/${ticker}",
  },
  {
    id: 9,
    name: "CNN Money",
    selected: true,
    link: "https://money.cnn.com/quote/quote.html?symb=${ticker}",
  },
  {
    id: 10,
    name: "TipRanks",
    selected: true,
    link: "https://www.tipranks.com/stocks/${ticker}/forecast",
  },
  {
    id: 11,
    name: "BarChart",
    selected: true,
    link: "https://www.barchart.com/stocks/quotes/${ticker}/overview",
  },
  {
    id: 12,
    name: "TradingView",
    selected: true,
    link: "https://www.tradingview.com/symbols/${ticker}",
  },
  {
    id: 13,
    name: "Zacks",
    selected: true,
    link: "https://www.zacks.com/stock/quote/${ticker}",
  },
  {
    id: 14,
    name: "Seeking Alpha",
    selected: true,
    link: "https://seekingalpha.com/symbol/${ticker}",
  },
  {
    id: 15,
    name: "The Motley Fool",
    selected: true,
    link: "https://www.fool.com/quote/${ticker}",
  },
  {
    id: 16,
    name: "Investing.com",
    selected: true,
    link: "https://www.investing.com/equities/${ticker}",
  },
  {
    id: 19,
    name: "Investopedia",
    selected: true,
    link: "https://www.investopedia.com/markets/quote?tvwidgetsymbol=${ticker}",
  },
  {
    id: 20,
    name: "The Street",
    selected: true,
    link: "https://www.thestreet.com/quote/${ticker}.html",
  },
  {
    id: 21,
    name: "The Globe and Mail",
    selected: true,
    link: "https://www.theglobeandmail.com/investing/markets/stocks/${ticker}",
  },
  {
    id: 22,
    name: "Stock Split History",
    selected: true,
    link: "https://www.stocksplithistory.com/?symbol=${ticker}",
  },
]);

const uppercaseTicker = () => {
  ticker.value = ticker.value.toUpperCase();
};

const search = () => {
  sources.forEach((source) => {
    if (source.selected) {
      let link = source.link.split("${ticker}").join(ticker.value);
      source.ref = window.open(link, "_blank");
    }
  });
};
</script>
