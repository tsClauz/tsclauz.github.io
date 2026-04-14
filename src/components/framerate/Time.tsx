import React from 'react'
import toBigIntWithDecimal from './toBigIntWithDecimal'
import toHHMMSS from './toHHMMSS'

export default class extends React.Component {
    state: { framerate: string, framecount: string, time: string }
    props: { framerate?: string, framecount?: string }
    
    constructor(props: { framerate?: string, framecount?: string }) {
        super(props)
        this.props = props
        this.state = { framerate: this.props.framerate ?? '', framecount: this.props.framecount ?? '', time: '00:00:00.000' }
        this.updateTime()
    }

    render() {
        return <>
                <label>Framerate<br />

                <input type="number" className="input framerate" 
                onChange={(event) => this.onChange('framerate', event)} 
                placeholder="60" value={this.state.framerate.toString()} min="0" />

                </label>
                <label>Framecount<br />

                <input type="number" className="input framecount" 
                onChange={(event) => this.onChange('framecount', event)} 
                placeholder="17868" value={this.state.framecount.toString()} min="0" />

                </label>
                <label>Time<br />{this.state.time}</label>
            </>
    }

    onChange(type: 'framerate'|'framecount', event: React.ChangeEvent<HTMLInputElement>) {
        if(type === 'framerate') {
            this.state = { ...this.state, framerate: event.target.value }
        } else { 
            this.state = { ...this.state, framecount: event.target.value }
        }
        event.preventDefault()

        this.updateTime()
    }

    updateTime() {
        if(!this.state.framecount || !this.state.framerate || 
            isNaN(parseFloat(this.state.framecount)) || isNaN(parseFloat(this.state.framerate)) ||
            parseFloat(this.state.framecount) < 1 || parseFloat(this.state.framerate) < 1
            ) { 
            this.setState({ ...this.state, time: '00:00:00.000' })
            return 
        }
        const seconds = (parseFloat(this.state.framecount.replaceAll(',', '.')) / parseFloat(this.state.framerate.replaceAll(',', '.')))
        const milliseconds = (seconds - Math.floor(seconds)).toString().slice(2)
        const time = `${toHHMMSS(toBigIntWithDecimal(seconds))}${milliseconds !== '' ? `.${milliseconds}` : ''}`
        this.state.time = time
        this.setState(this.state)
        localStorage.setItem('framerate', this.state.framerate)
        localStorage.setItem('time', this.state.time)
        localStorage.setItem('framecount', this.state.framecount)
    }
}
