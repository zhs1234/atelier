import { Aperture, Code2, Eye, Feather, Layers, Wand2, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export const site = {
  name: 'XGOUO',
  email: 'xgouoo@outlook.com',
  qq: '56161944',
  qqLink: 'tencent://message/?uin=56161944',
  sites: [
    { label: 'xgouo.cn', href: 'https://xgouo.cn' },
    { label: 'wcnmb.top', href: 'https://wcnmb.top' },
  ],
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  num: string
  slug: string
  title: string
  role: string
  type: string
  year: string
  summary: string
  cover: string
  client: string
  duration: string
  tools: string[]
  verses: string[]
  body: string[]
  outcome: string
  links?: ProjectLink[]
}

export const projects: Project[] = [
  {
    num: '01',
    slug: 'gouo-canvas',
    title: '构象画院',
    role: '全案筑造',
    type: 'AI 创作台',
    year: '2026',
    summary: '一念成图：文生图、参考与蒙版同卷，密钥守于后山，云库自随人走。',
    cover: 'linear-gradient(145deg, #0a0c12 0%, #1a2744 42%, #e8ff47 155%)',
    client: '自研开源',
    duration: '持续迭代',
    tools: ['React', 'TypeScript', 'Vite', 'Go', 'One Hub'],
    verses: ['意在笔先', '象生于云', '器不外泄'],
    body: [
      'Gouo Canvas 是面向创作的 AI 图像工作台：文生图、参考图编辑、变体与蒙版修图同处一室，至多十六帧参照可写入提示之中。',
      '尺寸、质量、格式、透明与审核等旋钮齐备；图库可检索、可成集、可批量导出。账号、额度、兑换与用量履历，皆落在服务端。',
      '生产架构为 React 前端与 Go（One Hub）后端同域协作：平台密钥只驻后山，用户各有隔离账户、中继令牌与云图库；亦可 PWA 安装，桌面与掌上同卷。',
    ],
    outcome: '已开源并部署演示境，供人亲试造象之路。',
    links: [
      { label: '观其境', href: 'https://canvas.wcnmb.top/' },
      { label: 'GitHub', href: 'https://github.com/zhs1234/gouo-canvas' },
    ],
  },
  {
    num: '02',
    slug: 'wcnmb',
    title: '启程灯塔',
    role: '一人通航',
    type: '开发者启动台',
    year: '2026',
    summary: 'Landing 为门，导航为径——项目、笔记、工具与信笺，一站启程。',
    cover: 'linear-gradient(160deg, #0c0c0c 0%, #1c2430 48%, #e8ff47 145%)',
    client: '个人作品',
    duration: '精炼成册',
    tools: ['React 19', 'Vite', '纯 CSS', 'i18n'],
    verses: ['门开即见海', '灯在岸上明', '舟轻载得远'],
    body: [
      'WCNMB 是个人开发者导航页：全屏 Landing 以打字与光晕迎客，入内则是项目、文章、工具、社交与学习的分类长廊。',
      '明暗主题随系统亦可手拨，中英双语一键切换；精选大卡与紧凑列表并存，联系以卡片弹出，复制邮箱或直达邮差。',
      '零 UI 框架，CSS 变量驱题；Vite + React 19 构建，体量克制，便于部署于任意静态源。',
    ],
    outcome: '作为启程入口，把散落的链收束成可游的港。',
    links: [{ label: 'GitHub', href: 'https://github.com/zhs1234/wcnmb' }],
  },
  {
    num: '03',
    slug: 'xgouo-atelier',
    title: '以光写意',
    role: '作者自况',
    type: '沉浸个人站',
    year: '2026',
    summary: '浏览器为纸，光影为墨——粒子、音场与诗词同卷，写 XGOUO 之境。',
    cover: 'linear-gradient(135deg, #050505 0%, #141414 50%, #e8ff47 150%)',
    client: '本站',
    duration: '现境',
    tools: ['React', 'TypeScript', 'Three.js', 'Vite', 'Web Audio'],
    verses: ['屏幕非器', '光与韵的舞台', '一见即成永恒'],
    body: [
      '本站是 XGOUO 的数字工坊门面：多路由长卷串联首页、案上卷轴、三昧、行笔、山人与投书，文案取诗词意境，图标只用 Lucide。',
      'Three.js 粒子星云为底，自定义光标与氛围音场相伴；加载、全屏菜单与滚动显现，皆为同一套深色与酸橙强调的视觉语法。',
      '纯静态可部署，Nginx 一则 try_files 即可；联系方式落于信笺——邮箱、QQ 与双域名同在卷末。',
    ],
    outcome: '你此刻所见，即是此卷。',
    links: [{ label: 'GitHub', href: 'https://github.com/zhs1234' }],
  },
]

export type Capability = {
  icon: LucideIcon
  title: string
  desc: string
  tag: string
  detail: string[]
}

export const capabilities: Capability[] = [
  {
    icon: Aperture,
    title: '观物取象',
    desc: '以形写神，令品牌在光影与材质间自在呼吸。',
    tag: '品牌 / 意象经营',
    detail: [
      '品牌内核提炼与意象地图',
      '主视觉与延展系统',
      '数字与物理触点的统一语法',
    ],
  },
  {
    icon: Code2,
    title: '以代码入诗',
    desc: '着色如墨，物理如韵，生成逻辑皆可成章。',
    tag: 'WebGL / React / GSAP',
    detail: [
      '沉浸式站点与创意前端',
      '着色器、粒子与生成视觉',
      '可维护的生产级工程结构',
    ],
  },
  {
    icon: Feather,
    title: '字舞风生',
    desc: '排字如弈，转场如诗，一动一静皆有余味。',
    tag: '动态 / 字体意境',
    detail: [
      '编辑式排版与中文语境优化',
      '转场、时间轴与叙事节奏',
      '动效规范与落地交付',
    ],
  },
]

export type ProcessStep = {
  num: string
  title: string
  desc: string
  icon: LucideIcon
  points: string[]
}

export const processSteps: ProcessStep[] = [
  {
    num: '01',
    title: '听风',
    desc: '静观其核，察受众之心，辨时代之声。',
    icon: Eye,
    points: ['对话与调研', '竞品与文化信号', '创作坐标系'],
  },
  {
    num: '02',
    title: '立骨',
    desc: '构意象、筑原型，先立其骨，后赋其魂。',
    icon: Wand2,
    points: ['概念方向', '关键原型', '视觉北极星'],
  },
  {
    num: '03',
    title: '琢玉',
    desc: '毫厘之间见山河，动效如水，界面如玉。',
    icon: Layers,
    points: ['高保真界面', '动效与声音', '工程实现'],
  },
  {
    num: '04',
    title: '放舟',
    desc: '调弦至稳，推舟入海，余韵自远。',
    icon: Zap,
    points: ['性能与适配', '上线与观测', '迭代与延展'],
  },
]

export const marqueeItems = [
  '山高月小',
  '水落石出',
  '云深不知',
  '风起青萍',
  '星垂平野',
  '月涌大江',
  '落霞孤鹜',
  '秋水长天',
]

export const navLinks = [
  { num: '01', label: '卷轴', to: '/work', cursor: '展卷' },
  { num: '02', label: '三昧', to: '/craft', cursor: '入定' },
  { num: '03', label: '行笔', to: '/process', cursor: '观法' },
  { num: '04', label: '山人', to: '/about', cursor: '相识' },
  { num: '05', label: '投书', to: '/contact', cursor: '投书' },
]

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug)
}
