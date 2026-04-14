import React from 'react';
import parseTime from './parseTime';
import toBigIntWithDecimal from './toBigIntWithDecimal';
import validateTime from './validateTime';

type Props = { time?: string, framerate?: string }

export default class extends React.Component<Props> {
    state: { framerate: string, framecount: string, time: string }
    props: Props
    
    constructor(props: Props) {
        super(props)
        this.props = props
        this.state = { time: this.props.time ?? '', framecount: '0', framerate: this.props.framerate ?? '' }
        this.updateFramecount()
    }

    render() {
        return <>
            <label>Time<br />

            <input className="input time" 
            onChange={(event) => this.onChange('time', event)} 
            placeholder="HH:MM:SS.MMM" value={this.state.time.toString()} />

            </label>
            <label>Framerate<br />

            <input type="number" className="input framerate" 
            onChange={(event) => this.onChange('framerate', event)} 
            placeholder="60" value={this.state.framerate.toString()} min="0" />

            </label>
            <label>Framecount<br />{this.state.framecount.toString()}</label>
        </>
    }

    onChange(type: 'time'|'framerate', event: React.ChangeEvent<HTMLInputElement>) {
        if(type === 'time') {
            this.state = { ...this.state, time: event.target.value }
        } else { 
            this.state = { ...this.state, framerate: event.target.value }
        }
        event.preventDefault()

        this.updateFramecount()
    }

    updateFramecount() {
        if(!validateTime(this.state.time) || 
        isNaN(parseFloat(this.state.framerate)) ||
        parseFloat(this.state.framerate) < 1) {
            this.setState({ ...this.state, framecount: '0' })
            return
        }

        const fullSecs = parseTime(this.state.time)

        const framecountFull = (parseFloat(this.state.framerate.replaceAll(',', '.')) * fullSecs)
        const framecount = toBigIntWithDecimal(framecountFull)
        this.state.framecount = framecount.toString()
        this.setState(this.state)
        localStorage.setItem('framerate', this.state.framerate)
        localStorage.setItem('time', this.state.time)
        localStorage.setItem('framecount', this.state.framecount)
    }
}