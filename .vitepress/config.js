import { defineConfig } from 'vitepress'

export default defineConfig({
    lang: 'en-US',
    title: 'Limitless Docs',
    description: 'Player and Organizer documentation for the Limitless Online Tournament Platform.',

    themeConfig: {
        logo: '/limitless.png',
        lastUpdated: 'Last Updated',

        nav: [
            {
                text: 'Back to site',
                link: 'https://play.limitlesstcg.com/tournaments'
            },
            {
                text: 'Player',
                link: '/player',
                activeMatch: '^/player'
            },
            {
                text: 'Organizer',
                link: '/organizer',
                activeMatch: '^/organizer'
            }
        ],
    
        sidebar: {
          '/player': playerSidebar(),
          '/organizer': organizerSidebar(),
          '/': playerSidebar()
        },
    }
    

})

function playerSidebar () {
    return [
        { 
            text: 'Quickstart Guide',
            children: [
                { text: 'Account creation', link: '/player/account' },
                { text: 'Tournament registration', link: '/player/registration' },
                { text: 'Decklist submission', link: '/player/decklists' },
                { text: 'During the tournament', link: '/player/procedures' },
                { text: 'Further reading', link: '/player/more' }
            ]
        },
        { 
            text: 'Additional features',
            children: [
                { text: 'Tournament history', link: '/player/history' },
                { text: 'Twitch integration', link: '/player/twitch' }
            ]
        }
    ]
}

function organizerSidebar () {
    return []
}