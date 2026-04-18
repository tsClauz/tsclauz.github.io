'use client'

import {
    Routes,
    Route,
    HashRouter,
} from "react-router-dom";

import Index from './components/index';
import Framerate from './components/framerate';

export const App = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/framerate" element={<Framerate />} />
                <Route path="/*" element={<Index />} />
            </Routes>
        </HashRouter>
    )
}

export default App