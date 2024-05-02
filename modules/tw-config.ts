import { addTemplate, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    nuxt.hook('tailwindcss:resolvedConfig', (config) => {
      addTemplate({
        filename: 'intellisense-tw.cjs', // gets prepended by .nuxt/
        getContents: () => `
          /* my-comment */
          module.exports = ${JSON.stringify(config)}
        `,
        write: true,
      })
    })
  },
})
