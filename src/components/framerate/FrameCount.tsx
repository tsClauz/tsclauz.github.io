import React from 'react';
import HHMMSSToSeconds from './HHMMSSToSeconds';

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
        if (isNaN(parseFloat(this.state.framerate))) {
            this.setState({ ...this.state, frameCount: '0' })
            return
        }

        const seconds = HHMMSSToSeconds(this.state.time)

        const frameCountFull = (parseFloat(this.state.framerate.replaceAll(',', '.')) * seconds)

        const frameCount = Math.round(frameCountFull)

        this.state.frameCount = `${frameCount}`

        this.setState(this.state)
        window?.localStorage?.setItem('framerate', this.state.framerate)
        window?.localStorage?.setItem('time', this.state.time)
        window?.localStorage?.setItem('frameCount', this.state.frameCount)
    }
}