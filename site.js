/* 风格 C 站点脚本：注入导航/页脚 + 渲染数据驱动区块 */
(function(){
  const D = window.SITE_DATA;
  const A = window.ARTICLES || [];
  const page = document.body.dataset.page || "home";
  const esc = s => String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const nav = [
    ["index.html","首页","home"],
    ["about.html","关于我们","about"],
    ["events.html","活动报道","events"],
    ["forum.html","硅谷论坛","forum"]
  ];
  const CATEN = {bbq:"BBQ",forum:"FORUM",gala:"GALA",charity:"CARE",other:"MISC"};

  /* ---- 导航 ---- */
  const header = document.getElementById("nav");
  if(header){
    header.className = "nav";
    header.innerHTML = `
      <div class="nav-inner">
        <a class="brand" href="index.html">
          <span class="chip mono">HUST</span>
          <span><b>华科北加州校友会</b><small>EST.1998 · N. CALIFORNIA</small></span>
        </a>
        <button class="burger" aria-label="菜单"><span></span><span></span><span></span></button>
        <ul class="nav-links">
          ${nav.map(([h,t,k])=>`<li><a href="${h}" class="${k===page?'active':''}">${t}</a></li>`).join("")}
          <li><a href="about.html#join" class="nav-cta">加入我们 →</a></li>
        </ul>
      </div>`;
    const burger = header.querySelector(".burger");
    const links = header.querySelector(".nav-links");
    burger.addEventListener("click",()=>{burger.classList.toggle("open");links.classList.toggle("show");});
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{burger.classList.remove("open");links.classList.remove("show");}));
  }

  /* ---- 页脚 ---- */
  const footer = document.getElementById("footer");
  if(footer){
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="footer-inner">
        <div>
          <div class="ft-name">${D.org.nameZh}<small>${D.org.nameEn}</small></div>
          <p>${D.org.purpose}</p>
        </div>
        <div class="footer-col">
          <h4>SITEMAP</h4>
          ${nav.map(([h,t])=>`<a href="${h}">${t}</a>`).join("")}
        </div>
        <div class="footer-col">
          <h4>CONTACT</h4>
          <a href="mailto:${D.org.email}">${D.org.email}</a>
          <a href="#">微信公众号：华科北加校友会</a>
          <a href="#">${D.org.nonprofit} Nonprofit</a>
        </div>
      </div>
      <div class="footer-base">${D.org.domain} · © 2026 ${D.org.abbr} · EST. ${D.org.founded}</div>`;
  }

  /* ---- 关于：现任领导 ---- */
  const leadBox = document.getElementById("leaders");
  if(leadBox){
    leadBox.innerHTML = D.currentLeaders.map(l=>`
      <div class="le-row">
        <span class="le-role mono">${l.role}</span>
        <span class="le-name">${l.name}</span>
      </div>`).join("");
  }

  /* ---- 关于：历届会长 ---- */
  const presBox = document.getElementById("presidents");
  if(presBox){
    presBox.innerHTML = D.pastPresidents.map(p=>`
      <div class="pnode ${p.current?'now':''}">
        <div class="dot"></div>
        <div><div class="yr">${p.year}</div><div class="nm">${p.name}</div><div class="tm mono">${p.term}${p.current?' · NOW':''}</div></div>
      </div>`).join("");
  }

  /* ---- 硅谷论坛 ---- */
  const forumBox = document.getElementById("forum-list");
  if(forumBox){
    forumBox.innerHTML = D.forum.map(f=>{
      const tag = f.id ? "a" : "div";
      const href = f.id ? ` href="article.html?id=${f.id}"` : "";
      return `<${tag} class="forum-card${f.id?' has-link':''}"${href}>
        <div class="no">${String(f.n).padStart(2,'0')}</div>
        <div><div class="ft">${f.title}</div><div class="fg">${f.guest}</div></div>
        <div class="fy"><div>${f.year}</div>${f.id?'<div class="fmore mono">查看报道 →</div>':''}</div>
      </${tag}>`;
    }).join("");
  }

  /* ---- 首页：最新动态（带封面） ---- */
  const recentBox = document.getElementById("recent");
  if(recentBox){
    recentBox.innerHTML = A.slice(0,3).map(a=>`
      <a class="news-card" href="article.html?id=${a.id}">
        <div class="news-cover" ${a.cover?`style="background-image:url('${a.cover}')"`:''}>
          <span class="news-cat mono">[${CATEN[a.cat]}]</span>
        </div>
        <div class="news-body"><div class="news-date mono">${a.d}</div><h3>${esc(a.t)}</h3></div>
      </a>`).join("");
  }

  /* ---- 文章详情页 ---- */
  const artBox = document.getElementById("article");
  if(artBox){
    const id = new URLSearchParams(location.search).get("id");
    const a = A.find(x=>x.id===id);
    if(!a){ artBox.innerHTML = `<p class="center">没有找到这篇报道。<a href="events.html">返回活动报道 →</a></p>`; }
    else{
      document.title = a.t + " · 华科北加州校友会";
      const body = a.blocks.map(b=>{
        if(b.k==="img") return `<img loading="lazy" src="${b.v}" alt="">`;
        if(b.k==="cap") return `<p class="cap mono">${esc(b.v)}</p>`;
        return `<p>${esc(b.v)}</p>`;
      }).join("");
      const linksHtml = (a.links && a.links.length)
        ? `<div class="art-links"><span class="mono">原文 / 报名链接</span>${a.links.map(l=>`<a href="${l.u}" target="_blank" rel="noopener">${esc(l.t)} ↗</a>`).join("")}</div>`
        : "";
      artBox.innerHTML = `
        <a class="back mono" href="events.html">← EVENTS / 活动报道</a>
        <div class="art-cat mono">[${CATEN[a.cat]}] · ${D.cats[a.cat].label}</div>
        <h1>${esc(a.t)}</h1>
        <div class="art-date mono">${a.d} · 来自公众号「华科北加校友会」</div>
        ${a.cover?`<img class="art-cover" src="${a.cover}" alt="">`:''}
        <div class="art-body">${body}</div>
        <div class="art-foot">
          <div class="mono">本文来自微信公众号「${D.org.wechat}」</div>
          ${linksHtml}
        </div>
        <a class="back mono" href="events.html">← 返回全部活动报道</a>`;
    }
  }

  /* ---- 活动报道：存档 + 筛选 ---- */
  const archBox = document.getElementById("archive");
  if(archBox){
    const countBox = document.getElementById("arch-count");
    function render(cat){
      const list = cat==="all"?A:A.filter(a=>a.cat===cat);
      archBox.innerHTML = list.map(a=>`
        <a class="entry" href="article.html?id=${a.id}">
          <div class="d">${a.d}</div>
          <div class="tt">${esc(a.t)}</div>
          <div class="tag mono cat-${a.cat}">[${CATEN[a.cat]}]</div>
        </a>`).join("");
      if(countBox) countBox.textContent = `// ${String(list.length).padStart(2,'0')} 篇记录`;
    }
    const filterBox = document.getElementById("filters");
    if(filterBox){
      filterBox.innerHTML = Object.entries(D.cats).map(([k,v],i)=>
        `<button class="filter ${i===0?'active':''}" data-cat="${k}">${k==='all'?'ALL':CATEN[k]} · ${v.label}</button>`).join("");
      filterBox.addEventListener("click",e=>{
        const b = e.target.closest(".filter"); if(!b) return;
        filterBox.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
        b.classList.add("active"); render(b.dataset.cat);
      });
    }
    render("all");
  }

})();
