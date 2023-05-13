import { IApple, IGame, IPlayGround, ISnake, Ikeys } from "../contracts";

let playGround: IPlayGround;

let snake = {
    size: 10,
    speed: {
        x: 0,
        y: 0,
    },
    head: {x: 0, y: 0},
    body: [{
        x: 50,
        y: 50
    }]
} as ISnake

/**
 * Represents the snake
 * @returns - functions to draw, move and reset the snake
 */
export const useSnake = () => {
    setup()
    return {
        draw,
        move,
        hasEatenApple
    }
}

/**
 * Setup the snake object
 */
const setup = () => {
   playGround = useState('playGround').value as IPlayGround
   snake.speed.x = snake.size
   snake.speed.y = 0
   snake.head = snake.body[0]
   useState("snake", () => snake)
}

/**
 * Draws the snake onto the scren
 */
const draw = () => {
    //draw the snake onto the screen
    playGround.fillStyle = "lime"

    snake.body.forEach(bodyPart => {
        playGround.fillRect(bodyPart.x, bodyPart.y, snake.size, snake.size)
    })
}


/**
 * Moves the snake
 */
const move = () => {
    //reset the snake first if the game is over
    const game = useState('game').value as IGame
    if(game.isGameOver) reset()

    //change the speed of the snake when key press
    //it cannot move in opposite direction
    var keys = useKeyInput((key: keyof Ikeys) => {
        if(key == keys.left && snake.speed.x == 0)
        {
            snake.speed.y = 0
            snake.speed.x = -snake.size
        }
        else if(key == keys.right && snake.speed.x == 0)
        {
            snake.speed.y = 0
            snake.speed.x = snake.size
        }
        else if(key == keys.up && snake.speed.y == 0)
        {
            snake.speed.x = 0
            snake.speed.y = -snake.size
        }
        else if(key == keys.down && snake.speed.y == 0)
        {
            snake.speed.x = 0
            snake.speed.y = snake.size
        }
    })
    
    //change the position of the snake
    snake.head = {
        x: snake.head.x + snake.speed.x,
        y: snake.head.y + snake.speed.y
    }

    //change the position of the body when length > 0
    for(let i = snake.body.length - 1; i >= 0; i--) {
        if(i == 0) {
            snake.body[i] = snake.head
        }
        else {
            snake.body[i] = snake.body[i - 1];
        }
    }

    useState("snake", () => snake)
}

const hasEatenApple = () => {
    const apple = useState('apple').value as IApple
    
    if(snake.head.x == apple.position.x 
    && snake.head.y == apple.position.y)
    {
        snake.body.push({
            x: apple.position.x,
            y: apple.position.y
        })
        return true;
    }

    return false;
}

const reset = () => {
    snake.body = [{
        x: 0,
        y: 0,
    }]
    setup()
}