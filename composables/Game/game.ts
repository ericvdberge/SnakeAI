import { IGame, IPlayGround, ISnake } from "../contracts";

/**
 * Game variables
*/
let playGround: IPlayGround | null
const game: IGame = {
    gridSize: 400,
    framesPerSecond: 10,
    isGameOver: false,
}

/** 
 * Represents the game engine
 * @constructor
 * @param {HtmlElement} canvas - the canvas where the game will be played
 */
export const useGame = (canvas: HTMLCanvasElement) => {
    setup(canvas)
    return {
        play,
        reset,
        isGameOver,
    }
}

/**
 * Setup and create the game engine
 * @param {HtmlElement} canvas 
 */
const setup = (canvas: HTMLCanvasElement) => {
    // set width and height of the game playground
    canvas.width = game.gridSize
    canvas.height = game.gridSize

    //draw the playground onto the screen
    playGround = canvas.getContext('2d')
    drawFrame()

    useState<IPlayGround | null>('playGround', () => playGround)
    useState<IGame>('game', () => game)
}

/** creates the main loop of the game
 * @param {Promise} callback - the gameloop function
 */
const play = (callback: Function) => {
    setTimeout(() => {
        //draw new frame
        drawFrame()
        //do game loop logic
        callback()
        //use recursion to make a loop
        play(callback)    
    }, 1000 / game.framesPerSecond)
}

const reset = () => {
     //update state from the game so other
     //components can check on gameOver field
     useState("game", () => game)
}

const drawFrame = () => {
    if(playGround == null) return;
    
    playGround.clearRect(0, 0, game.gridSize, game.gridSize)
    playGround.fillStyle = "#000"
    playGround.fillRect(0, 0, game.gridSize, game.gridSize)
}

const isGameOver = () => {
    //check if the snake is passed the borders
    //and return if the game is over
    let gameOver = false
    
    const snake = useState<ISnake>('snake').value
    if(snake.head.x >= game.gridSize ||
       snake.head.y >= game.gridSize ||
       snake.head.x < 0 ||
       snake.head.y < 0
    )
    {
        gameOver = true
    }
    
    game.isGameOver = gameOver;
    return gameOver       
}