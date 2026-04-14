import React from 'react';
import { Helmet } from 'react-helmet'
import '../css/framerate.css'
import Framecount from './framerate/Framecount';
import Framerate from './framerate/Framerate';
import Time from './framerate/Time';

export class App extends React.Component {
    state: { time: boolean, framerate: boolean, framecount: boolean }

    constructor() {
        super({})
        localStorage.clear()
        this.state = { time: true, framerate: false, framecount: false }
    }

    render() {
        return <>
            <Helmet>
                <title>Frames utilities</title>
            </Helmet>
            <div className="react">
                <div className="header">
                    <button className={this.state.time ? 'active' : ''} 
                    onClick={() => this.onButton('time')}>Time</button>

                    <button className={this.state.framerate ? 'active' : ''} 
                    onClick={() => this.onButton('framerate')}>Framerate</button>

                    <button className={this.state.framecount  ? 'active' : ''}
                    onClick={() => this.onButton('framecount')}>Framecount</button>
                </div> 
                    { this.state.time ? 
                    <Time framecount={localStorage.getItem('framecount') ?? undefined} framerate={localStorage.getItem('framerate') ?? undefined} /> : this.state.framerate ? 

                    <Framerate time={localStorage.getItem('time') ?? undefined} framecount={localStorage.getItem('framecount') ?? undefined} /> : 
                    
                    <Framecount time={localStorage.getItem('time') ?? undefined} framerate={localStorage.getItem('framerate') ?? undefined} /> }
            </div>
        </>
    }

    onButton(type: string) {
        for(let s in this.state) {
            this.state[s as keyof typeof this.state] = s === type
        }
        this.setState(this.state)
    }
}

export default App