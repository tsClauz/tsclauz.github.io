export default (num: number, fix?: number) => {
    let decimal: string|number = (num - Math.floor(num))
    if(typeof fix == 'number') { decimal = decimal.toFixed(3) }
    decimal = decimal.toString().slice(2)
    const int = BigInt(Math.trunc(num))
    return `${int}${decimal !== '' ? `.${decimal}` : ''}`
}