'use client'

import dynamic from 'next/dynamic'

const App = dynamic(() => import('../../components/framerate.js').then(file => file.App), { ssr: false })

export function ClientOnlyFramerate() {
    return <App />
}