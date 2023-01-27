import { createI18n } from 'vue-i18n'
import en from './en.json'
import zhCN from './zh-CN.json'

const messages = {
  en,
  'zh-CN': zhCN,
}

export const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'zh-CN', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
})
