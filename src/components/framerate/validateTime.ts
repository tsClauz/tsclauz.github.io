export default function(time: string) {
    return new RegExp(/^(?:(?:(\d+?):)?([0-5]?\d):)?([0-5]?\d(\.\d+?)?)$/gmi).test(time)
}