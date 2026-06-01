import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Homepage of Rafael Leon Greenblatt",
  description: "Academic homepage",
  base: process.env.VITEPRESS_BASE ?? '/~greenblatt/',
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Didattica', link: '/didattica' }
    ],

    sidebar: [
      {
        text: 'Sections',
        items: [
          { text: 'Didattica/Teaching', link: '/didattica' },
          { text: 'Research', link: '/research' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  
  vite: {
    // For multiple deployments, linking to pages on the site that are generated outside of this repo
    define: {
      __BASE_URL__: JSON.stringify(
        process.env.VITEPRESS_BASE
          ? `https://rafaelgreenblatt.github.io/`
          : 'https://www.mat.uniroma2.it/~greenblatt/'
      )
    }
  }
})
