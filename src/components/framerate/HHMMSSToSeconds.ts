// Matches time formats of type: HH:MM:SS.mmm, MM:SS.mmm, SS.mmm, and their variations without milliseconds
// also validates that minutes and seconds are between 0 and 59.
/*
    ^(\d*)(?<=\d+):([0-5]?[0-9]|)(?<=[0-5]?[0-9]):([0-5]?[0-9])(\.(?=)(\d+))?$ matches HH:MM:SS.mmm
    |
    ^([0-5]?[0-9]|)(?<=[0-5]?[0-9]):([0-5]?[0-9])(\.(?=)(\d+))?$ matches MM:SS.mmm
    |
    ^([0-5]?[0-9])(\.(?=)(\d+))?$/gmi matches SS.mmm
*/
/* 
    The capture groups are as follows:
    1. Hours (optional)
    2. Minutes (optional, but if present, must be followed by a colon)
    3. Seconds (optional, but if present, must be followed by a colon or end of string)
    4. Milliseconds (optional, of type .mmm)
    5. Milliseconds digits (optional, of type mmm)
    6. Minutes (if hours are not present)
    7. Seconds (if hours are not present, optional, but if present, must be followed by a colon or end of string)
    8. Milliseconds (alternative, if hours are not present, optional, of type .mmm)
    9. Milliseconds digits (alternative, if hours are not present, optional, of type mmm)
    10. Seconds (if only seconds are provided without minutes or hours)
    11. Milliseconds (alternative, if only seconds are provided without minutes or hours, optional, of type .mmm)
    12. Milliseconds digits (alternative, if only seconds are provided without minutes or hours, optional, of type mmm)
*/
const timeRegex = /^(\d*)(?<=\d+):([0-5]?[0-9]|)(?<=[0-5]?[0-9]):([0-5]?[0-9])(\.(?=)(\d+))?$|^([0-5]?[0-9]|)(?<=[0-5]?[0-9]):([0-5]?[0-9])(\.(?=)(\d+))?$|^([0-5]?[0-9])(\.(?=)(\d+))?$/gmi

export default function(time: string) {
    const standardTime = time.replaceAll(',', '.')

    const hours = standardTime.replace(timeRegex, '$1')
    const minutes = standardTime.replace(timeRegex, '$2$6')
    const seconds = standardTime.replace(timeRegex, '$3$7$10')
    const milliseconds = standardTime.replace(timeRegex, '$5$9$12')

    const finalSeconds = 60*60*(hours === standardTime ? 0 : parseInt(hours)) 
    + 60*(minutes === standardTime ? 0 : parseInt(minutes)) 
    + (seconds === standardTime ? 0 : parseInt(seconds))
    
    const finalMilliseconds = milliseconds === standardTime ? '0' : milliseconds.padEnd(3, '0')

    return parseFloat(`${finalSeconds}.${finalMilliseconds}`)
}