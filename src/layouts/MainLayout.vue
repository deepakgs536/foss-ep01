<template>
  <div class="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

function toggleTheme() {
  const root = document.documentElement
  const isDark = root.classList.toggle('dark')
  localStorage.setItem('lumina-theme', isDark ? 'dark' : 'light')
}

onMounted(() => {
  const saved = localStorage.getItem('lumina-theme')
  if (saved === 'dark') document.documentElement.classList.add('dark')
})
</script>
