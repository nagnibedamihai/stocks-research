<template>
  <div class="home container mx-auto p-4">
    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
    >
      <div
        class="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4"
      >
        <h1 class="text-2xl font-bold mb-2">Welcome</h1>
        <p class="text-gray-500">
          I'm a web developer that likes to trade stocks in my free time. <br />
          This is a little project I built to help me research my stocks more
          efficiently.
        </p>
        <img
          alt="Monkey Typing"
          class="mt-4 mx-auto rounded-lg h-48 w-full object-cover"
          src="/img/gifs/monkey-type.gif"
        />
      </div>
      <div
        class="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4"
      >
        <h1 class="text-2xl font-bold mb-2">
          <a href="/browser"> Browser </a>
        </h1>
        <p class="text-gray-500">
          Reading articles and news about my stocks is time consuming, searching
          through each site, so I built this
          <a class="text-blue-500 font-semibold" href="/browser">tab browser</a>
          to help me search for news faster.
        </p>
        <img
          alt="Monkey Newspaper"
          class="mt-4 mx-auto rounded-lg h-48 w-full object-cover"
          src="/img/gifs/monkey-newspaper.gif"
        />
      </div>

      <div
        class="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4"
      >
        <h1 class="text-2xl font-bold mb-2">
          <a href="/questionnaire"> Questionnaire </a>
        </h1>
        <p class="text-gray-500">
          Not all stocks are good investments. <br />
          Before buying, I always go through a
          <a class="text-blue-500 font-semibold" href="/questionnaire"
            >list of questions</a
          >
          to make sure I'm making the right decision and I'm not just gambling.
        </p>
        <img
          alt="Monkey Mouse"
          class="mt-4 mx-auto rounded-lg h-48 w-full object-cover"
          src="/img/gifs/monkey-type-error.gif"
        />
      </div>
      <div
        class="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4"
      >
        <h1 class="text-2xl font-bold mb-2">Sectors</h1>
        <p class="text-gray-500">
          Sectors in the market are rotated frequently. I like to keep an eye on
          the sectors that are performing well and then research the stocks in
          those sectors. (coming soon)
        </p>
        <img
          alt="Stocks Research"
          class="mt-4 mx-auto rounded-lg h-48 w-full object-cover"
          src="/img/gifs/monkey-money.gif"
        />
      </div>

      <div
        class="flex flex-col justify-between bg-white rounded-lg shadow-lg p-4"
      >
        <h1 class="text-2xl font-bold mb-2">Contact</h1>
        <p class="text-gray-500">
          Feel free to
          <a
            class="text-blue-500 font-semibold"
            href="mailto:nagnibeda.mihai@gmail.com"
            >email</a
          >
          me if you have any questions or suggestions.
        </p>
        <img
          alt="Monkey Phone"
          class="mt-4 mx-auto rounded-lg h-48 w-full object-cover"
          src="/img/gifs/monkey-phone.gif"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
