const { resolve } = require('path')

module.exports = {
  head: {
    title: 'Firebase - Nuxt Auth Module',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Firebase - Nuxt Auth Module - With Firebase Auth'
      }
    ],
  },
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  build: {
    extractCSS: true
  },
  // mode: 'spa',
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@@'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://localhost:3000'
  },
  auth: {
    strategies: {
      local: false,
      firebase: {
        _scheme: '~/services/firebase-auth.js',
        apiKey: 'AIzaSyApB_tw8EabiOtZ193fu4VazZbM00jlPBA' ,
        projectId: 'fire-tests'
      }
    }
  }
}
// /Users/droyer/Playground-2017/auth-module/examples/demo/services/firebase-auth.js
