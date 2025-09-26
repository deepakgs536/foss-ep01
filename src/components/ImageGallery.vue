<template>
  <section>
    <!-- Controls -->
    <div class="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-2">
        <button
          v-for="t in allTags"
          :key="tKey(t)"
          :class="[
            'rounded-full px-3 py-1 text-sm font-medium ring-1 transition',
            selectedTag === t ? 'bg-brand-500 text-white ring-brand-500' : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'
          ]"
          @click="() => setTag(t)"
        >
          {{ t }}
        </button>
      </div>
      <div class="relative">
        <input
          v-model.trim="query"
          type="text"
          placeholder="Search images..."
          class="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 pl-10 text-sm placeholder:text-slate-400 shadow-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-brand-800/40"
        />
        <svg class="pointer-events-none absolute left-3 top-2.5 h-5 w-5 text-slate-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 2a8 8 0 105.293 14.293l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12A6 6 0 0110 4z"/></svg>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <ImageCard
        v-for="(img, idx) in filtered"
        :key="img.id"
        :image="img"
        @select="() => openLightbox(idx)"
      />
    </div>

    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" @keydown.esc.window="closeLightbox">
        <button class="absolute right-4 top-4 rounded-full bg-white/90 p-2 text-slate-700 shadow ring-1 ring-slate-200 hover:bg-white" aria-label="Close" @click="closeLightbox">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
        <button class="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-700 shadow ring-1 ring-slate-200 hover:bg-white" aria-label="Previous" @click="prev">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M15 6l-6 6 6 6"/></svg>
        </button>
        <figure class="max-h-[90vh] w-full max-w-5xl">
          <img :src="current?.src" :alt="current?.alt" class="mx-auto max-h-[80vh] w-auto rounded-xl object-contain shadow-2xl" />
          <figcaption class="mt-4 text-center text-sm text-slate-200">
            <div class="font-medium">{{ current?.title }}</div>
            <div class="mt-1 flex flex-wrap justify-center gap-2">
              <span v-for="t in current?.tags || []" :key="tKey(t)" class="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-medium text-white ring-1 ring-white/20">{{ t }}</span>
            </div>
          </figcaption>
        </figure>
        <button class="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 text-slate-700 shadow ring-1 ring-slate-200 hover:bg-white" aria-label="Next" @click="next">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-6 w-6"><path d="M9 6l6 6-6 6"/></svg>
        </button>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import ImageCard from '@/components/ImageCard.vue'
import type { GalleryImage, Tag } from '@/components/Tag'

const tags: Tag[] = ['Nature', 'City', 'People', 'Abstract', 'Architecture', 'Animals', 'Travel', 'Objects']

// Import all images in the folder eagerly
const modules = import.meta.glob('@/assets/images/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' }) as Record<string, string>

const images = Object.entries(modules).map<GalleryImage>(([path, src], i) => {
  const file = path.split('/').pop() || 'image'
  const base = file.replace(/\.[^.]+$/, '')
  const t1 = tags[i % tags.length]
  const t2 = tags[(i + 3) % tags.length]
  return {
    id: String(i + 1),
    src,
    alt: `Gallery ${base}`,
    title: `Photo ${base}`,
    tags: [t1, t2],
  }
})

// UI state
const query = ref('')
const selectedTag = ref<Tag | 'All'>('All')

const allTags = computed(() => (['All' as const].concat(tags)))
const filtered = computed(() => {
  const q = query.value.toLowerCase().trim()
  return images.filter((img) => {
    const matchQ = !q || img.title.toLowerCase().includes(q) || img.alt.toLowerCase().includes(q)
    const matchTag = selectedTag.value === 'All' || img.tags.includes(selectedTag.value)
    return matchQ && matchTag
  })
})

function setTag(t: Tag | 'All') {
  selectedTag.value = t
}
function tKey(t: Tag | 'All') {
  return `tag-${t}`
}

// Lightbox
const state = reactive({
  openIndex: -1,
})

const isOpen = computed(() => state.openIndex >= 0)
const current = computed(() => (isOpen.value ? filtered.value[state.openIndex] : undefined))

function openLightbox(indexInFiltered: number) {
  state.openIndex = indexInFiltered
}
function closeLightbox() {
  state.openIndex = -1
}
function next() {
  if (!filtered.value.length) return
  state.openIndex = (state.openIndex + 1) % filtered.value.length
}
function prev() {
  if (!filtered.value.length) return
  state.openIndex = (state.openIndex - 1 + filtered.value.length) % filtered.value.length
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 200ms ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
