module.exports = {
  siteMetadata: {
    title: `Context Switch`,
    author: `Akshay Ram Vignesh`,
    description: `Personal Blog by Akshay Ram Vignesh`,
    siteUrl: `https://akshayramvignesh.dev`,
    social: {
      twitter: `akshay5995`,
      medium: `akshay5995`,
      linkedin: `akshay-ram-vignesh`,
      github: `akshay5995`,
    },
  },
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-reading-time`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Context Switch`,
        short_name: `Context Switch`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#888b8d`,
        display: `minimal-ui`,
        orientation: `landscape`,
        icon: `content/assets/profile-pic.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
