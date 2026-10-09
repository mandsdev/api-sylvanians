<script setup lang="ts">
  const { search, response, error, pending } = useSylvanians()
  const { ownedProductCodes, toggle } = useCollection()
  const isSidebarOpen = ref(false)
</script>

<template>
  <main class="min-h-screen bg-[#f7f4ee] text-[#26332b]" @keydown.esc="isSidebarOpen = false">
    <header class="border-b border-[#d9dfd5] bg-[#fdfcf8]">
      <div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <button
          type="button"
          class="flex items-center gap-3"
          aria-label="Abrir menu"
          :aria-expanded="isSidebarOpen"
          aria-controls="collection-sidebar"
          @click="isSidebarOpen = !isSidebarOpen">
          <span
            class="grid size-12 place-items-center rounded-full bg-[#f288ab] text-lg text-white"
            aria-hidden="true"
            ><img
              src="https://www.sugoimart.com/cdn/shop/collections/SylvanianFamiliesIcon.png?v=1748936071"
          /></span>
          <span>
            <span class="block text-lg leading-tight font-semibold text-[#630a28]"
              >Sylvanian Archive</span
            >
            <span class="block font-serif text-xs tracking-wide text-[#9c516a]"
              >SUA API SYLVANIAN!</span
            >
          </span>
        </button>
        <span class="hidden font-serif text-sm text-[#9c516a] sm:block">coleções &lt;3</span>
      </div>
    </header>

    <div
      v-show="isSidebarOpen"
      class="fixed inset-0 z-40 bg-[#26332b]/35"
      @click="isSidebarOpen = false"></div>
    <aside
      v-show="isSidebarOpen"
      id="collection-sidebar"
      class="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col border-r border-[#d9dfd5] bg-[#fdfcf8] p-6 shadow-xl"
      aria-label="Menu principal">
      <div class="mb-8 flex items-center justify-between gap-4 border-b border-[#d9dfd5] pb-4">
        <h2 class="text-lg font-semibold text-[#630a28]">Menu</h2>
        <button
          type="button"
          class="grid size-10 place-items-center text-xl text-[#630a28] hover:bg-[#f7f4ee]"
          aria-label="Fechar menu"
          @click="isSidebarOpen = false">
          ×
        </button>
      </div>
      <nav aria-label="Navegação principal">
        <NuxtLink
          to="/colecao"
          class="block border-b border-[#d9dfd5] py-4 font-medium text-[#630a28] hover:text-[#9c516a]"
          @click="isSidebarOpen = false"
          >Minha coleção</NuxtLink
        >
      </nav>
    </aside>

    <section class="mx-auto max-w-6xl px-5 pt-12 pb-10 sm:px-8 sm:pt-16">
      <div class="grid gap-8 md:grid-cols-[1fr_18rem] md:items-end">
        <div>
          <h1 class="max-w-2xl font-serif text-4xl leading-tight text-[#9c516a] sm:text-5xl">
            Encontre sua próxima família favorita.
          </h1>
          <p class="mt-4 ml-16 max-w-xl text-center text-base leading-7 text-[#630a28]">
            Explore os items, conheça suas histórias e descubra tudo.
          </p>
        </div>
        <Search v-model="search" />
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
      <div class="mb-5 flex items-baseline justify-between gap-4 border-b border-[#9c516a] pb-3">
        <h2 class="font-serif text-lg font-semibold text-[#630a28]">Famílias</h2>
        <span v-if="!pending && !error" class="text-sm text-[#946172]"
          >{{ response?.total ?? 0 }} encontradas</span
        >
      </div>

      <p v-if="pending" class="py-12 text-center text-[#68776a]" role="status">
        Carregando famílias...
      </p>
      <p v-else-if="error" class="py-12 text-center text-[#630a28]" role="alert">
        Não foi possível carregar o catálogo. Tente novamente.
      </p>
      <p v-else-if="!response?.results.length" class="py-12 text-center text-[#946172]">
        Nenhum item encontrado para “{{ search }}”.
      </p>

      <ul v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="family in response.results"
          :key="family.id"
          class="flex flex-col overflow-hidden border border-[#d9dfd5] bg-[#fdfcf8]">
          <img
            :src="family.image"
            :alt="family.name"
            class="aspect-square w-full bg-[#e8e9df] object-cover"
            loading="lazy" />
          <div class="flex flex-1 flex-col p-6">
            <div class="mb-2 flex items-center justify-between gap-3">
              <span class="text-xs font-semibold tracking-wider text-[#630a28] uppercase">{{
                family.species
              }}</span>
              <span v-if="family.releaseYear" class="text-xs text-[#68776a]">{{
                family.releaseYear
              }}</span>
            </div>
            <h3 class="text-lg font-semibold">{{ family.name }}</h3>
            <p class="mt-1 text-sm text-[#68776a] italic">
              {{ family.price ?? 'Preço não informado' }}
            </p>
            <p class="mt-1 text-sm text-[#68776a] italic">{{ family.originalName }}</p>
            <p class="mt-4 mb-6 text-sm leading-6 text-[#47554a]">{{ family.story }}</p>
            <label
              class="mt-auto flex min-h-10 cursor-pointer items-center gap-3 border-t border-[#d9dfd5] pt-4 text-sm font-medium text-[#630a28]">
              <span class="relative size-4 shrink-0">
                <input
                  type="checkbox"
                  class="peer size-4 cursor-pointer appearance-none rounded-sm border border-[#9c516a] bg-white checked:border-[#9c516a] checked:bg-[#9c516a] hover:border-[#630a28] focus-visible:ring-2 focus-visible:ring-[#9c516a] focus-visible:ring-offset-2 focus-visible:outline-none"
                  :checked="ownedProductCodes.includes(family.productCode)"
                  @change="toggle(family.productCode)" />
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
              <span>Já tenho este item?</span>
            </label>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
