import { IApple, IGame, ISnake, IPlayGround } from "../contracts"
/**
 * get different type of foods
 * reactions:
 *  change speed of snake based on food type (slow or fast)
 *  remove tail with the slice type
 * ideas:
 *  make a poisened apple
 *  add two apples at once
 */
let playGround: IPlayGround | null

let apple: IApple = {
    size: 10,
    position: {
        x: 0,
        y: 0
    }
}

export const useApple = () => {
    setup()
    return {
        draw,
        replace
    }
}

const setup = () => {
    //set playground
    playGround = useState<IPlayGround>('playGround').value
    replace()
    
}

const replace = () => {
    //get the state of the game and snake
    const game: IGame = useState<IGame>('game').value
    const snake: ISnake = useState<ISnake>('snake').value

    //calculate apple position
    apple.position.x = Math.floor(Math.random() * (game.gridSize / snake.size)) * snake.size
    apple.position.y = Math.floor(Math.random() * (game.gridSize / snake.size)) * snake.size
    useState<IApple>('apple', () => apple)
}

const draw = () => {
    if(playGround == null) return;
    
    const game: IGame = useState<IGame>('game').value
    if(game.isGameOver) replace()
    // draw rectangle
    playGround.fillStyle = "red"
    playGround.fillRect(apple.position.x, apple.position.y, apple.size, apple.size)
}