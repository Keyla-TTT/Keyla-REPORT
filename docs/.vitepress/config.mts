import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "KEYLA-TTT",
  description: "This Site is the report for the KEYLA-TTT project, made for the SPE's exam.",
  base: '/Keyla-REPORT/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Report', link: '/Report/' }
    ],

    sidebar: {
      '/Report/': [
        {
          text: 'Report',
          items: [
            { text: 'Introduction', link: '/Report/Introduction' },
            { text: 'Requirements', link: '/Report/Requirements' },
            { text: 'Design', link: '/Report/Design' },
            { text: 'Implementation', link: '/Report/Implementation' },
            { text: 'Deployment', link: '/Report/Deployment' },
            { text: 'DevOps', link: '/Report/DevOps' },
            { text: 'Technologies', link: '/Report/Technologies' },
            { text: 'Conclusion', link: '/Report/Conclusion' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
