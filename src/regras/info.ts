function getHours() {
    let date = new Date()
    let day = date.getDay()
    let hours = date.getHours()
    let min = date.getMinutes()

    let open = (hours*60) + min;
    let close = (hours*60) + min;

    let timerOpen = 18 * 60;          // 18h00 -> 1080m + 0m
    let timerClose = (23 * 60) + 59;  // 22h30 -> 1320m + 30m 

    if( (open >= timerOpen && close <= timerClose) && [0,2,3,4,5,6].includes(day) ) {
        return true
    } else {
        return false
    }
}

export { getHours,  }
