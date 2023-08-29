import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarEn: SidebarConfig = {
  '/guide/': [
    {
      text: 'Chaldea',
      children: [
        '/guide/README.md',
        '/guide/translation.md',
        '/guide/donation.md',
        '/guide/installation.md',
        '/guide/releases.md',
        '/guide/fgo_apk.md',
        '/guide/feedback.md',
        '/guide/faq.md',
      ],
    },
    {
      text: 'Manual',
      children: [
        '/guide/import_data.md',
        {
          text: 'Import HTTPS Response',
          collapsible: true,
          children: [
            '/guide/import_https/README.md',
            '/guide/import_https/auto_login.md',
            '/guide/import_https/stream.md',
            '/guide/import_https/mitmproxy.md',
            '/guide/import_https/charles.md',
            '/guide/import_https/httpcanary.md',
            '/guide/import_https/transfer_data.md',
          ],
        },
        '/guide/servant_plan.md',
        '/guide/events.md',
        '/guide/items.md',
        '/guide/free_calculator.md',
        '/guide/sq_plan.md',
        '/guide/master_mission.md',
        '/guide/summon.md',
        '/guide/game_statistics.md',
        '/guide/buff_filter.md',
        '/guide/search_filter.md',
        '/guide/app_setting.md',
        '/guide/freedom_order.md',
        '/guide/lostroom.md',
      ],
    },
    {
      text: 'Misc',
      children: [
        '/guide/references.md',
        '/guide/privacy2.md',
        '/guide/privacy.md',
      ],
    },
  ],
  '/laplace/': [
    {
      text: 'Laplace',
      children: [
        '/laplace/',
        '/laplace/team.md',
        '/laplace/battle.md',
        '/laplace/np_dmg_ranking.md',
        '/laplace/faq.md',
        '/laplace/bugs.md',
      ],
    },
  ],
}
