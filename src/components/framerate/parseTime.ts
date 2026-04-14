import addZeros from './addZeros'
import toSeconds from './toSeconds'

export default function(time: string) {
    let milliseconds: string|string[]|undefined = time.replaceAll(',', '.').match(/(?<=\.)(\d+)?$/gmi)?.slice()
    if(milliseconds) { time = time.replace(new RegExp(`${milliseconds}$`, 'gmi'), '') }
    if(!milliseconds || !milliseconds.length) milliseconds = ['000']
    milliseconds = addZeros(milliseconds[0], 3 - milliseconds[0].length, 'after')

    const seconds = toSeconds(time)
    return parseFloat(`${seconds}.${milliseconds}`)
}