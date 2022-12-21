import defaultSettings from '@/settings'

const title = defaultSettings.title || '疫情数据分析可视化平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
