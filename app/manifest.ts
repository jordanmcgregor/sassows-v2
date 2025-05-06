import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sassows',
        short_name: 'Sassows',
        description: 'A journaling app for parents',
        start_url: '/home',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
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