import{_ as p,a as l,c as t,a3 as a,L as d,R as s,d as c,b as r,a0 as e}from"./chunks/framework.BgWX7Uir.js";const C=JSON.parse('{"title":"安装ubuntu版本的idea教程","description":"","frontmatter":{"createTime":"2024/2/22","tag":"Linux系统,实践"},"headers":[],"relativePath":"笔记/杂项/安装ubuntu版本的idea教程.md","filePath":"笔记/杂项/安装ubuntu版本的idea教程.md","lastUpdated":1716471346000}'),o={name:"笔记/杂项/安装ubuntu版本的idea教程.md"},u=s("h1",{id:"安装ubuntu版本的idea教程",tabindex:"-1"},[c("安装ubuntu版本的idea教程 "),s("a",{class:"header-anchor",href:"#安装ubuntu版本的idea教程","aria-label":'Permalink to "安装ubuntu版本的idea教程"'},"​")],-1),b=r(`<h2 id="_1-下载linux版本的idea" tabindex="-1">1.下载linux版本的idea <a class="header-anchor" href="#_1-下载linux版本的idea" aria-label="Permalink to &quot;1.下载linux版本的idea&quot;">​</a></h2><p>链接地址：<a href="https://www.jetbrains.com/idea/" target="_blank" rel="noreferrer">IntelliJ IDEA: The Capable &amp; Ergonomic Java IDE by JetBrains</a></p><h2 id="_2-解压到自己的路径下" tabindex="-1">2.解压到自己的路径下 <a class="header-anchor" href="#_2-解压到自己的路径下" aria-label="Permalink to &quot;2.解压到自己的路径下&quot;">​</a></h2><p>在<code>/usr/local/ </code>路径下新建安装目录IDEA：</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo mkdir -p /usr/local/IDEA</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>解压下载的压缩包到指定目录，执行下面的命令</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo tar -zxvf ideaIU-2022.2.3.tar.gz -C /usr/local/IDEA</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>或者使用下面的界面直接解压</p><p><img src="https://img-blog.csdnimg.cn/4de20ff09cd4449aae1fcda35a8de897.png" alt=""></p><div class="tip custom-block"><p class="custom-block-title">如果需要移动到其他文件路径</p><p>1.打开终端（快捷键Ctrl+Alt+T）</p><p>2.sudo nautilus</p><p>此时会跳出一个带有权限的文件管理器，接下来就能拖拽文件到本地计算机目录了，解决了权限不够的问题，注意移动结束前不要关闭终端。</p></div><h2 id="_3-运行idea" tabindex="-1">3.运行IDEA <a class="header-anchor" href="#_3-运行idea" aria-label="Permalink to &quot;3.运行IDEA&quot;">​</a></h2><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>cd /usr/local/IDEA/idea-IU-222.4345.14/bin/idea.sh</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo sh ./install.sh 或者</span></span>
<span class="line"><span>su -c &#39;./install.sh&#39;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><p>运行Intellij IDEA软件协议同意，然后点击Continue按钮</p><p><img src="https://img-blog.csdnimg.cn/72b89963691d4b41b2fe1e196d805ba4.png" alt=""></p><p>数据分享，如果不想分享，可以点击Don&#39;t Send</p><p><img src="https://img-blog.csdnimg.cn/7812fb01315a4210b240a6d1e5182212.png" alt=""></p><p>激活后安装成功</p><p><img src="https://img-blog.csdnimg.cn/c8c65c0d5de44243a61bcc1633dd2dfb.png" alt=""></p><h2 id="_4-配置idea快捷方式" tabindex="-1">4.配置IDEA快捷方式 <a class="header-anchor" href="#_4-配置idea快捷方式" aria-label="Permalink to &quot;4.配置IDEA快捷方式&quot;">​</a></h2><p>创建一个文件叫idea.desktop</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>sudo vim /usr/share/applications/idea.desktop</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>启动vim 后i写入下面的内容</p><div class="language- vp-adaptive-theme line-numbers-mode"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>[Desktop Entry]</span></span>
<span class="line"><span>Name=IntelliJ IDEA</span></span>
<span class="line"><span>Comment=IntelliJ IDEA</span></span>
<span class="line"><span>Exec=/usr/local/IDEA/idea-IU-222.4345.14/bin/idea.sh #换成自己的 idea 路径</span></span>
<span class="line"><span>Icon=/usr/local/IDEA/idea-IU-222.4345.14/bin/idea.png #换成自己的 idea 路径</span></span>
<span class="line"><span>Terminal=false</span></span>
<span class="line"><span>Type=Application</span></span>
<span class="line"><span>Categories=Developer;</span></span></code></pre><div class="line-numbers-wrapper" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><p>查看是否生成idea图标</p><p><img src="https://img-blog.csdnimg.cn/f15c59aacf874a73a6854d90987bd860.png" alt=""></p>`,26);function h(m,g,v,_,k,f){const n=e("ArticleMetadata"),i=e("ClientOnly");return l(),t("div",null,[u,a(i,null,{default:d(()=>[a(n)]),_:1}),b])}const A=p(o,[["render",h]]);export{C as __pageData,A as default};
