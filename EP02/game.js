import { Game } from "./engine.js";

const game = new Game({
    width: 800,
    height: 600,
    title: "Bring Your Hero To Life"
});
game.load.image(
    "hero",
    "assets/sprites/hero.png"
);

game.load.spritesheet(
    "heroWalk",
    "assets/sprites/hero_walk.png",
    {
        frameWidth: 149,
        frameHeight: 224,

        frameCount: 10,

        frameDelay: 7.5
    }
);

game.render = function ()
{
    game.draw.image(
        "hero",
        50,
        100
    );
    game.draw.spritesheet(
        "heroWalk",
        200,
        100
    );
};

game.start();