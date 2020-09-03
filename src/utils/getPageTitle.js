import i18n from '@/lang'
import defaultSetting from '@/setting'

const title = defaultSetting.title || 'Vue Element Admin'

export const getPageTitle = key => {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageTitle = i18n.t(`route.${key}`)
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
