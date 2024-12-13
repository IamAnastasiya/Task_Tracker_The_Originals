import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: true },
    ssr: true,
    modules: ['@pinia/nuxt'],
    app: {
        head: {
            title: 'The Originals - Task Tracker',
        },
    },
})
