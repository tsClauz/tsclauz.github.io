export default (secs: string) => {
    const seconds = BigInt(secs.slice(0, secs.indexOf('.')))

    const hours = seconds / BigInt(3600)
    const minutes = (seconds - (hours * BigInt(3600))) / BigInt(60)
    const finalSeconds = seconds - (hours * BigInt(3600)) - (minutes * BigInt(60))

    const sHours = hours < BigInt(10) ? `0${hours}` : `${hours}`
    const sMinutes = minutes < BigInt(10) ? `0${minutes}` : `${minutes}`
    const sSeconds = finalSeconds < BigInt(10) ? `0${finalSeconds}` : `${finalSeconds}`

    return `${sHours}:${sMinutes}:${sSeconds}`
}
