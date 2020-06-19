function Time(s) {
    let ms = s % 1000;
    s = (s - ms) / 1000;
    let secs = s % 60;
    s = (s - secs) / 60;
    let mins = s % 60;
    let hours = (s - mins) / 60;
   
    return `${hours}:${mins}:${secs}`;
}

module.exports = { name: "timeget", Time }