export default function(num: string, zeros: number, where: 'before'|'after') {
    for(let i = 0; i < zeros; ++i) { num = `${where === 'before' ? '0' : ''}${num}${where === 'after' ? '0' : ''}` }
    return num
}