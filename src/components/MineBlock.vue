<script lang="ts" setup>
import type { BlockState } from '~/types'
import { isDev } from '~/composables'

defineProps<{ block: BlockState }>()

const numberColors = [
  'text-transparent',
  'text-gray-500',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-red-500',
  'text-orange-500',
  'text-purple-500',
  'text-pink-500',
]

function getBlockClass(block: BlockState) {
  if (block.flagged)
    return 'bg-gray-500/25'
  if (!block.revealed)
    return 'bg-gray-500/10 hover:bg-gray/25'
  return block.mine ? 'bg-red-500/75' : numberColors[block.adjacentMines]
}
</script>

<template>
  <div>
    <button
      flex="~"
      items-center justify-center
      w-10 h-10 m="0.5"
      border="1.5 gray-400/10"
      :class="getBlockClass(block)"
    >
      <template v-if="block.flagged">
        <div i-carbon:flag-filled text-red />
      </template>
      <template v-if="block.revealed || isDev">
        <div v-if="block.mine" i-mdi:mine />
        <div v-else font-bold>
          {{ block.adjacentMines }}
        </div>
      </template>
    </button>
  </div>
</template>
