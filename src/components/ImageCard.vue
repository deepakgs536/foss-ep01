<template>
  <div class="group relative overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200/60 transition hover:shadow-md dark:bg-slate-800 dark:ring-slate-700">
    <img
      :src="image.src"
      :alt="image.alt"
      class="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:h-56 md:h-64"
      loading="lazy"
      @click="onClick"
    />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    <div class="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
      <div class="max-w-[75%]">
        <h3 class="truncate text-sm font-semibold text-white drop-shadow">{{ image.title }}</h3>
        <div class="mt-1 flex flex-wrap gap-1">
          <span
            v-for="t in image.tags"
            :key="t"
            class="pointer-events-none rounded-md bg-white/15 px-2 py-0.5 text-[10px] font-medium text-white/95 ring-1 ring-white/20 backdrop-blur-sm"
          >{{ t }}</span>
        </div>
      </div>
      <button
        class="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow ring-1 ring-slate-200 transition hover:bg-white"
        aria-label="Open image"
        @click.stop="onClick"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-5 w-5">
          <path d="M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14"/><path d="M7 14l3-3 2 2 3-3 4 4"/><path d="M21 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2"/></svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GalleryImage } from './Tag'

const props = defineProps<{ image: GalleryImage }>()
const emit = defineEmits<{ (e: 'select', image: GalleryImage): void }>()

function onClick() {
  emit('select', props.image)
}
</script>
