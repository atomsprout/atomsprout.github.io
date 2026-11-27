import {arrow, esc, external, privacyUrl} from './catalog.mjs';

export const folucentLanguages = {en: '/folucent/', 'zh-CN': '/folucent/zh-CN/'};

export function folucentChinesePage(product, styles) {
  const store = `https://apps.apple.com/cn/app/folucent/id${product.store_id}`;
  const scan = '/assets/folucent-zh-review.webp';
  const download = `<a class="button primary" href="${store}" ${external}>在 App Store 免费下载 ${arrow}</a>`;
  const body = `
  <section class="app-hero wrap">
    <div class="app-heading">
      <a class="back" href="${folucentLanguages.en}" hreflang="en" lang="en">← English</a>
      <div class="app-identity"><img src="${product.icon}" width="60" height="60" alt=""><span>页澄 <span lang="en">Folucent</span></span></div>
      <h1>扫描版 PDF，<br>也能搜到原页</h1>
      <p class="app-lead">在 iPad 上读扫描教材、讲义和论文。识别文字后按关键词找回原页，读到要紧处就写一句自己的理解。下次复习，点笔记就能回到出处。</p>
      <div class="app-actions">${download}<a class="text-link" href="#pro">查看 Pro 买断功能 <span aria-hidden="true">↓</span></a></div>
      <p class="app-platform">iPhone、iPad 和 Mac · 需要 iOS、iPadOS 或 macOS ${esc(product.minimum_os)} 或更新版本 · Mac 需搭载 Apple M1 或更新芯片</p>
    </div>
    <div class="app-hero-visual">
      <figure class="app-shot">
        <a href="${scan}" data-preview aria-label="放大页澄应用截图"><img src="${scan}" width="1600" height="1200" alt="页澄 iPad 版将扫描讲义第 2 页与识别文字并排显示" fetchpriority="high"><span class="enlarge" aria-hidden="true">↗</span></a>
        <figcaption>在 iPad 上对照原页审阅识别结果</figcaption>
      </figure>
    </div>
  </section>
  <section class="app-features wrap" aria-labelledby="folucent-cn-flow">
    <div class="app-section-heading"><h2 id="folucent-cn-flow">找得到，也记得住</h2></div>
    <div class="app-feature-grid">
      <article><h3>在扫描件里搜索</h3><p>从「文件」打开 PDF，识别图片里的印刷文字。搜索一个术语，点结果就回到对应的页。</p></article>
      <article><h3>对照原页修正文字</h3><p>逐页查看原图和识别结果，修正容易看错的人名或数字。已确认的文字可用于搜索，原始 PDF 保持原样。</p></article>
      <article><h3>复习时找回上下文</h3><p>边读边标注，把自己的理解存为学习笔记。再打开笔记时，点一下就能回到原页核对。</p></article>
    </div>
  </section>
  <section class="app-information folucent-cn-info wrap" id="pro" aria-labelledby="folucent-cn-pro">
    <div>
      <h2 id="folucent-cn-pro">先免费用自己的 PDF</h2>
      <p>阅读、标注、扫描页识别和审阅、学习笔记与标准导出都可免费使用。</p>
      <h3>Folucent Pro · 一次性买断</h3>
      <p>把不同 PDF 的笔记整理成专题学习集，输出 PDF 或 Markdown 学习讲义。也可以朗读 PDF，或在适用的系统和语言下运行设备端整本翻译，逐页对照原文。</p>
      <p class="folucent-cn-price"><strong>¥98</strong> 中国大陆 App Store · 以购买页显示为准</p>
      <div class="app-links"><a href="/folucent/support/">使用帮助 ${arrow}</a><a href="${privacyUrl(product)}">隐私政策 ${arrow}</a></div>
    </div>
    <div>
      <h2>常见问题</h2>
      <details class="release-details"><summary>识别会改动我的 PDF 吗？</summary><div class="prose"><p>识别和审阅的文字存于页澄，在应用内搜索。编辑识别结果时，原始 PDF 的内容和版式保持原样。</p></div></details>
      <details class="release-details"><summary>阅读和识别需要联网或配置 AI 吗？</summary><div class="prose"><p>已下载的 PDF 可以在设备上阅读、识别与审阅。选段 AI 解读取决于设备、地区、设置或所选服务。主动使用 Apple 云端或自定义服务时，所选文字及相关上下文会发送给该服务。详情见隐私政策。</p></div></details>
      <details class="release-details"><summary>如何让扫描页参与朗读或翻译？</summary><div class="prose"><p>先识别扫描页，再对照原图确认需要处理的页。Pro 的朗读与整本翻译会使用审阅后的文字。整本翻译取决于系统支持的语言对，首次使用可能需要下载语言包。</p></div></details>
      <details class="release-details"><summary>重装之后如何找回 Pro？</summary><div class="prose"><p>用购买时的 Apple 账户，在页澄的 Pro 页面点「恢复购买」。书库与笔记可用书库备份另行恢复。</p></div></details>
      <div class="app-final-action">${download}</div>
    </div>
  </section>
  <dialog class="image-preview" aria-label="应用截图预览"><button type="button" class="preview-close" aria-label="关闭预览">关闭 ×</button><img alt=""><p></p></dialog>`;

  return {
    title: '页澄 Folucent · PDF 阅读与学习',
    description: '免费的 PDF 阅读、扫描页识别与审阅、标注和学习笔记。一点回到原页，支持 iPad、iPhone 和 Mac。',
    route: folucentLanguages['zh-CN'],
    lang: 'zh-CN',
    alternateLanguages: folucentLanguages,
    product: {...product, name: '页澄 Folucent', store_url: store},
    body,
    bodyClass: 'product-page product-folucent folucent-cn',
    styles,
  };
}
