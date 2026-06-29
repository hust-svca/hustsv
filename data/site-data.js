/* ===========================================================
   华中科技大学北加州校友会 — 全站共享内容数据
   单一数据源，风格 B / 风格 C 共用。
   组织/理事会信息来自校友组织备案表（公开信息）。
   文章正文与照片见 articles.js（由公众号 .md 自动解析）。
   =========================================================== */
window.SITE_DATA = {

  org: {
    nameZh: "华中科技大学北加州校友会",
    nameShort: "华科北加州校友会",
    nameEn: "HUST Alumni Association of Northern California",
    abbr: "HUSTAA-NC",
    founded: 1998,
    alumni: "5000+",
    forums: 16,
    domain: "hustsv.org",
    email: "hust.svca@gmail.com",
    wechat: "华科北加校友会",
    nonprofit: "501(c)(3)",
    purpose: "服务校友，修学敦谊，成为硅谷旧金山湾区及北加州校友联络交流的平台，进而成为其它社团及广大海内外校友联系的桥梁和纽带。"
  },

  /* 现任理事会（第六届，2025年9月换届）——
     仅公开姓名与职务，不含工作单位等个人信息 */
  currentLeaders: [
    { role: "会长",  name: "孙彦杰" },
    { role: "理事长", name: "周小松" },
    { role: "副会长", name: "胡满琛" },
    { role: "副会长", name: "夏鸣" },
    { role: "副会长", name: "阮家彪" },
    { role: "副会长", name: "吕玮" },
    { role: "副会长", name: "房姗姗" },
    { role: "秘书长", name: "粟海" },
    { role: "财务长", name: "付雨婷" }
  ],

  /* 历届会长 */
  pastPresidents: [
    { term: "第一届", year: 1998, name: "杨建东" },
    { term: "第二届", year: 2006, name: "罗逍" },
    { term: "第三届", year: 2013, name: "吴隆安" },
    { term: "第四届", year: 2017, name: "粟海" },
    { term: "第五届", year: 2021, name: "周小松" },
    { term: "第六届", year: 2025, name: "孙彦杰", current: true }
  ],

  /* 硅谷论坛历期（按可考资料整理，部分早期期次嘉宾从略） */
  forum: [
    { n: 16, year: 2025, title: "北美企业家协会第五届年会暨第十六届硅谷论坛", guest: "联合华科北美企业家协会", id: "202501041346" },
    { n: 15, year: 2023, title: "Web 3.0 与疫情后创业", guest: "姚欣 · PPTV 创始人", id: "202302261401" },
    { n: 14, year: 2020, title: "工程师进阶之路", guest: "谷歌资深工程师主讲", id: "202010210251" },
    { n: 11, year: 2019, title: "区块链如何把数据权还给用户", guest: "区块链行业嘉宾", id: "201904032343" },
    { n: 10, year: 2017, title: "走近黄晓庆和他的云端机器人", guest: "黄晓庆 · 达闼科技创始人", id: "201712120539" },
    { n: 9,  year: 2017, title: "如何建立一个 AI Startup", guest: "AI 创业者圆桌", id: "201706060729" },
    { n: 8,  year: 2017, title: "全手势操控：00 后社交时代的交互革命", guest: "交互技术团队", id: "201705191045" },
    { n: 6,  year: 2017, title: "PPTV 创始人姚欣 × Dian 团队创始人刘玉教授", guest: "姚欣、刘玉教授", id: "201702071323" },
    { n: 5,  year: 2016, title: "淘米网创始故事", guest: "汪海兵 · 淘米 CEO", id: "201609200429" }
  ],

  /* 文章分类（与 articles.js 中的 cat 对应） */
  cats: {
    all:     { label: "全部", emoji: "📰" },
    bbq:     { label: "金秋烧烤", emoji: "🍢" },
    forum:   { label: "硅谷论坛", emoji: "🎤" },
    gala:    { label: "春晚 · 元宵", emoji: "🏮" },
    charity: { label: "公益 · 抗疫", emoji: "🤝" },
    other:   { label: "其他活动", emoji: "✨" }
  }
};
