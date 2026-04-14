import React from 'react';
import parseTime from './parseTime';
import toBigIntWithDecimal from './toBigIntWithDecimal';
import validateTime from './validateTime';

type Props = { time?: string, framecount?: string }

export default class extends React.Component<Props> {
    state: { framerate: string, framecount: string, time: string }
    props: Props
    
    constructor(props: Props) {
        super(props)
        this.props = props
        this.state = { time: this.props.time ?? '', framecount: this.props.framecount ?? '', framerate: '0.000' }
        this.updateFramerate()
    }

    render() {
        return <>
            <label>Time<br />

            <input className="input time" 
            onChange={(event) => this.onChange('time', event)} 
            placeholder="HH:MM:SS.MMM" value={this.state.time.toString()} min="0" />

            </label>
            <label>Framecount<br />

            <input type="number" className="input framecount" 
            onChange={(event) => this.onChange('framecount', event)} 
            placeholder="17868" value={this.state.framecount.toString()} min="0" />

            </label>
            <label>Framerate<br />{this.state.framerate.toString()}</label>
        </>
    }

    onChange(type: 'time'|'framecount', event: React.ChangeEvent<HTMLInputElement>) {
        if(type === 'time') {
            this.state = { ...this.state, time: event.target.value }
        } else { 
            this.state = { ...this.state, framecount: event.target.value }
        }
        event.preventDefault()

        this.updateFramerate()
    }

    updateFramerate() {
        if(!validateTime(this.state.time) || 
        isNaN(parseFloat(this.state.framecount)) ||
        parseFloat(this.state.framecount) < 1) {
            return this.setState({ ...this.state, framerate: '0.000' })
        }

        const fullSecs = parseTime(this.state.time)
        if(fullSecs === 0) {
            return this.setState({ ...this.state, framerate: '0.000' })
        }

        const framerateFull = parseFloat(this.state.framecount.replaceAll(',', '.')) / fullSecs
        const framerate = toBigIntWithDecimal(framerateFull)
        this.state.framerate = framerate
        this.setState(this.state)
        localStorage.setItem('framerate', this.state.framerate)
        localStorage.setItem('time', this.state.time)
        localStorage.setItem('framecount', this.state.framecount)
    }
}