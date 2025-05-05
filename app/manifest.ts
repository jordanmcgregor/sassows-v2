import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Next.js PWA',
        short_name: 'Sassows',
        description: 'A Progressive Web App built with Next.js',
        start_url: '/home',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                "src": "/splashscreens/manifest-icon-192.maskable.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/splashscreens/manifest-icon-192.maskable.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "maskable"
            },
            {
                "src": "/splashscreens/manifest-icon-512.maskable.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/splashscreens/manifest-icon-512.maskable.png",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
            }
        ],
    }
}