<script setup lang="ts">
import { isDark, toggleDark } from '~/composables'
import Controls from '~/components/Controls.vue'
</script>

<template>
  <nav text-xl mt-6 inline-flex gap-2>
    <button class="icon-btn !outline-none" @click="toggleDark()">
      <div v-if="isDark" i-carbon-moon />
      <div v-else i-carbon-sun />
    </button>

    <a
      class="icon-btn"
      i-carbon-logo-github
      rel="noreferrer"
      href="https://github.com/zhengbangbo/vue-minesweeper"
      target="_blank"
      title="GitHub"
    />

    <button class="icon-btn !outline-none">
      <div i-carbon-help />
      <div class="popover" w-128>
        <Controls />
      </div>
    </button>
  </nav>
</template>

<style scoped>
.popover {
  display: none;
  position: absolute;
  top: -1px;
  right: calc(50% - 16rem)
}

button:hover .popover {
  display: block;
}
</style>
