const COLOR_ELEMENTS = "white";
const OMEGA_OF_CIRCLE = 0.05; //rps
const CENTER_POINT_OF_CIRCLE = (x, y, z) => {
    this.x = x,
    this.y = y,
    this.z = z 
}

let canvas = document.createElement("canvas");
document.body.appendChild(canvas)

let context = canvas.getContext("2d");

// dimensions 
let radius = 200;
canvas.height = radius;
canvas.width = radius;

// colors and lines
context.fillStyle = "#ffffff00"; // two zeros make it transparent
context.strokeStyle = COLOR_ELEMENTS; 
context.lineWidth = radius / 100;
context.lineCap = "round"