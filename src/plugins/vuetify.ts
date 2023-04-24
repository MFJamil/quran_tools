/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
import * as comps from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { ar } from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  directives,
  locale:{
    locale: 'ar',
    fallback: 'ar',
    messages: { ar }
  },
  components:{
    ...comps
  },
   
  theme: {

    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
})
