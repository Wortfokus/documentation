import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Wortfokus Documentation',
  tagline: 'Spread the word with Wortfokus',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://developer.wortfokus.org',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Wortfokus', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,
  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownImages: 'warn',
    }
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/Wortfokus/documentation/tree/main/',
        },
        blog: {
          showReadingTime: false,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          //Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    //image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Wortfokus',
      logo: {
        alt: 'Wortfokus Logo',
        src: 'img/Wortfokus.png',
      },
      items: [
    {
      type: 'docSidebar',
          sidebarId: 'mainSidebar',
      position: 'left',
      label: 'General',
    },
    {
      type: 'docSidebar',
          sidebarId: 'projectsSidebar', // separate Sidebar nur für Projekte
      position: 'left',
      label: 'Projects',
    },
    {to: '/blog', label: 'Blog', position: 'left'},
    {
      href: 'https://github.com/Wortfokus/documentation/tree/main',
      label: 'GitHub',
      position: 'right',
    },
  ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Introduction',
              to: '/docs/general/main',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Wortfokus - Mainpage',
              href: 'https://wortfokus.org/',
            },
            {
              label: 'Instagram',
              href: 'https://www.instagram.com/wortfokus_org/',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Wortfokus/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wortfokus. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.oceanicNext,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
    }
  } satisfies Preset.ThemeConfig,
};

export default config;
