import{_ as r,a as s,c as n,a3 as e,L as c,R as a,d as m,b as o,a0 as i}from"./chunks/framework.BgWX7Uir.js";const T=JSON.parse('{"title":"路由交换设计","description":"","frontmatter":{"createTime":"2024/06/10","tag":"路由器","outline":[2,3]},"headers":[],"relativePath":"笔记/大型园区网络实战设计/2.路由交换设计.md","filePath":"笔记/大型园区网络实战设计/2.路由交换设计.md","lastUpdated":1718294060000}'),g={name:"笔记/大型园区网络实战设计/2.路由交换设计.md"},h=a("h1",{id:"路由交换设计",tabindex:"-1"},[m("路由交换设计 "),a("a",{class:"header-anchor",href:"#路由交换设计","aria-label":'Permalink to "路由交换设计"'},"​")],-1),p=o('<h2 id="路由交换总体架构设计" tabindex="-1">路由交换总体架构设计 <a class="header-anchor" href="#路由交换总体架构设计" aria-label="Permalink to &quot;路由交换总体架构设计&quot;">​</a></h2><p>逻辑拓扑图 <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406022239917.png"></p><p>物理拓扑图 <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406022241643.png"></p><ul><li>多模光纤 500M 传输距离</li><li>单模光纤 10KM 传输距离</li></ul><p>目前的趋势走向是，所有功能都给向核心，让他来配置接入和汇聚。因为现在的核心设备功能都非常强大了，交换机只需要傻瓜式就行了。 现在的核心交换机动不动就100T、200T，性能十分强大，仅限国内，国外思科目前最大的2T。 <img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406022245343.png"></p><p>路由器上有很多口，不如说支持很多口，比如POS，CPOS还有网线等，有些运营商可能就扔给你POS口就需要路由器才能接上了，有些就给你网线。</p><h2 id="路由器与交换机的区别" tabindex="-1">路由器与交换机的区别 <a class="header-anchor" href="#路由器与交换机的区别" aria-label="Permalink to &quot;路由器与交换机的区别&quot;">​</a></h2><ul><li>场景：他们运用的场景不同，交换机用于内部路由交换，主要是做NAT。路由器用于网络出口的，主要用于和运营商的一个互联。一个园区可能有两千台交换机，路由器就可能很少就两三台。</li><li>功能上：交换机也能做NAT，在上面插一张防火墙网卡，但是一般网络中都不这样做。路由器以上支持打通VPN隧道，除了支持OSPF还支持BGP，NPS功能上，都很齐全。</li><li>性能上：园区网的路由交换，带宽是很大的，支持千兆、万兆，但网络出口的话，带宽并不大，而且很贵也用不上。国内华为，华三的交换机100T左右，出口路由器大概15T。</li><li>接口上：运营商给你甩的什么种类的接口，交换机不支持，路由器支持的广。</li><li>路由器虽然性能不如交换机，但功能多，所以价格也比交换机贵！</li></ul><h2 id="路由交换二层设计-vlan-mstp-vrrp" tabindex="-1">路由交换二层设计(VLAN_MSTP+VRRP) <a class="header-anchor" href="#路由交换二层设计-vlan-mstp-vrrp" aria-label="Permalink to &quot;路由交换二层设计(VLAN_MSTP+VRRP)&quot;">​</a></h2><ul><li>VRRP 网关备份协议</li><li>MSTP 负载均衡</li></ul><blockquote><p>目前不怎么流行了，但需要认识。</p></blockquote><p>通过VRRP技术做出一个虚拟的网关出来，使WLAN50指向一个虚拟网关地址，然后通过MSTP来选择这个主根和备根交换机，如果一个交换机挂掉，就会通过VRP自动切换（网关备份）。本质就是指向的网关地址不是真实的地址，是虚拟的，挂掉之后就会跳到另一个地址。</p><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406112235377.png"><ul><li>WLAN50默认走 AGG_SW2 交换机，当它挂掉后走 AGG_SW1 这个交换机，相当于做了一个负载均衡。</li></ul><h2 id="路由交换设计三层设计" tabindex="-1">路由交换设计三层设计 <a class="header-anchor" href="#路由交换设计三层设计" aria-label="Permalink to &quot;路由交换设计三层设计&quot;">​</a></h2><h3 id="ip地址规划" tabindex="-1">IP地址规划 <a class="header-anchor" href="#ip地址规划" aria-label="Permalink to &quot;IP地址规划&quot;">​</a></h3><ul><li>三层交换机处于网络层，它的接口是可以配置IP地址的，</li><li>二层交换机处于链路层，不能配置IP地址，但可以配置VLAN，SVI接口IP</li><li>互联IP，就是二层与三层交换机直接的MAC接口连接，设置单独的IP地址，比如192.168.x.x，或者172.20.x.x。</li><li>业务IP，10.x.x.x 私网地址，因为业务一般用量大，A类地址IP地址多。</li><li>这种设置的优势在于，网络是否有问题，直接PING 192.168.x.x 的地址，就可以迅速的找到问题了。</li></ul><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406112348681.png"><p>对大公司而言，静态IP很好，容易排除错误。</p><h3 id="路由规划-园区路由-出口路由" tabindex="-1">路由规划（园区路由，出口路由） <a class="header-anchor" href="#路由规划-园区路由-出口路由" aria-label="Permalink to &quot;路由规划（园区路由，出口路由）&quot;">​</a></h3><ul><li>OSPF 三层</li><li>出口路由器</li></ul><h2 id="路由交换设计-综合实验" tabindex="-1">路由交换设计-综合实验 <a class="header-anchor" href="#路由交换设计-综合实验" aria-label="Permalink to &quot;路由交换设计-综合实验&quot;">​</a></h2><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122231481.png"><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122233124.png"><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122235871.png"><ul><li>逻辑拓扑图</li><li>HSRP 是思科私有的协议，和VRRP非常相似。</li></ul><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122257335.png"><blockquote><p>如果你用的不是固定IP，而是拨号上网，如果内部有服务器的话，映射出去可能就需要花生壳，或者动态DNS来解决。如果内部有固定IP的服务器，那就需要申请固定IP地址。</p></blockquote><ul><li>如果出口路由上层是防火墙，可以用私网地址，也可以用公网地址。</li><li>终端最好是A类地址，IP足够多。</li></ul><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122303956.png"><ul><li>出口NAT可以在防火墙上做，也可以在路由器上做</li><li>在防火墙上做，就可以将内网的私有地址通过端口映射到防火墙的端口上，远程的用户只需要登录这个出口的端口，就可以直接跳到内网上。</li></ul><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122313237.png"><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122318501.png"><ul><li><p>将内网的交换机SW1与防火墙的端口映射，端口号为1025（1025后面一般不常用）。访问这个端口地址，就可以跳到内网SW1的交换机地址这。</p></li><li><p>同理L2层交换机进行映射 212.61.1.1:1026 端口</p></li><li><p>同理L3层交换机...</p></li><li><p>内网的FTP服务器也需要映射出去，把WEB、DNS等等</p></li></ul><img src="https://gitee.com/zhangjunjiee/article-images/raw/master/images/202406122323049.png"><ul><li>敲命令不是最重要的，重要的是思路，知道它的原理。华三、锐捷和华为的命令都有差异的。</li></ul>',36);function u(P,d,_,j,S,x){const t=i("ArticleMetadata"),l=i("ClientOnly");return s(),n("div",null,[h,e(l,null,{default:c(()=>[e(t)]),_:1}),p])}const N=r(g,[["render",u]]);export{T as __pageData,N as default};
