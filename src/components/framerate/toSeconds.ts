export default function(str: string) {
    const parts = str.split(':')
    let seconds = BigInt(0), minutes = BigInt(1);

    while (parts.length > 0) {
        seconds += minutes * BigInt(parseInt(parts.pop()!))
        minutes *= BigInt(60);
    }

    return seconds;
}