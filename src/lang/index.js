import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie' 

import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'

import enLocale from './en'
import zhLocale from './zh'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

export const getLanguage = () => {
  const chooseLanguage = Cookies.get('language')
  if (chooseLanguage) {
    return chooseLanguage
  }
  const language = (window.navigator.language || window.navigator.userLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (let locale of locales) {
    if (language.includes(locale)) {
      return locale
    }
  }
  return 'en'
}

export default new VueI18n({
  locale: getLanguage(),
  messages
})
