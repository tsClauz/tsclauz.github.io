import React from 'react';
import parseTime from './parseTime';
import toBigIntWithDecimal from './toBigIntWithDecimal';
import validateTime from './validateTime';

type Props = { time?: string, framerate?: string }

export default class extends React.Component<Props, { framerate: string, frameCount: string, time: string }> {
    state: { framerate: string, frameCount: string, time: string }
    props: Props

    constructor(props: Props) {
        super(props)

        this.props = props
        this.state = { time: this.props.time ?? '', frameCount: '0', framerate: this.props.framerate ?? '' }
    }

    componentDidMount() {
        this.updateFrameCount()
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
            <label>Frame count<br />{this.state.frameCount.toString()}</label>
        </>
    }

    onChange(type: 'time' | 'framerate', event: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'time') {
            this.state = { ...this.state, time: event.target.value }
        } else {
            this.state = { ...this.state, framerate: event.target.value }
        }
        event.preventDefault()

        this.updateFrameCount()
    }

    updateFrameCount() {
        if (!validateTime(this.state.time) ||
            isNaN(parseFloat(this.state.framerate)) ||
            parseFloat(this.state.framerate) < 1) {
            this.setState({ ...this.state, frameCount: '0' })
            return
        }

        const fullSecs = parseTime(this.state.time)

        const frameCountFull = (parseFloat(this.state.framerate.replaceAll(',', '.')) * fullSecs)
        const frameCount = toBigIntWithDecimal(frameCountFull)
        this.state.frameCount = frameCount.toString()
        this.setState(this.state)
        window?.localStorage?.setItem('framerate', this.state.framerate)
        window?.localStorage?.setItem('time', this.state.time)
        window?.localStorage?.setItem('frameCount', this.state.frameCount)
    }
}