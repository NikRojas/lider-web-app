require('dotenv').config()
const webpack = require('webpack')
export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Líder Grupo Constructor',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#ffffff' },
      { name: 'msapplication-TileImage', content: '/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#ffffff' },
      { property: 'fb:app_id', content: '483145982276069' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/manifest.json' },
    ],
    script: [
      {
        src: "/js/wow.min.js",
      },
      { src: '/js/facebook-sdk.js', defer: true, async: true },
    ],
  },
  /*server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost
  },*/
  loading: {
    color: '#0B6FA6',
    //duration: 3000,
    continuous: true,
    throttle: 0,
    height: '4px'
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/scss/main.scss',
    '@/assets/css/animate.css',
    '@/assets/css/flaticon.css',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    { src: '~/plugins/lazysizes.js', mode: 'client' },
    { src: '~/plugins/vue-owl-carousel2.js', mode: 'client' },
    { src: '~/plugins/vue-loading-skeleton.js', mode: 'client' },
    //{ src: '~/statis/js/wow.min.js', mode: 'client' },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    display: 'swap',
    families: {
      Roboto: [300,400, 500,700],
    },
    /* module options */
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    //'nuxt-i18n',
    ['nuxt-i18n', {
      seo: false
    }],
    ['vue-scrollto/nuxt', { duration: 300 }],
    'vue-social-sharing/nuxt',
    '@nuxtjs/gtm',
  ],
  gtm: {
    id: 'GTM-XXXXXX',
    //debug: true,
    //enabled: true
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true,  // recommended
    },
    locales: [
      {
        name: 'EN',
        code: 'en',
        file: 'en.js',
        iso: 'en_US'
      },
      {
        name: 'ES',
        code: 'es',
        file: 'es.js',
        iso: 'es_PE'
      }
    ],
    lazy: true,
    langDir: 'lang/',
    //vueI18nLoader: true,
    /*vueI18n: {
      fallbackLocale: 'en',
    }*/
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    proxy: true
  },
  proxy: {
    '/api/': {
      target: 'https://admin.lider.com.pe/api/',
      //target: 'http://127.0.0.1:8000/api/',
      pathRewrite: { '^/api/': '' },
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    extend(config, { isClient, loaders: { vue } }) {
      // Extend only webpack config for client-bundle
      if (isClient) {
        vue.transformAssetUrls.video = ['src', 'poster']
      }
    },
    extend(config, { isDev, isClient, loaders: { vue } }) {
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery'
      })
    ]
  }
}
