import { Component } from 'react';
import '../css/framerate.css'
import FrameCount from './framerate/FrameCount';
import Framerate from './framerate/Framerate';
import Time from './framerate/Time';

export class App extends Component<{}, { time: boolean, framerate: boolean, frameCount: boolean }> {
    state: { time: boolean, framerate: boolean, frameCount: boolean }

    constructor(props: {}) {
        super(props)
        window?.localStorage?.clear()
        this.state = { time: true, framerate: false, frameCount: false }
    }

    render() {
        return <>
            <div className="react">
                <div className="header">
                    <button className={this.state.time ? 'active' : ''}
                        onClick={() => this.onButton('time')}>Time</button>

                    <button className={this.state.framerate ? 'active' : ''}
                        onClick={() => this.onButton('framerate')}>Framerate</button>

                    <button className={this.state.frameCount ? 'active' : ''}
                        onClick={() => this.onButton('frameCount')}>Frame count</button>
                </div>
                {this.state.time ?
                    <Time frameCount={window?.localStorage.getItem('frameCount') ?? undefined} framerate={window?.localStorage?.getItem('framerate') ?? undefined} /> : this.state.framerate ?

                        <Framerate time={window?.localStorage.getItem('time') ?? undefined} frameCount={window?.localStorage?.getItem('frameCount') ?? undefined} /> :

                        <FrameCount time={window?.localStorage.getItem('time') ?? undefined} framerate={window?.localStorage?.getItem('framerate') ?? undefined} />}
            </div>
        </>
    }

    onButton(type: string) {
        for (let s in this.state) {
            this.state[s as keyof typeof this.state] = s === type
        }
        this.setState(this.state)
    }
}

export default App