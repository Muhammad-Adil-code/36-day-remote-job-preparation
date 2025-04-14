function calculateTime(n) {
    const startTime = Date.now();
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    const endTime = Date.now();
    return (endTime - startTime) / 1000; // Convert milliseconds to seconds
}

module.exports = calculateTime;
