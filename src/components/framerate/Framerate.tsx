import React from 'react';
import parseTime from './parseTime';
import toBigIntWithDecimal from './toBigIntWithDecimal';
import validateTime from './validateTime';

type Props = { time?: string, frameCount?: string }

export default class extends React.Component<Props, { framerate: string, frameCount: string, time: string }> {
    state: { framerate: string, frameCount: string, time: string }
    props: Props

    constructor(props: Props) {
        super(props)

        this.props = props
        this.state = { time: this.props.time ?? '', frameCount: this.props.frameCount ?? '', framerate: '0.000' }
    }

    componentDidMount() {
        this.updateFramerate()
    }

    render() {
        return <>
            <label>Time<br />

                <input className="input time"
                    onChange={(event) => this.onChange('time', event)}
                    placeholder="HH:MM:SS.MMM" value={this.state.time.toString()} min="0" />

            </label>
            <label>Frame count<br />

                <input type="number" className="input frameCount"
                    onChange={(event) => this.onChange('frameCount', event)}
                    placeholder="17868" value={this.state.frameCount.toString()} min="0" />

            </label>
            <label>Framerate<br />{this.state.framerate.toString()}</label>
        </>
    }

    onChange(type: 'time' | 'frameCount', event: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'time') {
            this.state = { ...this.state, time: event.target.value }
        } else {
            this.state = { ...this.state, frameCount: event.target.value }
        }
        event.preventDefault()

        this.updateFramerate()
    }

    updateFramerate() {
        if (!validateTime(this.state.time) ||
            isNaN(parseFloat(this.state.frameCount)) ||
            parseFloat(this.state.frameCount) < 1) {
            return this.setState({ ...this.state, framerate: '0.000' })
        }

        const fullSecs = parseTime(this.state.time)
        if (fullSecs === 0) {
            return this.setState({ ...this.state, framerate: '0.000' })
        }

        const framerateFull = parseFloat(this.state.frameCount.replaceAll(',', '.')) / fullSecs
        const framerate = toBigIntWithDecimal(framerateFull)
        this.state.framerate = framerate
        this.setState(this.state)
        window?.localStorage?.setItem('framerate', this.state.framerate)
        window?.localStorage?.setItem('time', this.state.time)
        window?.localStorage?.setItem('frameCount', this.state.frameCount)
    }
}