<template>
  <footer class="border-t border-slate-200/70 bg-white/80 py-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-slate-800 dark:bg-slate-900/70">
    <div class="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
      <p>&copy; {{ year }} Lumina Gallery. Built with Vue 3 + TailwindCSS.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>
