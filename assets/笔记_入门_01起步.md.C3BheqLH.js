import{_ as h,a as r,c as k,a3 as s,L as a,S as n,R as i,d as c,b as d,a0 as l}from"./chunks/framework.BgWX7Uir.js";import{N as e}from"./chunks/theme.DKta7izT.js";const F={"carousel-img":"_carousel-img_17cqm_2"},g=i("h1",{id:"gitee-pages-部署脚本",tabindex:"-1"},[c("gitee pages 部署脚本 "),i("a",{class:"header-anchor",href:"#gitee-pages-部署脚本","aria-label":'Permalink to "gitee pages 部署脚本"'},"​")],-1),o=d(`<p>不用质疑，用git base here在项目目录下(docs父级文件路径)，执行 <code>sh deploy.sh</code> 命令即可!</p><div class="language-shell vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">#!/usr/bin/end sh</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">set</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -e</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 打包</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs:build</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># 切换到 docs/.vitepress.dist目录</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs/.vitepress/dist</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;gitee actions自动部署&quot;</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> init</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> add</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -A</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> commit</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &quot;\${</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">msg</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">}&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --global</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> http.postBuffer</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 524288000</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># git commit -m &quot;自动部署&quot;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> config</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --global</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> core.autocrlf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> false</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">git</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> push</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> https://gitee.com/zhangjunjie/docs.git</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --force</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> master:dist</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> -</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docs/.vitepress/dist</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br></div></div><p>不用质疑，--force强制推送即可，很强，能有效减少一半的报错几率!</p>`,3),b=i("div",{style:{width:"200px",height:"40px","line-height":"40px","text-align":"center","font-size":"14px"}}," 可视高度：300px ",-1),m=i("div",{style:{width:"200px",height:"40px","line-height":"40px","text-align":"center","font-size":"14px"}}," 改变位置 ",-1),v=JSON.parse('{"title":"gitee pages 部署脚本","description":"","frontmatter":{},"headers":[],"relativePath":"笔记/入门/01起步.md","filePath":"笔记/入门/01起步.md","lastUpdated":1717924388000}'),u={name:"笔记/入门/01起步.md"},C=Object.assign(u,{setup(_){return(B,E)=>{const t=l("ArticleMetadata"),p=l("ClientOnly");return r(),k("div",null,[g,s(p,null,{default:a(()=>[s(t)]),_:1}),o,s(n(e),{right:100}),s(n(e),{bottom:100,"visibility-height":300},{default:a(()=>[b]),_:1}),s(n(e),{right:40,bottom:160},{default:a(()=>[m]),_:1})])}}}),y={$style:F},A=h(C,[["__cssModules",y]]);export{v as __pageData,A as default};
