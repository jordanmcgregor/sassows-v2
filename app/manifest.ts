import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Next.js PWA',
        short_name: 'Sassows',
        description: 'A Progressive Web App built with Next.js',
        start_url: '/home',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            //   {
            //     src: '/app-icon.png',
            //     sizes: '192x192',
            //     type: 'image/png',
            //   },
            //   {
            //     src: '/app-icon.png',
            //     sizes: '512x512',
            //     type: 'image/png',
            //   },
            {
                src: '/app-icon.png',
                sizes: '480x480',
                type: 'image/png',
            },
            {
                src: '/app-icon.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}