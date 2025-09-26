<template>
  <section>
    <div class="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">Dynamic Image Gallery</h1>
      </div>
    </div>
    <ImageGallery />
  </section>
</template>

<script setup lang="ts">
import ImageGallery from '@/components/ImageGallery.vue'
</script>
