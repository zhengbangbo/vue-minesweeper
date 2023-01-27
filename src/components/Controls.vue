<script setup lang="ts">

</script>

<template>
  <div class="rounded-lg bg-white p-8 shadow-2xl w-full">
    <h1 class="text-lg font-bold">
      Controls
    </h1>
    <h3>
      Desktop
    </h3>
    <ul list="inside decimal" text-start>
      <li><u>Left-click</u> an empty square to reveal it.</li>
      <li><u>Right-click</u> (or <u>Ctrl+click</u>) an empty square to flag it.</li>
      <li><u>Midde-click</u> (or <u>left+right click</u>) a number to reveal its adjacent squares.</li>
      <li>Press <u>space</u> bar while hovering over a square to flag it or reveal its adjacent squares.</li>
      <li>Press <u>r</u> or click the RESET button to start a new game.</li>
    </ul>
    <h3>
      Mobile
    </h3>
    <ul list="inside decimal" text-start>
      <li><u>Tap</u> an empty square to reveal it.</li>
      <li><u>Long-press</u> an empty square to flag it.</li>
      <li><u>Tap</u> a number to reveal its adjacent squares.</li>
    </ul>
  </div>
</template>
