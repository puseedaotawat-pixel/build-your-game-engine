import { Game } from "./engine.js";

const game =
    new Game({
        width: 800,
        height: 600,
        title: "My First Game"
    });

    game.start();