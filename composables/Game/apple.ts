import { IApple, IGame, ISnake } from "../contracts"
/**
 * get different type of foods
 * reactions:
 *  change speed of snake based on food type (slow or fast)
 *  remove tail with the slice type
 * ideas:
 *  make a poisened apple
 *  add two apples at once
 */
let playGround: CanvasRenderingContext2D

let apple = {
    size: 10,
    position: {
        x: 0,
        y: 0
    }
} as IApple

export const useApple = () => {
    setup()
    return {
        draw,
        replace
    }
}

const setup = () => {
    //set playground
    playGround = useState<CanvasRenderingContext2D>('playGround').value
    replace()
    
}

const replace = () => {
    //get the state of the game and snake
    const game = useState('game').value as IGame
    const snake = useState('snake').value as ISnake

    //calculate apple position
    apple.position.x = Math.floor(Math.random() * (game.gridSize / snake.size)) * snake.size
    apple.position.y = Math.floor(Math.random() * (game.gridSize / snake.size)) * snake.size
    useState('apple', () => apple)
}

const draw = () => {
    const game = useState('game').value as IGame
    if(game.isGameOver) replace()
    // draw rectangle
    playGround.fillStyle = "red"
    playGround.fillRect(apple.position.x, apple.position.y, apple.size, apple.size)
}