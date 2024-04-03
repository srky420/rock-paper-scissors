// Get random number
function getRandomNumInRange(min = 1, max = 10) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Capitalize function
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1,).toLowerCase();
};
