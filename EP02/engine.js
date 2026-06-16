export class Game
{
    constructor(config = {})
    {
        this.width = config.width || 800;
        this.height = config.height || 600;
        this.title = config.title || "My Game";

        document.title = this.title;

        // Canvas
        this.canvas = document.createElement("canvas");
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.body.appendChild(this.canvas);

        this.ctx = this.canvas.getContext("2d");

        // Assets
        this.assets = {};

        // =========================
        // LOAD SYSTEM
        // =========================

        this.load =
        {
            image: (name, path) =>
            {
                const image = new Image();
                image.src = path;

                this.assets[name] =
                {
                    type: "image",
                    image: image
                };
            },

            spritesheet: (name, path, options = {}) =>
            {
                const image = new Image();
                image.src = path;

                this.assets[name] =
                {
                    type: "spritesheet",

                    image: image,

                    frameWidth: options.frameWidth || 32,
                    frameHeight: options.frameHeight || 32,

                    frameCount: options.frameCount || 1,

                    frameDelay: options.frameDelay || 10,

                    currentFrame: 0,
                    frameTimer: 0
                };
            }
        };

        // =========================
        // DRAW SYSTEM
        // =========================

        this.draw =
        {
            image: (name, x, y) =>
            {
                const asset = this.assets[name];

                if (!asset) return;

                this.ctx.drawImage(
                    asset.image,
                    x,
                    y
                );
            },

            spritesheet: (name, x, y) =>
            {
                const asset = this.assets[name];

                if (!asset) return;

                const sx =
                    asset.currentFrame *
                    asset.frameWidth;

                this.ctx.drawImage(
                    asset.image,

                    sx,
                    0,

                    asset.frameWidth,
                    asset.frameHeight,

                    x,
                    y,

                    asset.frameWidth,
                    asset.frameHeight
                );
            }
        };

        // User Functions
        this.update = function () {};
        this.render = function () {};
    }

    // =========================
    // ENGINE ANIMATION SYSTEM
    // =========================

    updateAnimations()
    {
        for (const key in this.assets)
        {
            const asset = this.assets[key];

            if (asset.type !== "spritesheet")
            {
                continue;
            }

            if (asset.frameCount <= 1)
            {
                continue;
            }

            asset.frameTimer++;

            if (asset.frameTimer >= asset.frameDelay)
            {
                asset.currentFrame++;

                if (asset.currentFrame >= asset.frameCount)
                {
                    asset.currentFrame = 0;
                }

                asset.frameTimer = 0;
            }
        }
    }

    clear()
    {
        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );
    }

    start()
    {
        const gameLoop = () =>
        {
            this.clear();

            this.updateAnimations();

            this.update();

            this.render();

            requestAnimationFrame(gameLoop);
        };

        gameLoop();
    }
}