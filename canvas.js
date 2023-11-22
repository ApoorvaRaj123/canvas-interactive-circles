// //Giving height/width to our canvas

var canvas = document.querySelector("canvas")

canvas.height = window.innerHeight
canvas.width = window.innerWidth

var c = canvas.getContext("2d")


//    Started from Here

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40

var colorArray = [
    "#e2e2e2",
    "black",
    // "cornflowerblue",
    "#888",
    // "afa0a0",
    // "#d4c79d",
]

window.addEventListener("mousemove", function (dets) {
    mouse.x = dets.x
    mouse.y = dets.y
})

window.addEventListener("resize", function () {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    init()
})


function Circle(x, y, dx, dy, radius) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.radius = radius
    this.minRadius = radius
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)]


    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = this.color
        // c.fill()
        c.strokeStyle = this.color
        c.stroke()
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy

        //Interacting with Circles
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1
        }

        this.draw()
    }
}

var circleArray = []

function init() {
    circleArray = []                    //   clearing array to get new CIRCLES in it when resize of browser happens
    for (var i = 0; i < 900; i++) {
        var radius = Math.random() * 20 + 1
        var x = Math.random() * (innerWidth - radius * 2) + radius
        var y = Math.random() * (innerHeight - radius * 2) + radius
        var dx = (Math.random() - 0.5) * 3
        var dy = (Math.random() - 0.5) * 2

        circleArray.push(new Circle(x, y, dx, dy, radius))
    }

}




function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, innerWidth, innerHeight)

    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update()
    }
}

init()  // Calling init atleast once so as to start the Circles
animate()












