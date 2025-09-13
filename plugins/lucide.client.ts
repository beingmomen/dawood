import { LucideVue } from 'lucide-vue-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(LucideVue)
})