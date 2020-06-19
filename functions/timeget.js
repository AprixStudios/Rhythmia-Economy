function Time(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    s = (s - mins) / 60
    let hours = s % 24;
    let days = (s - hours) / 24;
   
    let displayTime;
    if (secs >= 10) displayTime = secs;
    else if (secs <= 9) displayTime = `0${secs}`;

    if (mins >= 10) displayTime = `${mins}:${displayTime}`;
    else if (mins <= 9) displayTime = `0${mins}:${displayTime}`;

    if (hours >= 10) displayTime = `${hours}:${displayTime}`;
    else if (hours <= 9) displayTime = `0${hours}:${displayTime}`;

    if (days > 0) displayTime = `${days}:${displayTime}`;

    return displayTime;

    //return `${hours}:${mins}:${secs}`;
}

module.exports = { name: "timeget", Time }