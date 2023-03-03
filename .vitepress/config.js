import { defineConfig } from 'vitepress'
import footnote from 'markdown-it-footnote'

export default defineConfig({
    lang: 'en-US',
    title: 'Limitless Docs',
    description: 'Player and Organizer documentation for the Limitless Online Tournament Platform.',
    markdown: {
        config: md => {
            md.use(footnote)
        }
    },

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
            },
            {
                text: 'Developer',
                link: '/developer',
                activeMatch: '^/developer'
            }
        ],
    
        sidebar: {
          '/player': playerSidebar(),
          '/organizer': organizerSidebar(),
          '/developer': developerSidebar(),
          '/': []
        },
    }
})

function playerSidebar () {
    return [
        { text: 'Introduction', link: '/player' },
        {
            text: 'Quickstart Guide',
            children: [
                { text: 'Account Creation', link: '/player/account' },
                { text: 'Tournament Registration', link: '/player/registration' },
                { text: 'Decklist Submission', link: '/player/decklists' },
                { text: 'During the Tournament', link: '/player/procedures' },
                { text: 'Further Reading', link: '/player/more' }
            ]
        },
        {
            text: 'Additional Features',
            children: [
                { text: 'Tournament History', link: '/player/history' },
                { text: 'Twitch Integration', link: '/player/twitch' }
            ]
        }
    ]
}

function organizerSidebar () {
    return [
        { text: 'Introduction', link: '/organizer' },
        { 
            text: 'Essential Concepts',
            children: [
                { text: 'Organizations', link: '/organizer/organizations' },
                { text: 'Creating a Tournament', link: '/organizer/basics' },
                { text: 'Tournament Structure', link: '/organizer/structure' },
                { text: 'Publishing the Tournament', link: '/organizer/publishing' },
                { text: 'Running the Tournament', link: '/organizer/procedures' }
            ]
        },
        {
            text: 'Advanced',
            children: [
                { text: 'More About Organizations', link: '/organizer/organizations-2' },
                { text: 'Tournament Schedule', link: '/organizer/schedule' },
                { text: 'Participants List', link: '/organizer/players' },
                { text: 'Distributing Prizing', link: '/organizer/prizing' }
            ]
        },
        { text: 'Settings Reference', link: '/organizer/reference' },
        { text: 'Tournament Series', link: '/organizer/series' },
        { text: 'FAQ', link: '/organizer/faq' }
    ]
}

function developerSidebar () {
    return [
        { text: 'Introduction', link: '/developer' },
        { 
            text: 'API Endpoints',
            children: [
                { text: 'Tournaments', link: '/developer/tournaments' },
                { text: 'Games', link: '/developer/games' },
            ]
        },
        { text: 'Webhooks', link: '/developer/webhooks' }
    ]
}