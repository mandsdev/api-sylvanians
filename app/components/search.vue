<script setup lang="ts">
const search = defineModel<string>({ default: '' })
</script>

<template>
  <label class="block">
    <span class="mb-2 block text-sm font-medium text-[#630a28]">Buscar no catálogo</span>
    <span class="mb-8 flex rounded-md  items-center gap-3 border-b-2 border-[#ff4281] bg-[#fdfcf8] px-4 py-3 focus-within:ring-2 focus-within:ring-[#ff4281]">
      <svg class="size-5 shrink-0 text-[#68776a]" aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <circle cx="10.8" cy="10.8" r="6.8" stroke="currentColor" stroke-width="1.8" />
        <path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
      </svg>
      <input v-model="search" type="search" placeholder="Nome, espécie ou código" class="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#8a958b]" autocomplete="off">
    </span>
  </label>
</template>