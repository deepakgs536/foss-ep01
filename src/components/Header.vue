<template>
  <header class="sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/70">
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <div class="flex items-center gap-2">
        <div class="h-8 w-8 rounded-md bg-gradient-to-br from-brand-500 to-brand-400 shadow-inner" aria-hidden="true" />
        <span class="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">Lumina Gallery</span>
      </div>
      <div class="hidden items-center gap-3 sm:flex">
        <button
          class="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-800/70"
          @click="$emit('toggleTheme')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4">
            <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 0 1-10.45-10.6 1 1 0 0 0-1.14-1.4A10 10 0 1 0 22 14a1 1 0 0 0-.36-1z"/>
          </svg>
          <span class="ml-2">Theme</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
defineEmits<{ (e: 'toggleTheme'): void }>()
</script>
