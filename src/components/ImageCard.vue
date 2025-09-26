<template>
  <div class="group relative overflow-hidden rounded-xl bg-slate-100 shadow-sm ring-1 ring-slate-200/60 transition hover:shadow-md dark:bg-slate-800 dark:ring-slate-700">
    <img
      :src="image.src"
      :alt="image.alt"
      class="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.03] sm:h-56 md:h-64 group-hover:cursor-pointer"
      loading="lazy"
      @click="onClick"
    />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
    <div class="absolute inset-x-0 bottom-0 flex translate-y-3 items-end justify-between p-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 group-hover:cursor-pointer">
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
