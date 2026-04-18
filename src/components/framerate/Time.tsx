import React from 'react'
import toBigIntWithDecimal from './toBigIntWithDecimal'
import toHHMMSS from './toHHMMSS'

export default class extends React.Component<{ framerate?: string, frameCount?: string }> {
    state: { framerate: string, frameCount: string, time: string }

    constructor(props: { framerate?: string, frameCount?: string }) {
        super(props)

        this.state = { framerate: props.framerate ?? '', frameCount: props.frameCount ?? '', time: '00:00:00.000' }
    }

    componentDidMount() {
        this.updateTime()
    }

    render() {
        return <>
            <label>Framerate<br />

                <input type="number" className="input framerate"
                    onChange={(event) => this.onChange('framerate', event)}
                    placeholder="60" value={this.state.framerate.toString()} min="0" />

            </label>
            <label>Frame count<br />

                <input type="number" className="input frameCount"
                    onChange={(event) => this.onChange('frameCount', event)}
                    placeholder="17868" value={this.state.frameCount.toString()} min="0" />

            </label>
            <label>Time<br />{this.state.time}</label>
        </>
    }

    onChange(type: 'framerate' | 'frameCount', event: React.ChangeEvent<HTMLInputElement>) {
        if (type === 'framerate') {
            this.state = { ...this.state, framerate: event.target.value }
        } else {
            this.state = { ...this.state, frameCount: event.target.value }
        }
        event.preventDefault()

        this.updateTime()
    }

    updateTime() {
        if (!this.state.frameCount || !this.state.framerate ||
            isNaN(parseFloat(this.state.frameCount)) || isNaN(parseFloat(this.state.framerate)) ||
            parseFloat(this.state.frameCount) < 1 || parseFloat(this.state.framerate) < 1
        ) {
            this.setState({ ...this.state, time: '00:00:00.000' })
            return
        }
        const seconds = (parseFloat(this.state.frameCount.replaceAll(',', '.')) / parseFloat(this.state.framerate.replaceAll(',', '.')))
        const milliseconds = (seconds - Math.floor(seconds)).toString().slice(2, 5)
        const time = `${toHHMMSS(toBigIntWithDecimal(seconds))}${milliseconds !== '' ? `.${milliseconds}` : ''}`
        this.state.time = time
        this.setState(this.state)
        window?.localStorage?.setItem('framerate', this.state.framerate)
        window?.localStorage?.setItem('time', this.state.time)
        window?.localStorage?.setItem('frameCount', this.state.frameCount)
    }
}
