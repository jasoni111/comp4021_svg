// function Point(x, y) {
//     this.x = (x) ? parseFloat(x) : 0.0;
//     this.y = (y) ? parseFloat(y) : 0.0;
// }
class Point {
    constructor(x, y) {
        this.x = (x) ? parseFloat(x) : 0.0;
        this.y = (y) ? parseFloat(y) : 0.0;
    }
}
console.log( new Point(0, 0) instanceof Point);