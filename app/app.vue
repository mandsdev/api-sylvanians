<script setup lang="ts">
const { search, response, error, pending } = useSylvanians()
</script>

<template>
	<main class="min-h-screen bg-[#f7f4ee] text-[#26332b]">
		<header class="border-b border-[#d9dfd5] bg-[#fdfcf8]">
			<div class="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
				<a href="/" class="flex items-center gap-3" aria-label="Sylvanian Archive, início">
					<span class="grid size-12 place-items-center rounded-full bg-[#f288ab] text-lg text-white" aria-hidden="true"> <img src="https://www.sugoimart.com/cdn/shop/collections/SylvanianFamiliesIcon.png?v=1748936071"   > </span>
					<span>
						<span class="block text-lg font-semibold leading-tight text-[#630a28]">Sylvanian Archive</span>
						<span class="block text-xs tracking-wide text-[#9c516a]">SUA API SYLVANIAN!</span>
					</span>
				</a>
				<span class="hidden text-sm text-[#9c516a] sm:block">histórias e itens</span>
			</div>
		</header>

		<section class="mx-auto max-w-6xl px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
			<p class="mb-3 text-xs font-semibold tracking-[0.18em] text-[#630a28]"></p>
			<div class="grid gap-8 md:grid-cols-[1fr_18rem] md:items-end">
				<div>
					<h1 class="max-w-2xl font-serif text-4xl leading-tight sm:text-5xl text-[#9c516a] ml-16">Encontre sua próxima família favorita.</h1>
					<p class="mt-4 max-w-xl text-base leading-7 text-[#630a28] ml-16 text-center">Explore os items, conheça suas histórias e descubra tudo.</p>
				</div>
				<Search v-model="search" />
			</div>
		</section>

		<section class="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
			<div class="mb-5 flex items-baseline justify-between gap-4 border-b border-[#d9dfd5] pb-3">
				<h2 class="text-lg font-semibold">Famílias</h2>
				<span v-if="!pending && !error" class="text-sm text-[#68776a]">{{ response?.total ?? 0 }} encontradas</span>
			</div>

			<p v-if="pending" class="py-12 text-center text-[#68776a]" role="status">Carregando famílias...</p>
			<p v-else-if="error" class="py-12 text-center text-[#9d4238]" role="alert">Não foi possível carregar o catálogo. Tente novamente.</p>
			<p v-else-if="!response?.results.length" class="py-12 text-center text-[#68776a]">Nenhum item encontro para “{{ search }}”.</p>

			<ul v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
				<li v-for="family in response.results" :key="family.id" class="overflow-hidden border border-[#d9dfd5] bg-[#fdfcf8]">
										<img :src="family.image" :alt="family.name" class="aspect-[5/5] w-full bg-[#e8e9df] object-cover" loading="lazy">
					<div class="p-6">
						<div class="mb-2 flex items-center justify-between gap-3">
							<span class="text-xs font-semibold uppercase tracking-wider text-[#a35c3c]">{{ family.species }}</span>
							<span v-if="family.releaseYear" class="text-xs text-[#68776a]">{{ family.releaseYear }}</span>
						</div>
												<h3 class="text-lg font-semibold">{{ family.name }}</h3>
												<p class="mt-1 text-sm italic text-[#68776a]">{{ family.originalName }}</p>
												<p class="mt-4 text-sm leading-6 text-[#47554a]">{{ family.story }}</p>
					</div>
				</li>
			</ul>
		</section>
	</main>
</template>
