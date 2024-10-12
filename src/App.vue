<template>
  <div class="relative bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link class="text-xl font-bold text-gray-900" to="/"
              >Stocks Research 🚀
            </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              :class="{
                'border-indigo-500 text-gray-900': $route.path === '/',
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  $route.path !== '/',
              }"
              class="border-b-2 text-sm font-medium inline-flex items-center"
              to="/"
            >
              Home
            </router-link>

            <router-link
              :class="{
                'border-indigo-500 text-gray-900':
                  $route.path === '/questionnaire',
                'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                  $route.path !== '/questionnaire',
              }"
              class="border-b-2 text-sm font-medium inline-flex items-center"
              to="/questionnaire"
            >
              Questionnaire
            </router-link>
          </div>
        </div>
        <div class="-mr-2 flex items-center sm:hidden">
          <button
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500"
            @click="isOpen = !isOpen"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              aria-hidden="true"
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <TransitionRoot :show="isOpen" as="template">
      <div class="sm:hidden">
        <div class="pt-2 pb-3 space-y-1">
          <router-link
            class="border-indigo-500 text-gray-900 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            to="/"
          >
            Home
          </router-link>
          <router-link
            class="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            to="/about"
          >
            About
          </router-link>
        </div>
      </div>
    </TransitionRoot>
  </div>
  <router-view />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { TransitionRoot } from "@headlessui/vue";

const isOpen = ref(false);
</script>

<style lang="scss">
body {
  font-family: "Quicksand", sans-serif;
}

#app {
  font-family: "Quicksand", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
