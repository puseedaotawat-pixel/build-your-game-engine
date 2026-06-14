export class Game
{
    constructor(config = {})
    {
        const {
            width = 800,
            height = 600,
            title = "My Game"
        } = config;

        document.title = title;

        this.canvas = document.createElement("canvas");

        this.canvas.width = width;
        this.canvas.height = height;

        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        this.canvas.style.background ="#222";  
        
        this.x=0;
    }

    start()
    {
        this.gameLoop();
    }

    gameLoop()
    {
        this.update();
        this.draw();

        requestAnimationFrame(
            () => this.gameLoop()
        );
    }

    update()
    {
        this.x += 2;

        if(this.x > this.canvas.width)
        {
            this.x = -100;
        }
    }
    draw()
    {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        this.ctx.fillStyle = "red";

        this.ctx.fillRect(
            this.x,
            250,
            100,
            100
        );
    }

}
