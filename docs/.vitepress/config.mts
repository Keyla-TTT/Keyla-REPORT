import { defineConfig } from 'vitepress'
import { withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Keyla-TTT",
  description: "Report for the Keyla Typing Test Tool",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Report', link: '/Report/Introduction' }
    ],

    sidebar: {
      '/Report/': [
        {
          text: 'Report Overview',
          items: [
            { text: 'Introduction', link: '/Report/Introduction' },
            { text: 'Design', link: '/Report/Design' },
            { text: 'Implementation', link: '/Report/Implementation' },
            { text: 'Technologies', link: '/Report/Technologies' },
            { text: 'DevOps', link: '/Report/DevOps' },
            { text: 'Conclusion', link: '/Report/Conclusion' },
            { text: 'Trans', link: '/Report/Trans' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Keyla-TTT' }
    ],

    footer: {
      message: 'Keyla-TTT Project Report for SPE Exam',
      copyright: 'Copyright © 2025'
    }
  }
}))
