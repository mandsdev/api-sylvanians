<script setup lang="ts">
  interface CatalogItem {
    id: string
    productCode: string
    name: string
    originalName: string
    species: string
    image: string
    story: string
    price?: string
    releaseYear?: string
  }

  const { ownedProductCodes, toggle } = useCollection()
  const {
    data: response,
    error,
    pending,
  } = await useFetch<{ results: CatalogItem[] }>('/api/sylvanians')

  const collection = computed(() =>
    (response.value?.results ?? []).filter((item) =>
      ownedProductCodes.value.includes(item.productCode),
    ),
  )
</script>

<template>
  <main class="min-h-screen bg-[#f7f4ee] text-[#26332b]">
    <header class="border-b border-[#d9dfd5] bg-[#fdfcf8]">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <NuxtLink to="/" class="text-lg leading-tight font-semibold text-[#630a28]"
          >Sylvanian Archive</NuxtLink
        >
        <NuxtLink to="/" class="font-serif text-sm font-medium text-[#630a28] hover:text-[#9c516a]"
          >Voltar ao catálogo</NuxtLink
        >
      </div>
    </header>

    <section class="mx-auto max-w-6xl px-5 pt-12 pb-16 sm:px-8 sm:pt-16">
      <div class="mb-5 flex items-baseline justify-between gap-4 border-b border-[#9c516a] pb-3">
        <h1 class="font-serif text-2xl font-semibold text-[#630a28]">Minha coleção</h1>
        <span class="text-sm text-[#68776a]"
          >{{ collection.length }} {{ collection.length === 1 ? 'item' : 'itens' }}</span
        >
      </div>

      <p v-if="pending" class="py-12 text-center text-[#68776a]" role="status">
        Carregando coleção...
      </p>
      <p v-else-if="error" class="py-12 text-center text-[#9d4238]" role="alert">
        Não foi possível carregar o catálogo. Tente novamente.
      </p>
      <div v-else-if="!collection.length" class="py-16 text-center">
        <p class="text-[#68776a]">Sua coleção ainda está vazia.</p>
        <NuxtLink
          to="/"
          class="mt-4 inline-block font-medium text-[#630a28] underline decoration-[#f288ab] underline-offset-4 hover:text-[#9c516a]"
          >Explorar catálogo</NuxtLink
        >
      </div>

      <ul v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="item in collection"
          :key="item.productCode"
          class="flex flex-col overflow-hidden border border-[#d9dfd5] bg-[#fdfcf8]">
          <img
            :src="item.image"
            :alt="item.name"
            class="aspect-5/5 w-full bg-[#e8e9df] object-cover"
            loading="lazy" />
          <div class="flex flex-1 flex-col p-6">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="text-xs font-semibold tracking-wider text-[#630a28] uppercase">{{
                item.species
              }}</span>
              <span v-if="item.releaseYear" class="text-xs text-[#68776a]">{{
                item.releaseYear
              }}</span>
            </div>
            <h2 class="text-lg font-semibold">{{ item.name }}</h2>
            <p class="mt-1 text-sm text-[#68776a] italic">
              {{ item.price ?? 'Preço não informado' }}
            </p>
            <p class="mt-1 text-sm text-[#68776a] italic">{{ item.originalName }}</p>
            <p class="mt-4 mb-6 text-sm leading-6 text-[#47554a]">{{ item.story }}</p>
            <label
              class="mt-auto flex min-h-10 cursor-pointer items-center gap-3 border-t border-[#d9dfd5] pt-4 text-sm font-medium text-[#630a28]">
              <span class="relative size-4 shrink-0">
                <input
                  type="checkbox"
                  class="peer size-4 cursor-pointer appearance-none rounded-sm border border-[#9c516a] bg-white checked:border-[#9c516a] checked:bg-[#9c516a] hover:border-[#630a28] focus-visible:ring-2 focus-visible:ring-[#9c516a] focus-visible:ring-offset-2 focus-visible:outline-none"
                  :checked="ownedProductCodes.includes(item.productCode)"
                  @change="toggle(item.productCode)" />
                <svg
                  class="pointer-events-none absolute inset-0 size-4 p-0.5 text-white opacity-0 peer-checked:opacity-100"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true">
                  <path
                    d="m3 8 3 3 7-7"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
              </span>
              <span>Tenho este item</span>
            </label>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
