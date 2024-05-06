import { h, watch } from "vue";
import { useData, EnhanceAppContext } from "vitepress";
import DefaultTheme from "vitepress/theme";

import { createMediumZoomProvider } from "./composables/useMediumZoom";

import MNavVisitor from "./components/MNavVisitor.vue";
import MAsideSponsors from "./components/MAsideSponsors.vue";
import MNavLinks from "./components/MNavLinks.vue";
import ArticleMetadata from "./components/ArticleMetadata.vue";
import AlanViteComponent from "@xiaomh/vue3-alan-vite-component";

import "vitepress-markdown-timeline/dist/theme/index.css";

import "@xiaomh/vue3-alan-vite-component/lib/style.css";
import MyLayout from "./components/MyLayout.vue";

//白昼切换布局
import MLayout from './components/MLayout.vue'
import imageViewer from "./components/imageViewer.vue"

import "./styles/index.scss";

if (typeof window !== "undefined") {
  /* 注销 PWA 服务 */
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }

  /* 删除浏览器中的缓存 */
  if ("caches" in window) {
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          return caches.delete(key);
        })
      );
    });
  }
}

let homePageStyle: HTMLStyleElement | undefined;

export default {
  extends: DefaultTheme,
  
  Layout: () => {
    const props: Record<string, any> = {};
    // 获取 frontmatter
    const { frontmatter } = useData();


    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass;
    }

    //DefaultTheme.Layout
    return h(MLayout, props, {
      /**
       * 相关插槽
       * https://vitepress.dev/guide/extending-default-theme#layout-slots
       * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
       */
      // "doc-after": () => h(ValineComment),    //评论区
      "nav-bar-title-after": () => h(MNavVisitor),  //左上角访问次数
      // "doc-after": () => h(MDocFooter),
      // "aside-bottom": () => h(MyLayout),   //返回
      "aside-bottom": () => h(MAsideSponsors), //右下角二维码
      "doc-bottom": () => h(imageViewer),
    });
  },

  

  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router);

    app.component("MNavLinks", MNavLinks);
    app.component("MyLayout", MyLayout);
    // app.component("CustomLayout", CustomLayout);
    app.component("ArticleMetadata", ArticleMetadata); //作者来源
    app.use(AlanViteComponent);
    app.provide("DEV", process.env.NODE_ENV === "development");

    if (typeof window !== "undefined") {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === "/"),
        { immediate: true }
      );
    }
  },
};

if (typeof window !== "undefined") {
  // detect browser, add to class for conditional styling
  const browser = navigator.userAgent.toLowerCase();
  if (browser.includes("chrome")) {
    document.documentElement.classList.add("browser-chrome");
  } else if (browser.includes("firefox")) {
    document.documentElement.classList.add("browser-firefox");
  } else if (browser.includes("safari")) {
    document.documentElement.classList.add("browser-safari");
  }
}

// Speed up the rainbow animation on home page
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return;

    homePageStyle = document.createElement("style");
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`;
    document.body.appendChild(homePageStyle);
  } else {
    if (!homePageStyle) return;

    homePageStyle.remove();
    homePageStyle = undefined;
  }
}

